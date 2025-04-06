import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configurar SendGrid con tu API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const msg = {
      to: 'unai.ricco.moyano@gmail.com',
      from: 'unai.ricco.moyano@gmail.com',
      subject: `Nuevo mensaje de ${name} desde el portfolio`,
      text: message,
      html: `
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', {
      statusCode: error?.response?.statusCode,
      body: error?.response?.body,
      message: error?.message
    });
    
    return NextResponse.json({ 
      success: false,
      error: error?.response?.body?.errors || error?.message 
    }, { status: 500 });
  }
}
