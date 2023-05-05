<h1 align="center">
  <img width="300" src="../assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="../assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Crie a fundação de sua aplicação com Mirrorful: um framework de <em>design systems</em> simples e de código aberto.</p>
</p>

<h4 align="center">
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Site</a> |
  <a href="https://www.npmjs.com/package/mirrorful">Pacote NPM</a> | <a href="https://www.mirrorful.com/docs/home/intropage">Documentação</a>
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

**Leia em outros idiomas**: <kbd>[<img title="English" alt="English language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/us.svg" width="22">](i18n/README.en.md)</kbd>
<kbd>[<img title="German" alt="German language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/de.svg" width="22">](i18n/README.de.md)</kbd>
<kbd>[<img title="Swedish" alt="Swedish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/se.svg" width="22">](i18n/README.sv.md)</kbd>
<kbd>[<img title="Turkish" alt="Turkish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/tr.svg" width="22">](i18n/README.tr.md)</kbd>
<kbd>[<img title="Spanish" alt="Spanish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/es.svg" width="22">](i18n/README.es.md)</kbd>
<kbd>[
<img title="Portuguese" alt="Portuguese language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/pt.svg" width="22">
<img title="Portuguese" alt="Portuguese language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/br.svg" width="22">
](i18n/README.pt.md)</kbd>

**[Mirrorful](https://mirrorful.com)** é um framework de _design systems_ simples, e de código aberto. Instale Mirrorful para criar cores e outros tokens de design para seu projeto. Então, importe esses tokens diretamente para sua aplicação.

- **Inicie novos projetos com uma fonte da verdade**
- **Modifique seu tema visualmente**
- **Crie cores**
- 🔜 **Modelos de Tema**
- 🔜 **Biblioteca de Componentes Headless leves**
- 🔜 **Regras Eslint**
- 🔜 **Propague tokens entre projetos**
- 🔜 **Integração com Figma**

E mais...

## 🎨 Por que eu deveria usar Mirrorful?

_Design system_ é a fundação de sua aplicação, mas muitos projetos não começam a utilizar antes que seja tarde demais porque é algo difícil de implementar corretamente. Mirrorful te entrega um _design system_ básico em minutos, deixando flexibilidade para customizações futuras. É leve e simples.

Estamos em uma missão de ajudar seu projeto a ser tão bonito quanto possível. A régua para designs de alta qualidade está ficando mais alta. Nós queremos ajudar todos a adicionar tokens de design simples a novos projetos (e a projetos existentes!).

_Design systems_ simples também aceleram o desenvolvimento — até em projetos nos estágios iniciais! Um relatório sugere que é 47% mais rápido de construir um simples formulário utilizando um _design system_. É útil para desenvolvedores, designes, e especialmente para seus clientes se não existir uma cor aleatória para cada botão na sua aplicação.

## 🚀 Passos iniciais

Mirrorful é um pacote NPM criado para ser instalado como uma dependência de desenvolvimento.

```bash
npm install mirrorful -D
```

ou

```bash
yarn add mirrorful -D
```

## ✨ Utilização

Os seguintes comandos iniciarão um editor local em `localhost:5050`.

```
yarn run mirrorful
```

ou

```
npx mirrorful editor
```

## 💿 Formatos de Exportação

Após configurar seu tema no editor, você pode exporta-lo para ser usado na sua aplicação.

Atualmente podemos exportar para os seguintes tipos: `.js`, `.ts`, `.css`, `.scss`, `.json`

**Usando variáveis CSS**

Exemplo:

```css
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}
```

**Usando Constantes Javascript**

Exemplo:

```javascript
<button backgroundColor={{ Tokens.colors.primary }}>Click here</button>
```

## 🤝 Agnóstico de Bibliotecas de Componentes

Nos esforçamos para sermos agnósticos de bibliotecas. Você pode utilizar Material UI, Chakra UI, Tailwind, Ant Design, ou até sua biblioteca interna, Mirrorful se liga facilmente.

⚠️ O `create-react-app` pode avisar que você está tentando importar de fora do diretório `src`. Estamos trabalhando em uma solução de longo prazo, mas por enquanto recomendamos que faça uma cópia do diretório `.mirrorful` para o diretório `src`.

Veja nossos exemplos:

- [Mirrorful 🤝 Tailwind CSS (e Next)](https://github.com/Mirrorful/mirrorful/tree/main/examples/tailwind-next)
- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Create React App básico](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)
- [Mirrorful 🤝 Aplicação Nuxt 3 básica](https://github.com/Mirrorful/mirrorful/tree/main/examples/nuxt-3)
- [Mirrorful 🤝 SvelteKit](https://github.com/Mirrorful/mirrorful/tree/main/examples/sveltekit)

Procurando por um exemplo específico? [Solicite um aqui!](https://github.com/Mirrorful/mirrorful/issues)

## ❤️ Comunidade e Suporte

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - para conversas em tempo real com a comunidade e a equipe do Mirrorful.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - para ajudar em conversas mais profundas sobre funcionalidades.
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - para quaisquer bugs e erros que encontrar usando Mirrorful.
- [Twitter](https://twitter.com/mirrorful) - mantenha-se atualizado com as ultimas atualizações de produto.

## 🏘 Código aberto vs. pago

Este repositório utiliza inteiramente a licença MIT.

Estamos trabalhando para tornar o Mirrorful mais extenso. Precisa de qualquer integração ou de alguma nova funcionalidade?
Sinta-se a vontade para [criar uma issue](https://github.com/Mirrorful/mirrorful/issues) ou contribuir diretamente ao repositório. _(O primeiro rascunho deste README foi feito por um contribuidor!)_

## 🛡 Segurança

Mirrorful leva problemas de segurança muito a sério. Se você tem preocupações sobre o Mirrorful ou acredita que encontrou uma vulnerabilidade, por favor entre em contato através do e-mail [support@mirrorful.io](mailto:support@mirrorful.io). Na mensagem, tente descrever o problema e uma maneira ideal de reproduzi-lo. O time irá retornar **imediatamente**.

## ⭐ Mantenha-se Atualizado

Existem muitas funcionalidades chegando com frequência. Dê uma estrela a esse repositório para se manter atualizado.

<img width="300" src="../assets/tower.png" alt="Build">

## 🛠️ Contribuindo

Seja grande ou pequena, nós amamos contribuições. Os mantenedores deste repositório construíram projetos de código aberto antes e adoram isso. Seja bem vindo!

Para rodar Mirrorful localmente, veja as [instruções aqui](https://mirrorful.com/docs/home/contributing)

Não tem certeza de por onde começar? Você pode:

- [Agende uma sessão de emparelhamento com alguém de nossa equipe, sem pressão e de graça](https://usemotion.com/meet/teddyni/meet?d=15)!
- [Book a free, non-pressure pairing sessions with one of our teammates](https://usemotion.com/meet/teddyni/meet?d=15)!

Não importa o PR, todos os avatares do Github de contribuidores serão adicionados ao README do Mirrorful caso seja permitido.

## 🪞 Contribuidores

<a href="https://github.com/mirrorful/mirrorful/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mirrorful/mirrorful" />
</a>

## 🌎 Traduções

O Mirrorful está atualmente disponível em Inglês, [Alemão 🇩🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.de.md), [Sueco 🇸🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.sv.md), [Turco 🇹🇷](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.trs.md), [Espanhol 🇲🇽](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.es.md) e [Portugês 🇵🇹🇧🇷](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.es.md), entre outros idiomas. Nos ajude a traduzir nossa documentação e interface para seu idioma!

Você pode encontrar todas informações [nessa issue](https://github.com/Mirrorful/mirrorful/issues/18).
