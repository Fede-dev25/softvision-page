# 📧 Guía: Configurar EmailJS para el Formulario de Contacto

## ⚡ Resumen Rápido
EmailJS permite enviar emails desde el formulario sin necesitar un backend. Es **GRATIS** hasta 200 emails/mes.

---

## 📝 Paso 1: Crear Cuenta en EmailJS

1. Ve a: **https://www.emailjs.com/**
2. Haz clic en **"Sign Up"** (Registrarse)
3. Usa tu email: **softvision.business@hotmail.com**
4. Contraseña: **Softvision2025!++**
5. Confirma tu email

---

## 🔧 Paso 2: Crear un Servicio de Email

1. Una vez dentro, ve a **"Email Services"** en el menú
2. Haz clic en **"Add New Service"**
3. Selecciona **"Outlook"** (porque usas Hotmail)
4. Completa:
   - **Service ID**: `service_softvision` (puedes elegir otro nombre)
   - **Service Name**: `SoftVision Hotmail`
5. Haz clic en **"Connect Account"**
6. Autoriza el acceso a tu cuenta de Hotmail
7. Guarda el **Service ID** que aparece

---

## 📋 Paso 3: Crear una Plantilla de Email

1. Ve a **"Email Templates"** en el menú
2. Haz clic en **"Create New Template"**
3. Edita la plantilla con este contenido:

### **Subject (Asunto):**
```
Nueva consulta desde SoftVision - {{from_name}}
```

### **Content (Contenido):**
```
Has recibido una nueva consulta desde el sitio web de SoftVision Consultora.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATOS DEL CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
🏢 Empresa: {{company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENSAJE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📬 Responder a: {{from_email}}
🌐 Enviado desde: www.softvisionconsultora.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SoftVision Consultora
Transformación Digital | IA | Automatización
```

4. En **"Settings"** (abajo):
   - **To Email**: `softvision.business@hotmail.com`
   - **From Name**: `{{from_name}}`
   - **Reply To**: `{{from_email}}`

5. Haz clic en **"Save"**
6. Guarda el **Template ID** que aparece (ej: `template_abc123`)

---

## 🔑 Paso 4: Obtener tu Public Key

1. Ve a **"Account"** → **"General"**
2. Busca **"Public Key"**
3. Copia la clave (ej: `xYz123AbC456`)

---

## 💻 Paso 5: Configurar en tu Código

Abre el archivo: **`js/main.js`**

Busca estas líneas (alrededor de la línea 210):

```javascript
const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI';
```

Reemplaza con tus valores:

```javascript
const EMAILJS_PUBLIC_KEY = 'xYz123AbC456';  // Tu Public Key
const EMAILJS_SERVICE_ID = 'service_softvision';  // Tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_abc123';  // Tu Template ID
```

---

## ✅ Paso 6: Probar el Formulario

1. Abre tu sitio web en el navegador
2. Ve a la sección **"Contacto"**
3. Completa el formulario con datos de prueba
4. Haz clic en **"Enviar consulta"**
5. Deberías ver: **"¡Gracias por tu mensaje!"**
6. Revisa tu email: **softvision.business@hotmail.com**

---

## 🎯 Resumen de lo que necesitas copiar:

| Dato | Dónde encontrarlo | Ejemplo |
|------|-------------------|---------|
| **Public Key** | Account → General | `xYz123AbC456` |
| **Service ID** | Email Services | `service_softvision` |
| **Template ID** | Email Templates | `template_abc123` |

---

## ⚠️ Importante

- ✅ **NUNCA** subas estas credenciales a un repositorio público
- ✅ El `.gitignore` ya está configurado para proteger archivos sensibles
- ✅ EmailJS es gratis hasta 200 emails/mes
- ✅ Si necesitas más, considera un plan pago ($9/mes por 1000 emails)

---

## 🐛 Troubleshooting

### El formulario no envía emails:
1. Verifica que copiaste bien las 3 credenciales
2. Asegúrate de que no hay espacios extra
3. Revisa la consola del navegador (F12) para errores

### Los emails no llegan:
1. Revisa la carpeta de SPAM
2. Verifica que el email de destino sea correcto en la plantilla
3. Asegúrate de haber autorizado la cuenta de Hotmail

### Error de CORS:
1. Verifica que tu Public Key sea correcta
2. Asegúrate de que el dominio esté autorizado en EmailJS

---

## 📞 Soporte

Si tienes problemas:
- 📧 Soporte EmailJS: https://www.emailjs.com/docs/
- 💬 Documentación: https://www.emailjs.com/docs/sdk/installation/

---

**¡Listo! Tu formulario de contacto funcionará perfectamente.** 🎉
