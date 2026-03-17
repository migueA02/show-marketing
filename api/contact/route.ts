import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, apellido, email, telefono, mensaje, captchaToken } = body;
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Falta el token de verificación del reCAPTCHA." },
        { status: 400 },
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const recaptchaRes = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${captchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      console.error("Error de reCAPTCHA:", recaptchaData["error-codes"]);
      return NextResponse.json(
        { error: "Verificación de reCAPTCHA fallida. ¿Eres un robot?" },
        { status: 400 },
      );
    }

    console.log("Datos del formulario recibidos:", {
      nombre,
      apellido,
      email,
      telefono,
      mensaje,
    });

    return NextResponse.json(
      { message: "¡Mensaje enviado exitosamente!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error en el endpoint de contacto:", error);
    return NextResponse.json(
      { error: "Hubo un error interno en el servidor." },
      { status: 500 },
    );
  }
}
