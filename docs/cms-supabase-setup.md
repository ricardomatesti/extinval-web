# CMS + Supabase Setup

## 1. Variables de entorno

Añade esto a tu `.env.local` o a las variables del proyecto en producción:

```env
CMS_EMAIL=marketing@tuempresa.com
CMS_PASSWORD=pon-aqui-una-password-segura
JWT_SECRET=pon-aqui-una-clave-larga-y-segura
SUPABASE_URL=https://TU-PROYECTO.supabase.co
SUPABASE_SERVICE_KEY=tu-service-role-key
```

Notas:

- `CMS_EMAIL` y `CMS_PASSWORD` controlan el acceso al panel privado.
- `JWT_SECRET` firma la sesión del editor.
- `SUPABASE_SERVICE_KEY` solo debe existir en servidor. No se expone al navegador.

## 2. Crear la tabla en Supabase

Abre el SQL Editor de Supabase y ejecuta el contenido de [supabase/cms_content.sql](/Users/ricardosierraordones/Desktop/Coding/ExtinvalLanding/extinval-web/supabase/cms_content.sql:1).

## 3. Arrancar y comprobar

1. Ejecuta `npm run dev`
2. Entra a `/panel-personal`
3. Inicia sesión con `CMS_EMAIL` + `CMS_PASSWORD`
4. En la parte superior del panel debe aparecer:
   - `Guardando en Supabase` si está bien conectado
   - `Modo local (JSON)` si aún falta configurar Supabase

## 3.1. Poblar Supabase la primera vez

Cuando Supabase ya esté conectado, sube el contenido inicial editable con:

```bash
npm run cms:seed:push
```

Si antes quieres revisar el seed generado:

```bash
npm run cms:seed:json
```

Eso escribe un snapshot en `data/cms-seed.json`.

## 4. Cómo funciona el guardado

- Con Supabase configurado:
  - todos los cambios se guardan en la tabla `cms_content`
  - cualquier visitante verá el contenido actualizado
- Sin Supabase:
  - el sistema cae a `data/cms-content.json`
  - sirve para local, pero no como CMS real de producción

## 5. Qué se puede editar ahora

- Textos y títulos marcados con `EditableField`
- Imágenes marcadas con `EditableImage`
- Fondos/cabeceras marcados con `EditableBackground`

No cambia estructuras complejas ni layout.
