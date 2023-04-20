<h1 align="center">
  <img width="300" src="../assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="../assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Crea los cimientos de tu aplicación con Mirrorful: un framework de diseño simple y de código abierto.</p>
</p>

<h4 align="center">
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Página web</a> |
  <a href="https://www.npmjs.com/package/mirrorful">NPM Package</a> | <a href="https://www.mirrorful.com/docs/home/intropage">Docs</a>
</h4>

<h4 align="center">
  <a href="https://github.com/Mirrorful/mirrorful/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Mirrorful is released under the MIT license." />
  </a>
  <a href="https://github.com/">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/Mirrorful/mirrorful/issues">
    <img src="https://img.shields.io/github/commit-activity/m/Mirrorful/mirrorful" alt="git commit activity" />
  </a>
  <a href="https://www.npmjs.com/package/mirrorful">
    <img src="https://img.shields.io/badge/Downloads-2.1k-orange" alt="Mirrorful downloads" />
  </a>
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">
    <img src="https://img.shields.io/badge/chat-on%20Slack-blueviolet" alt="Slack community channel" />
  </a>
  <a href="https://twitter.com/mirrorful">
    <img src="https://img.shields.io/twitter/follow/mirrorful?label=Follow" alt="Mirrorful Twitter" />
  </a>
</h4>

<img src="../assets/Asset.png" width="100%" alt="Mirrorful Dashboard" />

**Lee esto en otros lenguajes**: <kbd>[<img title="English" alt="English language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/us.svg" width="22">](i18n/README.en.md)</kbd>
<kbd>[<img title="German" alt="German language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/de.svg" width="22">](i18n/README.de.md)</kbd>
<kbd>[<img title="Swedish" alt="Swedish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/se.svg" width="22">](i18n/README.sv.md)</kbd>
<kbd>[<img title="Turkish" alt="Turkish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/tr.svg" width="22">](i18n/README.tr.md)</kbd>

**[Mirrorful](https://mirrorful.com)** Mirrorful es un framework de diseño simple y de código abierto. Instala Mirrorful para generar colores y otros tokens de diseño para tu proyecto. Después, importa los tokens directamente en tu aplicación.

- **Empieza un nuevo proyecto con una fuente de datos**
- **Modifica visualmente tu tema**
- **Genera colores**
- 🔜 **Plantillas de tema**
- 🔜 **Libreria ligera de componentes Headless**
- 🔜 **Reglas de Eslint**
- 🔜 **Propaga tokens entre proyectos**
- 🔜 **Integración con Figma**

Y más…

## 🎨 ¿Por qué deberías de usar Mirrorful?

Los sistemas de diseño son los cimientos de tu aplicación, pero muchos proyectos no adoptan un tema hasta que es demasiado tarde, ya que es difícil de implementarlo correctamente. Mirrorful te provee con un sistema de diseño básico en minutos, mientras que te da flexibilidad de customización. Es ligero y súper simple.

Tenemos la misión de ayudar a tu proyecto a que sea lo mas lindo posible. El listón de diseño de calidad está cada vez más alto. Queremos ayudarte a añadir tokens de diseño simple a proyectos nuevos (y existentes!)

Además los sistemas de diseño simples te ayudan a acelerar el desarrollo - incluso al principio de tu proyecto! Un reporte sugiere que es 47% más rápido construir un formulario simple con un sistema de diseño. Es útil para los ingenieros, diseñadores, y especialmente para los clientes, si no hay un color diferente para cada botón en tu aplicación.

## 🚀 Empieza aquí

Mirrorful es un paquete NPM ideado para ser instalado como una dependencia de desarrollo.

```bash
npm install mirrorful -D
```

o

```bash
yarn add mirrorful -D
```

## ✨ Uso

Los siguientes comandos iniciaran un editor local en el `localhost:5050`.

```
yarn run mirrorful
```

o

```
npx mirrorful editor
```

## 💿 Formatos de exportación

Después de configurar tu editor, puedes exportarlo para usarlo en tu aplicación.

Actualmente exportamos los siguientes tipos de archivos: `.js`, `.ts`, `.css`, `.scss`, `.json`

**Usando variables de CSS**

Ejemplo:

```css
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}
```

**Usando constantes de Javascript**

Ejemplo:

```javascript
<button backgroundColor={{ Tokens.primary.base }}>Click here</button>
```

## 🤝 Librería de componentes agnóstica

Nos esforzamos por ser una librería de componentes agnóstica. Ya sea que uses Material UI, Chakra UI, Tailwind, Ant Design, o incluso una librería interna, Mirrorful te va a enganchar.

⚠️ `create-react-app` puede que te advierta que estas tratando de importar desde afuera del directorio `src`. Estamos trabajando en una solución a largo plazo, pero por ahora, te recomendamos hacer una copia del folder `.mirrorful` en tu directorio `src`.

Revisa nuestros ejemplos:

- [Mirrorful 🤝 Tailwind CSS (and Next)](https://github.com/Mirrorful/mirrorful/tree/main/examples/tailwind-next)
- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Basic Create React App](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)
- [Mirrorful 🤝 Basic Nuxt 3 App](https://github.com/Mirrorful/mirrorful/tree/main/examples/nuxt-3)

¿Buscas un ejemplo en específico? [¡Pide uno aquí!](https://github.com/Mirrorful/mirrorful/issues)

## ❤️ Comunidad y soporte

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - para discutir con la comunidad y el equipo de Mirrorful.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - para ayudar a construir y conversaciones sobre funciones más avanzadas
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - GitHub issues - para bugs y errores que encuentres usando Mirrorful.
- [Twitter](https://twitter.com/mirrorful) - para mantenerte informado sobre las últimas actualizaciones del producto.

## 🏘 Codigo abierto vs pagado

Este repositorio está completamente bajo la licencia MIT.

Estamos trabajando duro para hacer Mirrorful más extenso. Necesitas cualquier tipo de integraciones o quieres una nueva funcion? Siéntete libre de [crear un issue](https://github.com/Mirrorful/mirrorful/issues) o contribuir directamente al repositorio. _(El primer draft de este README fue hecho por un contribuidor!)_

## 🛡 Seguridad

Mirrorful se toma la seguridad muy en serio. Si tienes cualquier duda sobre Mirrorful o crees que has descubierto una vulnerabilidad, por favor comunicate a través de el email [support@mirrorful.io](mailto:support@mirrorful.io). En el mensaje, trata de proveer una descripción del problema e idealmente la forma para reproducirlo. Nuestro equipo se comunicara contigo de forma **inmediata**.

## ⭐ Mantente al día

Hay nuevas funciones que llegarán de manera frecuente. Dale Star a este repo para mantenerte al día.

<img width="300" src="../assets/tower.png" alt="Build">

## 🛠️ Contribución

Ya sea grande o pequeña, nos encantan las contribuciones. Los mantenedores de esta repo han construido proyectos de código abierto anteriormente y les encanta. Bienvenido!

Para correr Mirrorful de mandera local, puedes leer las [instrucciones aqui](https://mirrorful.com/docs/home/contributing)

¿No sabes por dónde empezar? Puedes:

- [Reservar una sesión gratuita, sin presión de pairing con un miembro de nuestro equipo](https://usemotion.com/meet/teddyni/meet?d=15)!

- Ingresar a nuestro [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) y hacer una cualquier pregunta ahi.

No importa el PR, todos los avatares de Github de los contribuidores, serán agregados al README de Mirrorful, con su permiso.

## 🪞 Contribuidores

<a href="https://github.com/mirrorful/mirrorful/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mirrorful/mirrorful" />
</a>

## 🌎 Traducciones

Mirrorful está actualmente disponible en inglés, [alemán 🇩🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.de.md), [suizo 🇸🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.sv.md), y [tuco 🇹🇷](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.trs.md), entre otros idiomas. Ayudanos a traducir nuestra documentación y UI a tu idioma!

Puedes encontrar toda la información en [este issue](https://github.com/Mirrorful/mirrorful/issues/18).
