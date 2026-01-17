# 🚀 Smartwatch Landing Page - Proyecto de Práctica

<div align="center">

![Smartwatch](https://img.shields.io/badge/Smartwatch-Landing%20Page-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-10B981?style=for-the-badge)](https://your-vercel-url.vercel.app)
[![GitHub License](https://img.shields.io/github/license/andres0772/landing-page-promocional-de-practica?style=for-the-badge)](LICENSE)

*Landing page moderna desarrollada como proyecto personal de práctica para aprender y experimentar con las últimas tecnologías web*

</div>

## 📋 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📦 Installation](#-installation)
- [💻 Usage](#-usage)
- [🌐 Deployment](#-deployment)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## 🎯 About the Project

Esta landing page es un proyecto personal de práctica creado con el objetivo de aprender y experimentar con las tecnologías web más modernas. El proyecto simula la página de promoción de un smartwatch, permitiendo explorar conceptos de diseño responsive, animaciones fluidas y mejores prácticas de desarrollo.

### 🎨 Motivation

El proyecto fue desarrollado como ejercicio práctico para:
- Aprender React 19 con las últimas features
- Experimentar con TypeScript en un proyecto real
- Practicar diseño responsive con TailwindCSS
- Implementar animaciones con Framer Motion
- Aprender deployment automático con Vercel

### 🎯 Objetivos de Aprendizaje

- **Frontend Moderno**: Dominar React, TypeScript y herramientas modernas
- **Diseño Responsive**: Crear experiencias perfectas en todos los dispositivos
- **Performance**: Optimizar tiempos de carga y用户体验
- **Deployment**: Automatizar el proceso de deploy a producción

## ✨ Features

### 🎨 Design & UX
- **Diseño Moderno**: Interfaz minimalista y elegante con animaciones fluidas
- **Responsive Design**: Adaptación perfecta a móviles, tablets y desktop
- **Microinteracciones**: Animaciones sutiles que mejoran la experiencia
- **Dark/Light Mode**: Soporte para temas personalizados

### 🚀 Performance
- **Optimización de Imágenes**: Lazy loading y formatos modernos (WebP)
- **Code Splitting**: Carga inteligente de componentes
- **SEO Optimizado**: Meta tags y estructura semántica perfecta

### 🛍️ E-commerce Features
- **Galería Interactiva**: Visualización 360° del producto
- **Customization**: Selector de colores y correas en tiempo real
- **Testimonials**: Reseñas sociales integradas
- **FAQ Section**: Preguntas frecuentes con accordion interactivo

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library con las últimas features
- **TypeScript 5.6.3** - Type safety y mejor developer experience
- **Vite 7.1.9** - Build tool ultra-rápido
- **TailwindCSS 4.1.14** - Utility-first CSS framework

### UI Components
- **Radix UI** - Componentes accesibles y personalizables
- **Framer Motion 12.23.24** - Animaciones fluidas y declarativas
- **Lucide React** - Iconos modernos y consistentes

### Backend
- **Express 5.0.1** - API server robusto
- **Node.js** - Runtime environment
- **TypeScript** - Type safety en el backend

### Development Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Drizzle ORM** - Database toolkit (para futuras features)

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - [Download aquí](https://nodejs.org/)
- **npm** (viene con Node.js) o **yarn** - [Download yarn](https://yarnpkg.com/)
- **Git** - [Download aquí](https://git-scm.com/)

> **💡 Tip:** Verificá las versiones con:
> ```bash
> node --version  # debería ser 18.x o superior
> npm --version   # debería ser 9.x o superior
> git --version   # debería ser 2.x o superior
> ```

## 📦 Installation

### 1️⃣ Clonar el Repositorio
```bash
# Clonar el proyecto
git clone https://github.com/andres0772/landing-page-promocional-de-practica.git

# Entrar al directorio
cd landing-page-promocional-de-practica
```

### 2️⃣ Instalar Dependencias
```bash
# Usando npm (recomendado)
npm install

# O usando yarn
yarn install
```

> **⚠️ Nota:** La instalación puede tardar 2-5 minutos dependiendo de tu conexión y hardware.

### 3️⃣ Configurar Variables de Entorno (Opcional)
```bash
# Crear archivo de entorno local
cp .env.example .env.local

# Editar con tu editor preferido
nano .env.local  # o vscode .env.local
```

### 4️⃣ Verificar Instalación
```bash
# Verificar que todo esté instalado correctamente
npm run check
```

## 💻 Usage

### Development Mode (Recomendado para desarrollo)

```bash
# Iniciar servidor de desarrollo completo (frontend + backend)
npm run dev
```

**🌐 Acceso:**
- Frontend: http://localhost:5000
- Backend API: http://localhost:5000/api

**✅ Verificación:**
```bash
# En otra terminal, verificar que el servidor responda
curl http://localhost:5000/api/health
```

### Frontend Only (Solo para trabajar en el UI)

```bash
# Iniciar solo el cliente Vite
npm run dev:client
```

**🌐 Acceso:** http://localhost:5000

### Production Mode (Para testing antes de deploy)

```bash
# 1. Build del proyecto
npm run build

# 2. Iniciar servidor de producción
npm start
```

**🌐 Acceso:** http://localhost:5000

## 🔧 Troubleshooting

### Problemas Comunes

#### ❌ "Port 5000 already in use"
```bash
# Matar procesos en el puerto 5000
sudo lsof -ti:5000 | xargs kill -9

# O cambiar el puerto
PORT=3001 npm run dev
```

#### ❌ "Module not found" errors
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### ❌ "Permission denied" errors
```bash
# En Linux/Mac
sudo chown -R $(whoami) node_modules
npm install
```

#### ❌ "Typescript errors"
```bash
# Verificar tipos
npm run check

# Si hay errores, revisar tsconfig.json
```

### Verificación Paso a Paso

1. **Verificar estructura del proyecto:**
   ```bash
   ls -la
   # Deberías ver: client/, server/, shared/, package.json, etc.
   ```

2. **Verificar instalación de dependencias:**
   ```bash
   ls node_modules | head -10
   # Deberías ver carpetas como react, vite, express, etc.
   ```

3. **Verificar que los scripts funcionen:**
   ```bash
   npm run build
   # Debería terminar sin errores y crear la carpeta /dist
   ```

### Development Tips

**🔥 Hot Reload:** Los cambios en el código se reflejan automáticamente en el navegador.

**🐛 Debug Mode:** Usa las DevTools del navegador (F12) para inspeccionar y debuggear.

**📱 Responsive Testing:** 
- Usa las DevTools para probar diferentes tamaños de pantalla
- Test en móviles reales conectados a la misma red

**⚡ Performance Tips:**
- Evita imports innecesarios
- Usa React.memo para componentes pesados
- Optimiza imágenes con WebP format

## 🌐 Deployment

### Vercel (Recomendado)

1. **Conectar tu repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio GitHub
   - Vercel detectará automáticamente la configuración

2. **Variables de Entorno**
   - Configura las variables necesarias en el dashboard de Vercel
   - Las variables se inyectan automáticamente en cada deploy

3. **Deploy Automático**
   ```bash
   git push origin main
   # Vercel hará deploy automático
   ```

### Manual Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📄 License

Este proyecto está bajo la Licencia MIT. Mirá el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contact

**Andrés** - [@andres0772](https://github.com/andres0772)

**Project Link**: [https://github.com/andres0772/landing-page-promocional-de-practica](https://github.com/andres0772/landing-page-promocional-de-practica)

---

<div align="center">

**⭐ Proyecto personal de práctica para aprender desarrollo web moderno**

Hecho con ❤️ y ☕ en Buenos Aires

</div>
