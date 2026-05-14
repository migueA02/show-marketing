import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'jesusdma03@gmail.com';

/** Longitud máxima de caracteres permitida por cada campo del formulario. */
const FIELD_LIMITS = {
  nombre: 100,
  empresa: 100,
  email: 255,
  telefono: 40,
  mensaje: 2000,
} as const;

/** Unión de identificadores válidos de origen del formulario, uno por sitio cliente. */
type FormSource = 'show-marketing' | 'merry' | 'misael';

/** Metadatos de visualización asociados a un origen de formulario. */
interface FormInfo {
  name: string;
  displayName: string;
}

/** Tokens de color de marca usados para personalizar el correo de notificación según el origen. */
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
  headerSvg: string;
}

/** Mapeo de cada FormSource a sus metadatos de nombre para mostrar. */
const FORM_NAMES: Record<FormSource, FormInfo> = {
  'show-marketing': { name: 'show-marketing', displayName: 'ShowMarketing' },
  'merry': { name: 'merry', displayName: 'Doña Merry' },
  'misael': { name: 'misael', displayName: 'El Semental' },
};

/** Tokens de color por origen aplicados al correo de notificación en HTML. */
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
    headerSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="26" width="8" height="18" rx="2" fill="rgba(255,255,255,0.5)"/><rect x="16" y="16" width="8" height="28" rx="2" fill="rgba(255,255,255,0.8)"/><rect x="28" y="8" width="8" height="36" rx="2" fill="white"/><rect x="40" y="18" width="6" height="26" rx="2" fill="rgba(255,255,255,0.6)"/><line x1="2" y1="46" x2="46" y2="46" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-linecap="round"/></svg>',
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
    headerSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L27.5 20.5L44 24L27.5 27.5L24 44L20.5 27.5L4 24L20.5 20.5L24 4Z" fill="white" fill-opacity="0.95"/><circle cx="24" cy="24" r="3.5" fill="white"/></svg>',
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
    headerSvg: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 4L8 11V27C8 37 16 43.5 24 46C32 43.5 40 37 40 27V11L24 4Z" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="2" stroke-linejoin="round"/><path d="M16 24L22 30.5L33 18" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
};

/**
 * Escapa caracteres HTML especiales para prevenir inyección en la salida del correo.
 *
 * @param text - Cadena de texto a escapar
 * @returns Cadena con los caracteres especiales HTML reemplazados por sus entidades
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
 * Verifica que el correo electrónico tenga el formato básico usuario@dominio.tld.
 *
 * @param email - Dirección de correo electrónico a validar
 * @returns `true` si el formato es válido, `false` en caso contrario
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Rechaza cadenas que contengan caracteres de control ASCII no imprimibles ni espacios en blanco.
 *
 * @param field - Valor del campo de texto a validar
 * @returns `true` si el campo no contiene caracteres no permitidos, `false` en caso contrario
 */
function isValidTextField(field: string): boolean {
  return !/[\x00-\x08\x0B-\x0C\x0E-\x1F]/.test(field);
}

/**
 * Valida los campos requeridos, juegos de caracteres, formato de correo y límites de longitud por campo.
 *
 * @param data - Objeto con los valores del formulario a validar
 * @returns Objeto con `isValid` indicando el resultado y `errorMessage` con el motivo en caso de fallo
 */
function validateFormData(data: {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje?: string;
}): { isValid: boolean; errorMessage?: string } {
  if (!data.nombre?.trim() || !data.email?.trim() || !data.telefono?.trim()) {
    return { isValid: false, errorMessage: 'Por favor complete todos los campos requeridos' };
  }

  const textFields = [data.nombre, data.empresa, data.email, data.telefono, data.mensaje || ''];
  for (const field of textFields) {
    if (typeof field !== 'string') {
      return { isValid: false, errorMessage: 'Los campos solo aceptan texto' };
    }
  }

  if (!isValidEmail(data.email)) {
    return { isValid: false, errorMessage: 'Por favor ingrese un email válido' };
  }

  for (const field of textFields) {
    if (!isValidTextField(field)) {
      return { isValid: false, errorMessage: 'Los campos contienen caracteres no permitidos' };
    }
  }

  if (data.nombre.length > FIELD_LIMITS.nombre) {
    return { isValid: false, errorMessage: `El nombre no puede exceder ${FIELD_LIMITS.nombre} caracteres` };
  }
  if (data.empresa.length > FIELD_LIMITS.empresa) {
    return { isValid: false, errorMessage: `La empresa no puede exceder ${FIELD_LIMITS.empresa} caracteres` };
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
 * Verifica un token de reCAPTCHA v2 contra la API siteverify de Google.
 *
 * @param token - Token de respuesta generado por el widget de reCAPTCHA en el cliente
 * @returns `true` si la verificación es exitosa, `false` en caso contrario
 */
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.warn('[CONTACT API] RECAPTCHA_SECRET_KEY not configured');
    return false;
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
  });

  const data = await res.json();
  return data.success === true;
}

/**
 * Construye el cuerpo HTML del correo de notificación de contacto con la marca correspondiente.
 *
 * @param formData - Datos del formulario enviado por el usuario
 * @param formInfo - Metadatos de nombre del origen del formulario
 * @param colors - Tokens de color de la marca asociada al origen
 * @returns Cadena con el HTML completo del correo de notificación
 */
function generateEmailHTML(
  formData: { nombre: string; empresa: string; email: string; telefono: string; mensaje?: string },
  formInfo: FormInfo,
  colors: ColorScheme
): string {
  const safeNombre = escapeHtml(formData.nombre.trim());
  const safeEmpresa = escapeHtml(formData.empresa.trim());
  const safeEmail = escapeHtml(formData.email.trim());
  const safeTelefono = escapeHtml(formData.telefono.trim());
  const safeMensaje = formData.mensaje ? escapeHtml(formData.mensaje.trim()).replace(/\n/g, '<br>') : '';
  const safeSource = escapeHtml(formInfo.displayName);

  const ic = colors.sourceLabel;
  const personIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="5.5" r="3" stroke="${ic}" stroke-width="1.5"/><path d="M2 17c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="${ic}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  const buildingIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="12" height="11" rx="1" stroke="${ic}" stroke-width="1.5"/><path d="M6 16v-4h6v4" stroke="${ic}" stroke-width="1.5"/><path d="M3 8l6-5 6 5" stroke="${ic}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const emailIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="4" width="16" height="11" rx="1.5" stroke="${ic}" stroke-width="1.5"/><path d="M1 7l8 4.5L17 7" stroke="${ic}" stroke-width="1.5" stroke-linecap="round"/></svg>`;
  const phoneIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.4 1H3C1.9 1 1 1.9 1 3c0 7.7 6.3 14 14 14 1.1 0 2-.9 2-2v-2.4l-3-1.3-1.3 1.9c-2-.9-3.9-2.8-4.8-4.8L9.7 7 8.4 4 5.4 1z" stroke="${ic}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
  const messageIcon = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1h16v12H6l-5 4V1z" stroke="${ic}" stroke-width="1.5" stroke-linejoin="round"/><path d="M5 6h8M5 8.5h5" stroke="${ic}" stroke-width="1.5" stroke-linecap="round"/></svg>`;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Nuevo contacto desde ${safeSource}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#efefef;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#efefef;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.13);">

          <!-- HEADER -->
          <tr>
            <td style="background:${colors.headerGradient};padding:36px 40px 32px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:16px;">${colors.headerSvg}</td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin:0 0 14px 0;color:${colors.headerText};font-size:26px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;">NUEVO CONTACTO</h1>
                    <span style="display:inline-block;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.45);color:${colors.headerText};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 18px;border-radius:20px;">${safeSource}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Nombre -->
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align:top;padding-top:3px;">${personIcon}</td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaaaaa;">NOMBRE</p>
                          <p style="margin:0;font-size:16px;font-weight:600;color:#1a1a1a;">${safeNombre}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${safeEmpresa ? `
                <!-- Empresa -->
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align:top;padding-top:3px;">${buildingIcon}</td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaaaaa;">EMPRESA</p>
                          <p style="margin:0;font-size:16px;font-weight:600;color:#1a1a1a;">${safeEmpresa}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

                <!-- Correo -->
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align:top;padding-top:3px;">${emailIcon}</td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaaaaa;">CORREO</p>
                          <p style="margin:0;"><a href="mailto:${safeEmail}" style="font-size:16px;font-weight:600;color:${colors.linkColor};text-decoration:none;">${safeEmail}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Teléfono -->
                <tr>
                  <td style="padding:16px 0;${safeMensaje ? 'border-bottom:1px solid #f0f0f0;' : ''}">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align:top;padding-top:3px;">${phoneIcon}</td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 4px 0;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaaaaa;">TELÉFONO</p>
                          <p style="margin:0;"><a href="tel:${safeTelefono}" style="font-size:16px;font-weight:600;color:${colors.linkColor};text-decoration:none;">${safeTelefono}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${safeMensaje ? `
                <!-- Mensaje -->
                <tr>
                  <td style="padding:16px 0 0 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align:top;padding-top:3px;">${messageIcon}</td>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 10px 0;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#aaaaaa;">MENSAJE</p>
                          <div style="background-color:${colors.messageBg};border-left:3px solid ${colors.messageBorder};padding:14px 16px;border-radius:0 6px 6px 0;">
                            <p style="margin:0;font-size:15px;color:#333333;line-height:1.7;">${safeMensaje}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}

              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:${colors.footerBg};padding:24px 40px;border-top:1px solid ${colors.footerBorder};">
              <p style="margin:0 0 12px 0;font-size:13px;color:${colors.footerText};line-height:1.6;">
                <strong>Para responder:</strong> Responde este email directamente &mdash; llegará a <strong>${safeEmail}</strong>
              </p>
              <p style="margin:0;font-size:11px;color:${colors.footerText};opacity:0.6;padding-top:12px;border-top:1px solid ${colors.footerBorder};">
                Formulario de contacto &middot; ${safeSource} &middot; ${new Date().toLocaleString('es-CR', { dateStyle: 'long', timeStyle: 'short' })}
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
 * Construye el cuerpo en texto plano del correo de notificación de contacto como alternativa al HTML.
 *
 * @param formData - Datos del formulario enviado por el usuario
 * @param formInfo - Metadatos de nombre del origen del formulario
 * @returns Cadena con el contenido en texto plano del correo de notificación
 */
function generateEmailText(
  formData: { nombre: string; empresa: string; email: string; telefono: string; mensaje?: string },
  formInfo: FormInfo
): string {
  return `
NUEVO CONTACTO - Formulario de ${formInfo.displayName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ORIGEN DEL FORMULARIO
${formInfo.displayName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOMBRE
${formData.nombre.trim()}

${formData.empresa.trim() ? `EMPRESA\n${formData.empresa.trim()}\n\n` : ''}EMAIL
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

/**
 * Maneja el envío del formulario de contacto: valida los datos, verifica el reCAPTCHA y envía un correo de notificación mediante Resend.
 *
 * @param request - Objeto de solicitud HTTP entrante de Next.js
 * @returns Respuesta JSON con mensaje de éxito o error y el código de estado correspondiente
 */
export async function POST(request: NextRequest) {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
  });

  try {
    let body: {
      nombre?: string;
      empresa?: string;
      email?: string;
      telefono?: string;
      mensaje?: string;
      source?: string;
      captcha?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Formato de solicitud inválido. Por favor verifique los datos enviados.' },
        { status: 400, headers }
      );
    }

    const { nombre, empresa, email, telefono, mensaje, source, captcha } = body;

    // Verificar reCAPTCHA
    if (!captcha) {
      return NextResponse.json(
        { error: 'Por favor, verifica que no eres un robot.' },
        { status: 400, headers }
      );
    }

    const captchaValid = await verifyRecaptcha(captcha);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'Verificación de reCAPTCHA fallida. Por favor intente de nuevo.' },
        { status: 400, headers }
      );
    }

    const formSource: FormSource = (source && ['show-marketing', 'merry', 'misael'].includes(source))
      ? (source as FormSource)
      : 'show-marketing';

    const formInfo = FORM_NAMES[formSource];
    const colors = COLOR_SCHEMES[formSource];

    const validation = validateFormData({
      nombre: nombre || '',
      empresa: empresa || '',
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

    const formData = {
      nombre: (nombre as string).trim(),
      empresa: (empresa || '').trim(),
      email: (email as string).trim().toLowerCase(),
      telefono: (telefono as string).trim(),
      mensaje: mensaje?.trim() || '',
    };

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('[CONTACT API] RESEND_API_KEY no configurada. Email no enviado.', {
        formSource,
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { message: 'Mensaje recibido. Nos pondremos en contacto pronto.' },
        { status: 200, headers }
      );
    }

    try {
      const resend = new Resend(resendApiKey);

      const emailHtml = generateEmailHTML(formData, formInfo, colors);
      const emailText = generateEmailText(formData, formInfo);

      await resend.emails.send({
        from: `ShowMarketing <${process.env.RESEND_FROM_EMAIL}>`,
        to: CONTACT_EMAIL,
        replyTo: `${formData.nombre} <${formData.email}>`,
        subject: `Nuevo contacto desde ${formInfo.displayName} - ${formData.nombre}`,
        html: emailHtml,
        text: emailText,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high',
        },
      });

      console.log('[CONTACT API] Email enviado exitosamente', {
        formSource,
        email: formData.email,
        timestamp: new Date().toISOString(),
      });

    } catch (emailError: unknown) {
      const err = emailError as { name?: string; message?: string };
      console.error('[CONTACT API] Error enviando email:', {
        formSource,
        email: formData.email,
        error: err.name || 'UnknownError',
        message: err.message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { message: 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.' },
      { status: 200, headers }
    );

  } catch (error) {
    console.error('[CONTACT API] Error inesperado procesando formulario:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { error: 'Error al procesar el formulario. Por favor intente más tarde.' },
      { status: 500, headers }
    );
  }
}

/**
 * Responde a las solicitudes de preflight CORS para el endpoint de contacto.
 *
 * @returns Respuesta vacía con los encabezados CORS correspondientes y código 204
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
