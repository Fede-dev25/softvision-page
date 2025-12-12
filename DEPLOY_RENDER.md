# 🚀 Guía: Deploy en Render

## 📋 Pre-requisitos

✅ Cuenta de GitHub (gratis)  
✅ Cuenta de Render (gratis)  
✅ Proyecto listo en tu computadora

---

## 🎯 Paso 1: Subir el Proyecto a GitHub

### 1.1 Crear repositorio en GitHub

1. Ve a: **https://github.com**
2. Inicia sesión (o crea una cuenta gratis)
3. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
4. Configura:
   - **Repository name**: `softvision-page`
   - **Description**: `Sitio web de SoftVision Consultora`
   - **Visibilidad**: 
     - ✅ **Private** (recomendado para proyectos de clientes)
     - O **Public** si quieres que sea visible
5. **NO** marques ninguna opción de inicialización
6. Haz clic en **"Create repository"**

### 1.2 Subir el código

Abre la terminal de VS Code (Ctrl + `) y ejecuta:

```bash
# Ir al directorio del proyecto
cd "c:\Users\TP3D\Desktop\Personal\softvision_page"

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - SoftVision website"

# Conectar con GitHub (reemplaza TU-USUARIO por tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/softvision-page.git

# Cambiar a rama main
git branch -M main

# Subir el código
git push -u origin main
```

**Nota**: Te pedirá usuario y contraseña de GitHub. Si tienes autenticación de 2 factores, necesitas crear un **Personal Access Token** en GitHub Settings.

---

## 🌐 Paso 2: Crear Cuenta en Render

1. Ve a: **https://render.com**
2. Haz clic en **"Get Started"**
3. Regístrate con:
   - **Opción recomendada**: "Sign up with GitHub" (conecta directamente)
   - O usa tu email: `softvision.business@hotmail.com`

---

## 🚀 Paso 3: Deploy en Render

### 3.1 Crear nuevo Static Site

1. En el dashboard de Render, haz clic en **"New +"** → **"Static Site"**
2. Conecta con GitHub:
   - Si no lo hiciste antes, autoriza a Render a acceder a GitHub
   - Selecciona **"Configure account"** o **"Connect account"**
3. Busca y selecciona tu repositorio: **`softvision-page`**
4. Haz clic en **"Connect"**

### 3.2 Configurar el Deploy

En la pantalla de configuración:

| Campo | Valor |
|-------|-------|
| **Name** | `softvision` (o el nombre que prefieras) |
| **Branch** | `main` |
| **Root Directory** | (dejar vacío) |
| **Build Command** | (dejar vacío) |
| **Publish Directory** | `./` |
| **Auto-Deploy** | ✅ Yes (activado) |

5. Haz clic en **"Create Static Site"**

### 3.3 Esperar el Deploy

- Render comenzará a construir y deployar tu sitio
- Verás un log con el progreso
- Espera entre 1-3 minutos
- Cuando veas **"Your site is live"** ¡Listo! 🎉

---

## 🌍 Paso 4: Acceder a tu Sitio

Tu sitio estará disponible en:

```
https://softvision.onrender.com
```

(El nombre depende de lo que pusiste en "Name")

---

## 🔧 Paso 5: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio (ej: `softvisionconsultora.com`):

1. En Render, ve a tu sitio → **"Settings"**
2. Busca la sección **"Custom Domains"**
3. Haz clic en **"Add Custom Domain"**
4. Ingresa tu dominio
5. Sigue las instrucciones para configurar los DNS

---

## 🔄 Paso 6: Hacer Cambios en el Futuro

Cada vez que quieras actualizar tu sitio:

1. Edita los archivos en tu computadora
2. Abre la terminal en VS Code
3. Ejecuta:

```bash
git add .
git commit -m "Descripción de tus cambios"
git push
```

4. **Render detectará los cambios automáticamente** y redesplegará tu sitio
5. Espera 1-2 minutos y refresca tu navegador

---

## ✅ Checklist Final

Antes de hacer público tu sitio, verifica:

- [ ] El formulario está configurado con EmailJS
- [ ] Todas las imágenes cargan correctamente
- [ ] Los enlaces funcionan (Política de privacidad, LinkedIn, etc.)
- [ ] El sitio se ve bien en móvil (usa las dev tools de Chrome)
- [ ] El favicon aparece en el navegador
- [ ] No hay errores en la consola del navegador (F12)

---

## 📊 Monitoreo y Analytics (Opcional)

Para ver estadísticas de tu sitio:

### Google Analytics (Recomendado)

1. Ve a: **https://analytics.google.com**
2. Crea una propiedad para tu sitio
3. Obtén el código de seguimiento (ej: `G-XXXXXXXXXX`)
4. Agrega este código en `index.html` antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

5. Guarda, haz commit y push

---

## ⚠️ Troubleshooting

### El sitio no carga:
- Verifica que el "Publish Directory" sea `./`
- Asegúrate de que `index.html` esté en la raíz del proyecto

### Los estilos no cargan:
- Revisa que las rutas en `index.html` no tengan `../`
- Deben ser: `estilos/main.css` y NO `../estilos/main.css`

### Las imágenes no aparecen:
- Verifica que las rutas sean: `assets/img/Logo3.png`
- NO deben tener `../` al inicio

### Error 404:
- Asegúrate de que el archivo exista en el repositorio de GitHub
- Verifica mayúsculas/minúsculas en los nombres de archivos

---

## 💰 Costos

**Render Plan Gratuito incluye:**
- ✅ 100 GB de ancho de banda/mes
- ✅ SSL/HTTPS automático
- ✅ Deploy automático desde GitHub
- ✅ Sin límite de tiempo

**Suficiente para:**
- Miles de visitantes al mes
- Sitios estáticos como este
- Proyectos profesionales

---

## 📞 Soporte

- 📖 Documentación Render: https://render.com/docs/static-sites
- 💬 Discord Render: https://render.com/community
- 📧 Soporte: support@render.com

---

## 🎉 ¡Felicitaciones!

Tu sitio ya está en producción y accesible desde cualquier lugar del mundo.

**URL de tu sitio**: `https://softvision.onrender.com`

Comparte este link con tus clientes y colaboradores. 🚀
