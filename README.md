# 🌐 Unai Ricco Moyano – Portfolio

Este es el código fuente de mi portafolio personal. Desarrollado para mostrar mis proyectos, habilidades y experiencia como desarrollador full-stack.

## 🛠 Tecnologías utilizadas

- **Next.js** (React)
- **TypeScript** (tipado estático)
- **Leaflet** (para mostrar mi ubicación en el mapa)
- **SendGrid** (para el formulario de contacto)
- **Netlify** (despliegue)

## 📐 Arquitectura

El proyecto está estructurado de forma modular para mejorar la mantenibilidad y escalabilidad:

- **Componentes**: Cada sección está encapsulada en su propio componente con su estado local
- **Datos**: Los datos estáticos están centralizados en archivos dedicados
- **Traducciones**: Sistema de internacionalización para soporte multiidioma
- **Estado**: Gestión de estado local por componente para mejor encapsulación

## 🚀 ¿Qué incluye?

- Diseño 100% responsive 📱
- Animaciones suaves con CSS ✨
- Sección de **Mi presentación**, **Tecnologías**, **Áreas de experiencia**, **Aptitudes** y **Contacto**
- Formulario de contacto con integración a **SendGrid** para el envío de correos
- Enlaces directos a **WhatsApp** y **LinkedIn**
- Mapa interactivo con un marcador que muestra mi ubicación

## 🌍 Deploy

El portafolio está publicado en Netlify y puedes verlo en vivo aquí:  
🔗 [riccode.dev](https://riccode.dev)

## 📦 Instalación local

Si quieres arrancarlo en tu máquina local:

```bash
git clone https://github.com/Unai-RM/Portafolio-Personal.git
cd tuportafolio
npm install
npm run dev
