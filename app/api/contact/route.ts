/**
 * API Route: /api/contact
 * 
 * Endpoint para procesar formularios de contacto desde las páginas:
 * - ShowMarketing (show-marketing)
 * - Doña Merry (merry)
 * - El Semental (misael)
 * 
 * @module app/api/contact/route
 * @description Maneja el envío de formularios de contacto mediante Resend API
 * 
 * REQUISITOS DE PRODUCCIÓN:
 * - Variable de entorno RESEND_API_KEY debe estar configurada
 * - Email de destino configurado en línea 335 (actualmente: jesusdma03@gmail.com)
 * 
 * SEGURIDAD:
 * - Sanitización de HTML para prevenir XSS
 * - Validación de tipos de datos
 * - Validación de formato de email
 * - Rechazo de caracteres de control no permitidos
 * - Límites de longitud de campos
 * 
 * VARIABLES DE ENTORNO REQUERIDAS:
 * - RESEND_API_KEY: API key de Resend para envío de emails
 * 
 * @see https://resend.com/docs/api-reference/emails/send-email
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// ============================================================================
// CONSTANTES DE CONFIGURACIÓN
// ============================================================================

/**
 * Email de destino donde se recibirán todos los formularios de contacto
 * TODO: Mover a variable de entorno en producción para mayor flexibilidad
 */
const CONTACT_EMAIL = 'jesusdma03@gmail.com';

/**
 * Límites de longitud para campos del formulario (prevención de spam/DoS)
 */
const FIELD_LIMITS = {
  nombre: 100,
  apellido: 100,
  email: 255,
  telefono: 20,
  mensaje: 2000,
} as const;

/**
 * Tipos de formularios soportados y sus configuraciones
 */
type FormSource = 'show-marketing' | 'merry' | 'misael';

interface FormInfo {
  name: string;
  displayName: string;
}

interface ColorScheme {
  headerGradient: string;
  headerText: string;
  sourceLabel: string;
  sourceValue: string;
  linkColor: string;
  borderColor: string;
  messageBg: string;
  messageBorder: string;
  footerBg: string;
  footerText: string;
  footerBorder: string;
}

// ============================================================================
// CONFIGURACIÓN DE FORMULARIOS
// ============================================================================

/**
 * Mapeo de fuentes de formulario a información de display
 */
const FORM_NAMES: Record<FormSource, FormInfo> = {
  'show-marketing': { name: 'show-marketing', displayName: 'ShowMarketing' },
  'merry': { name: 'merry', displayName: 'Doña Merry' },
  'misael': { name: 'misael', displayName: 'El Semental' },
};

/**
 * Esquemas de colores personalizados por formulario para los emails
 * Cada formulario tiene su identidad visual única
 */
const COLOR_SCHEMES: Record<FormSource, ColorScheme> = {
  'show-marketing': {
    headerGradient: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
    headerText: '#ffffff',
    sourceLabel: '#000000',
    sourceValue: '#000000',
    linkColor: '#000000',
    borderColor: '#000000',
    messageBg: '#ffffff',
    messageBorder: '#000000',
    footerBg: '#ffffff',
    footerText: '#000000',
    footerBorder: '#000000',
  },
  'merry': {
    headerGradient: 'linear-gradient(135deg, #ffd44a 0%, #ff29ab 100%)',
    headerText: '#ffffff',
    sourceLabel: '#7e1ad2',
    sourceValue: '#7e1ad2',
    linkColor: '#7e1ad2',
    borderColor: '#67c7db',
    messageBg: '#ffffff',
    messageBorder: '#7e1ad2',
    footerBg: '#ffffff',
    footerText: '#7e1ad2',
    footerBorder: '#67c7db',
  },
  'misael': {
    headerGradient: 'linear-gradient(135deg, #854319 0%, #f69d28 100%)',
    headerText: '#ffffff',
    sourceLabel: '#000000',
    sourceValue: '#854319',
    linkColor: '#f69d28',
    borderColor: '#f69d28',
    messageBg: '#ffffff',
    messageBorder: '#f69d28',
    footerBg: '#000000',
    footerText: '#ffffff',
    footerBorder: '#854319',
  },
};

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

/**
 * Escapa caracteres HTML para prevenir ataques XSS
 * Convierte caracteres especiales a entidades HTML seguras
 * 
 * @param text - Texto a escapar
 * @returns Texto escapado seguro para usar en HTML
 * 
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Valida el formato de email usando expresión regular
 * 
 * @param email - Email a validar
 * @returns true si el email es válido, false en caso contrario
 */
function isValidEmail(email: string): boolean {
  // RFC 5322 simplified regex - suficiente para la mayoría de casos prácticos
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida que un campo de texto no contenga caracteres de control maliciosos
 * Permite saltos de línea (\n), tabs (\t) y retornos de carro (\r) normales
 * 
 * @param field - Campo de texto a validar
 * @returns true si el campo es válido, false si contiene caracteres peligrosos
 */
function isValidTextField(field: string): boolean {
  // Rechazar caracteres de control excepto \n, \r, \t (salto de línea, retorno, tab)
  // \x00-\x08: caracteres de control iniciales
  // \x0B-\x0C: tab vertical, form feed
  // \x0E-\x1F: más caracteres de control
  return !/[\x00-\x08\x0B-\x0C\x0E-\x1F]/.test(field);
}

/**
 * Valida y sanitiza los datos del formulario
 * 
 * @param data - Datos del formulario a validar
 * @returns Objeto con isValid y errorMessage si hay error
 */
function validateFormData(data: {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  mensaje?: string;
}): { isValid: boolean; errorMessage?: string } {
  // Validación de campos requeridos
  if (!data.nombre?.trim() || !data.apellido?.trim() || !data.email?.trim() || !data.telefono?.trim()) {
    return { isValid: false, errorMessage: 'Por favor complete todos los campos requeridos' };
  }

  // Validación de tipos (todos deben ser strings)
  const textFields = [data.nombre, data.apellido, data.email, data.telefono, data.mensaje || ''];
  for (const field of textFields) {
    if (typeof field !== 'string') {
      return { isValid: false, errorMessage: 'Los campos solo aceptan texto' };
    }
  }

  // Validación de formato de email
  if (!isValidEmail(data.email)) {
    return { isValid: false, errorMessage: 'Por favor ingrese un email válido' };
  }

  // Validación de caracteres peligrosos
  for (const field of textFields) {
    if (!isValidTextField(field)) {
      return { isValid: false, errorMessage: 'Los campos contienen caracteres no permitidos' };
    }
  }

  // Validación de longitud de campos (prevención de spam/DoS)
  if (data.nombre.length > FIELD_LIMITS.nombre) {
    return { isValid: false, errorMessage: `El nombre no puede exceder ${FIELD_LIMITS.nombre} caracteres` };
  }
  if (data.apellido.length > FIELD_LIMITS.apellido) {
    return { isValid: false, errorMessage: `El apellido no puede exceder ${FIELD_LIMITS.apellido} caracteres` };
  }
  if (data.email.length > FIELD_LIMITS.email) {
    return { isValid: false, errorMessage: `El email no puede exceder ${FIELD_LIMITS.email} caracteres` };
  }
  if (data.telefono.length > FIELD_LIMITS.telefono) {
    return { isValid: false, errorMessage: `El teléfono no puede exceder ${FIELD_LIMITS.telefono} caracteres` };
  }
  if (data.mensaje && data.mensaje.length > FIELD_LIMITS.mensaje) {
    return { isValid: false, errorMessage: `El mensaje no puede exceder ${FIELD_LIMITS.mensaje} caracteres` };
  }

  return { isValid: true };
}

/**
 * Genera el template HTML del email personalizado según el formulario de origen
 * 
 * @param formData - Datos del formulario sanitizados
 * @param formInfo - Información del formulario (nombre, displayName)
 * @param colors - Esquema de colores del formulario
 * @returns HTML del email listo para enviar
 */
function generateEmailHTML(
  formData: { nombre: string; apellido: string; email: string; telefono: string; mensaje?: string },
  formInfo: FormInfo,
  colors: ColorScheme
): string {
  // Sanitizar todos los campos
  const safeNombre = escapeHtml(formData.nombre.trim());
  const safeApellido = escapeHtml(formData.apellido.trim());
  const safeEmail = escapeHtml(formData.email.trim());
  const safeTelefono = escapeHtml(formData.telefono.trim());
  const safeMensaje = formData.mensaje ? escapeHtml(formData.mensaje.trim()).replace(/\n/g, '<br>') : '';
  const safeSource = escapeHtml(formInfo.displayName);

  // Template HTML responsive y compatible con clientes de email
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Nuevo contacto desde ${safeSource}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; max-width: 600px;">
          <!-- Header -->
          <tr>
            <td style="background: ${colors.headerGradient}; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: ${colors.headerText}; font-size: 24px; font-weight: 700; letter-spacing: 1px;">
                NUEVO CONTACTO
              </h1>
              <p style="margin: 10px 0 0 0; color: ${colors.headerText}; font-size: 14px; opacity: 0.9;">
                Formulario de ${safeSource}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Información del formulario -->
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 2px solid ${colors.borderColor}; margin-bottom: 20px;">
                    <p style="margin: 0 0 8px 0; color: ${colors.sourceLabel}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Origen del Formulario
                    </p>
                    <p style="margin: 0; color: ${colors.sourceValue}; font-size: 16px; font-weight: 600;">
                      ${safeSource}
                    </p>
                  </td>
                </tr>
                
                <!-- Nombre -->
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid ${colors.borderColor};">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="vertical-align: top;">
                          <p style="margin: 0; color: ${colors.sourceLabel}; font-size: 14px; font-weight: 600;">
                            Nombre:
                          </p>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0; color: #333333; font-size: 14px;">
                            ${safeNombre} ${safeApellido}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Email -->
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid ${colors.borderColor};">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="vertical-align: top;">
                          <p style="margin: 0; color: ${colors.sourceLabel}; font-size: 14px; font-weight: 600;">
                            Email:
                          </p>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0;">
                            <a href="mailto:${safeEmail}" style="color: ${colors.linkColor}; text-decoration: none; font-size: 14px;">
                              ${safeEmail}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Teléfono -->
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid ${colors.borderColor};">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="vertical-align: top;">
                          <p style="margin: 0; color: ${colors.sourceLabel}; font-size: 14px; font-weight: 600;">
                            Teléfono:
                          </p>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0;">
                            <a href="tel:${safeTelefono}" style="color: ${colors.linkColor}; text-decoration: none; font-size: 14px;">
                              ${safeTelefono}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                ${safeMensaje ? `
                <!-- Mensaje -->
                <tr>
                  <td style="padding: 20px 0;">
                    <p style="margin: 0 0 10px 0; color: ${colors.sourceLabel}; font-size: 14px; font-weight: 600;">
                      Mensaje:
                    </p>
                    <div style="background-color: ${colors.messageBg}; padding: 15px; border-radius: 4px; border-left: 4px solid ${colors.messageBorder};">
                      <p style="margin: 0; color: #333333; font-size: 14px; line-height: 1.6;">
                        ${safeMensaje}
                      </p>
                    </div>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: ${colors.footerBg}; padding: 30px 40px; border-top: 1px solid ${colors.footerBorder};">
              <p style="margin: 0 0 15px 0; color: ${colors.footerText}; font-size: 13px; line-height: 1.6;">
                <strong>Para responder a este contacto:</strong><br>
                Simplemente responde a este email y tu respuesta llegará directamente a <strong>${safeEmail}</strong>
              </p>
              <p style="margin: 0; color: ${colors.footerText}; font-size: 12px; border-top: 1px solid ${colors.footerBorder}; padding-top: 15px; opacity: 0.8;">
                Este email fue generado automáticamente desde el formulario de contacto de <strong>${safeSource}</strong><br>
                Fecha: ${new Date().toLocaleString('es-CR', { dateStyle: 'long', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Genera la versión texto plano del email (fallback para clientes de email que no soportan HTML)
 * 
 * @param formData - Datos del formulario
 * @param formInfo - Información del formulario
 * @returns Texto plano del email
 */
function generateEmailText(
  formData: { nombre: string; apellido: string; email: string; telefono: string; mensaje?: string },
  formInfo: FormInfo
): string {
  return `
NUEVO CONTACTO - Formulario de ${formInfo.displayName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORIGEN DEL FORMULARIO
${formInfo.displayName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOMBRE
${formData.nombre.trim()} ${formData.apellido.trim()}

EMAIL
${formData.email.trim()}

TELÉFONO
${formData.telefono.trim()}

${formData.mensaje ? `\nMENSAJE\n${formData.mensaje.trim()}\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para responder a este contacto:
Simplemente responde a este email y tu respuesta llegará directamente a ${formData.email.trim()}

Fecha: ${new Date().toLocaleString('es-CR', { dateStyle: 'long', timeStyle: 'short' })}
  `.trim();
}

// ============================================================================
// API ROUTE HANDLER
// ============================================================================

/**
 * POST /api/contact
 * 
 * Procesa formularios de contacto desde las páginas de ShowMarketing, Doña Merry y El Semental
 * 
 * @param request - Request de Next.js con los datos del formulario
 * @returns NextResponse con resultado del procesamiento
 * 
 * @example
 * POST /api/contact
 * Body: {
 *   "nombre": "Juan",
 *   "apellido": "Pérez",
 *   "email": "juan@example.com",
 *   "telefono": "12345678",
 *   "mensaje": "Mensaje opcional",
 *   "source": "show-marketing" // opcional, default: "show-marketing"
 * }
 * 
 * Response 200: { "message": "Mensaje enviado exitosamente..." }
 * Response 400: { "error": "Mensaje de error de validación" }
 * Response 500: { "error": "Error al procesar el formulario..." }
 */
export async function POST(request: NextRequest) {
  // Headers de respuesta para producción
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  });

  try {
    // Parse del body JSON
    let body: {
      nombre?: string;
      apellido?: string;
      email?: string;
      telefono?: string;
      mensaje?: string;
      source?: string;
    };

    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Formato de solicitud inválido. Por favor verifique los datos enviados.' },
        { status: 400, headers }
      );
    }

    const { nombre, apellido, email, telefono, mensaje, source } = body;

    // Detectar y validar el origen del formulario
    const formSource: FormSource = (source && ['show-marketing', 'merry', 'misael'].includes(source))
      ? (source as FormSource)
      : 'show-marketing';

    const formInfo = FORM_NAMES[formSource];
    const colors = COLOR_SCHEMES[formSource];

    // Validación completa de los datos
    const validation = validateFormData({
      nombre: nombre || '',
      apellido: apellido || '',
      email: email || '',
      telefono: telefono || '',
      mensaje: mensaje,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errorMessage },
        { status: 400, headers }
      );
    }

    // Datos validados y sanitizados
    const formData = {
      nombre: (nombre as string).trim(),
      apellido: (apellido as string).trim(),
      email: (email as string).trim().toLowerCase(), // Normalizar email a lowercase
      telefono: (telefono as string).trim(),
      mensaje: mensaje?.trim() || '',
    };

    // ========================================================================
    // ENVÍO DE EMAIL (Resend API)
    // ========================================================================

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // En desarrollo: registrar en consola
      // En producción: considerar usar un servicio de logging estructurado
      console.warn('[CONTACT API] RESEND_API_KEY no configurada. Email no enviado.', {
        formSource,
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

      // En producción, podrías querer retornar un error aquí
      // Por ahora, retornamos éxito para no romper el flujo del usuario
      return NextResponse.json(
        {
          message: 'Mensaje recibido. Nos pondremos en contacto pronto.',
          warning: 'Email service no configurado',
        },
        { status: 200, headers }
      );
    }

    try {
      const resend = new Resend(resendApiKey);

      // Generar templates de email
      const emailHtml = generateEmailHTML(formData, formInfo, colors);
      const emailText = generateEmailText(formData, formInfo);

      // Enviar email usando Resend
      await resend.emails.send({
        from: 'ShowMarketing <onboarding@resend.dev>', // Dominio verificado de Resend
        to: CONTACT_EMAIL,
        replyTo: `${formData.nombre} ${formData.apellido} <${formData.email}>`,
        subject: `Nuevo contacto desde ${formInfo.displayName} - ${formData.nombre} ${formData.apellido}`,
        html: emailHtml,
        text: emailText,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
        },
      });

      // Log de éxito (en producción, usar servicio de logging estructurado)
      console.log('[CONTACT API] Email enviado exitosamente', {
        formSource,
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

    } catch (emailError: any) {
      // Log del error sin exponer detalles sensibles al cliente
      console.error('[CONTACT API] Error enviando email:', {
        formSource,
        email: formData.email,
        error: emailError.name || 'UnknownError',
        message: emailError.message,
        timestamp: new Date().toISOString(),
      });

      // En producción, podrías querer:
      // 1. Enviar a un servicio de logging (Sentry, LogRocket, etc.)
      // 2. Notificar a un canal de alertas (Slack, PagerDuty, etc.)
      // 3. Guardar en una cola para reintentos

      // Por ahora, no fallamos el request para no romper la UX
      // El usuario recibe confirmación aunque el email falle
    }

    // ========================================================================
    // RESPUESTA EXITOSA
    // ========================================================================

    return NextResponse.json(
      {
        message: 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.',
      },
      { status: 200, headers }
    );

  } catch (error) {
    // Manejo de errores inesperados
    console.error('[CONTACT API] Error inesperado procesando formulario:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    // En producción, no exponer detalles del error al cliente
    return NextResponse.json(
      {
        error: 'Error al procesar el formulario. Por favor intente más tarde.',
      },
      { status: 500, headers }
    );
  }
}

/**
 * OPTIONS /api/contact
 * 
 * Maneja preflight requests para CORS (si es necesario en el futuro)
 * 
 * @param request - Request de Next.js
 * @returns NextResponse con headers CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
