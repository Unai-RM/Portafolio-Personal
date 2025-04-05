import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configurar SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const msg = {
      to: 'tu_email@ejemplo.com', // Cambia esto a tu email
      from: 'no-reply@ejemplo.com', // Usa un email válido
      subject: 'Nuevo mensaje de portafolio',
      text: `
        Nombre: ${data.name}
        Email: ${data.email}
        Mensaje: ${data.message}
      `,
      html: `
        <h2>Nuevo mensaje de portafolio</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
      `,
    };

    await sgMail.send(msg);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
}
