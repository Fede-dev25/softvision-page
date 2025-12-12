# SoftVision Consultora - Sitio Web

Sitio web corporativo de SoftVision Consultora, empresa especializada en transformación digital, automatización e inteligencia artificial aplicada a negocios.

## 🚀 Características

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Integración con EmailJS para formulario de contacto
- ✅ Navegación suave entre secciones
- ✅ Política de privacidad incluida
- ✅ Optimizado para SEO
- ✅ Bootstrap 5 + CSS personalizado

## 📁 Estructura del Proyecto

```
softvision_page/
├── index.html              # Página principal
├── privacidad.html         # Página de política de privacidad
├── assets/
│   └── img/               # Imágenes y logos
├── estilos/
│   └── main.css           # Estilos personalizados
├── js/
│   └── main.js            # JavaScript personalizado
└── public_html/           # Archivos originales (backup)
```

## ⚙️ Configuración de EmailJS

Para activar el formulario de contacto:

1. Regístrate en [EmailJS](https://www.emailjs.com/) con el email: `softvision.business@hotmail.com`
2. Crea un servicio de email (ej: Gmail, Outlook)
3. Crea una plantilla de email con estos campos:
   - `{{from_name}}` - Nombre del remitente
   - `{{from_email}}` - Email del remitente
   - `{{company}}` - Empresa
   - `{{message}}` - Mensaje
   - `{{to_email}}` - Email de destino

4. Edita `js/main.js` y reemplaza:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'tu_public_key';
   const EMAILJS_SERVICE_ID = 'tu_service_id';
   const EMAILJS_TEMPLATE_ID = 'tu_template_id';
   ```

## 🌐 Deploy en Render

1. Sube el proyecto a GitHub
2. Ve a [Render.com](https://render.com/)
3. Crea un nuevo "Static Site"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Build Command**: (dejar vacío)
   - **Publish Directory**: `./`
6. Deploy automático en cada push a GitHub

## 🔧 Desarrollo Local

Para desarrollo local, usa un servidor web:

```bash
# Opción 1: Live Server (VS Code Extension)
# Instala "Live Server" y haz clic derecho en index.html > "Open with Live Server"

# Opción 2: Python
python -m http.server 8000

# Opción 3: Node.js
npx http-server
```

Luego abre: `http://localhost:8000`

## 📝 Contenido

- **Inicio**: Hero section con propuesta de valor
- **Servicios**: 6 servicios principales
- **Soluciones IA**: Casos de uso de inteligencia artificial
- **Nosotros**: Valores y enfoque de trabajo
- **Casos de éxito**: 3 casos reales de implementación
- **Contacto**: Formulario funcional con EmailJS
- **Política de privacidad**: Página legal completa

## 🎨 Tecnologías

- HTML5
- CSS3 (Bootstrap 5.3.2)
- JavaScript (Vanilla)
- EmailJS para envío de emails
- Bootstrap Icons
- Google Fonts (Poppins)

## 📧 Contacto

- **Email**: softvision.business@hotmail.com
- **LinkedIn**: [SoftVision IT](https://www.linkedin.com/company/softvisionit/)

## 📄 Licencia

© 2025 SoftVision Consultora. Todos los derechos reservados.
