<h1 align="center">
  <img width="300" src="./../assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="./../assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Erstellen Sie die Bausteine für Ihre Anwendung mit einem einfachen und Open-Source-Designsystem.</p>
</p>

<h4 align="center">
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Website</a> |
  <a href="https://www.npmjs.com/package/mirrorful">NPM Package</a> |
</h4>

<h4 align="center">
  <a href="https://github.com/Mirrorful/mirrorful/blob/main/LICENSE.md">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Mirrorful is released under the MIT license." />
  </a>
  <a href="https://github.com/">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen" alt="PRs welcome!" />
  </a>
  <a href="https://github.com/Infisical/infisical/issues">
    <img src="https://img.shields.io/github/commit-activity/m/Mirrorful/mirrorful" alt="git commit activity" />
  </a>
  <a href="https://www.npmjs.com/package/mirrorful">
    <img src="https://img.shields.io/badge/Downloads-1k-orange" alt="Mirrorful downloads" />
  </a>
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">
    <img src="https://img.shields.io/badge/chat-on%20Slack-blueviolet" alt="Slack community channel" />
  </a>
  <a href="https://twitter.com/mirrorful">
    <img src="https://img.shields.io/twitter/follow/mirrorful?label=Follow" alt="Mirrorful Twitter" />
  </a>
</h4>

<img src="./../assets/Asset.png" width="100%" alt="Mirrorful Dashboard" />

**[Mirrorful](https://mirrorful.com)** ist ein einfaches, Open-Source-Designsystem. Installieren Sie Mirrorful, um Farben und andere Design-Token für Ihr Projekt zu generieren. Importieren Sie diese Tokens dann direkt in Ihre App als CSS-Variablen oder JSON. Nehmen Sie sich heute 5 Minuten Zeit und gestalten Sie für Langlebigkeit und Skalierbarkeit.

Erstellen Sie die Bausteine für eine schnelle Frontend-Entwicklung!

- **Starte neue Projekte mit einer Single Source of Truth**
- **Ändere visuell dein Theme**
- **Generiere Farben**
- 🔜 **Theme-Vorlagen**
- 🔜 **Lightweight Headless Komponenten Bibliothek**
- 🔜 **Eslint-Regeln**
- 🔜 **Teile Tokens zwischen Projekten**
- 🔜 **Figma-Integration**

Und mehr...

## 🎨 Warum sollte ich Mirrorful nutzen?

Designsysteme sind die Bausteine Ihrer App, aber viele Projekte setzen sie erst ein, wenn es schon zu spät ist, da sie schwer richtig einzurichten sind. Mit Mirrorful können Sie ein grundlegendes Designsystem in wenigen Minuten einrichten und gleichzeitig Flexibilität für spätere Anpassungen bewahren. Es ist leicht und denkbar einfach.

Wir haben es uns zur Aufgabe gemacht, Ihr Projekt so schön wie möglich zu gestalten. Die Messlatte für hochwertiges Design wird immer höher gelegt. Wir möchten allen dabei helfen, neue (und bestehende!) Projekte mit einfachen Designmerkmalen zu versehen.

Einfache Designsysteme beschleunigen auch die Entwicklung - selbst bei Projekten im Frühstadium! Einem Bericht zufolge ist es 47 % schneller, ein einfaches Online-Formular mit einem Designsystem zu erstellen. Ein Designsystem ist nützlich für Ingenieure, Designer und vor allem für Ihre Kunden, damit es nicht für jede Schaltfläche in Ihrer App eine zufällige Farbe gibt.

## 🚀 Los geht's

Mirrorful ist ein NPM-Paket, das als devDependency installiert werden sollte.

```bash
npm install mirrorful --save-dev
```

oder

```bash
yarn add mirrorful --dev
```

## ✨ Nutzung

Die folgenden Befehle starten einen lokalen Editor unter `localhost:5050`.

```
yarn run mirrorful
```

or

```
npx mirrorful
```

## 💿 Formate exportieren

Nachdem Sie Ihr Theme im Editor konfiguriert haben, können Sie es exportieren, um es in Ihrer Anwendung zu verwenden.

Wir exportieren derzeit in folgende Dateitformate: `.js`, `.ts`, `.css`, `.scss`, `.json`

Sie können dann entweder Ihre neuen Token als CSS-Variablen oder JavaScript-Konstanten verwenden!

**Verwenden von CSS-Variablen**

Beispiel:

```css
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}
```

**JavaScript-Konstanten verwenden**

Beispiel:

```javascript
<button backgroundColor={{ Tokens.primary.base }}>Click here</button>
```
## 🤝 Agnostische Komponentenbibliothek

Wir bemühen uns, unabhängig von Komponentenbibliotheken zu sein. Ganz gleich, ob Sie Material UI, Chakra UI, Tailwind, Ant Design oder sogar Ihre eigene Bibliothek verwenden, Mirrorful fügt sich nahtlos ein.

⚠️ `create-react-app` warnt möglicherweise, dass Sie versuchen, von außerhalb des `src`-Verzeichnisses zu importieren. Wir arbeiten an einer langfristigen Lösung, aber im Moment würden wir empfehlen, eine Kopie des Ordners `.mirrorful` in Ihrem `src`-Verzeichnis zu erstellen.

Schauen Sie sich die Beispiele an:

- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Basic Create React App](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)

Suchen Sie ein konkretes Beispiel? [Fragen Sie hier eines an!](https://github.com/Mirrorful/mirrorful/issues)

## ❤️ Community & Unterstützung

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - für Live-Diskussionen mit der Community und dem Mirrorful-Team.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - für Hilfe bei der Erstellung und tiefergehende Gespräche über Funktionen.
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - für alle Bugs und Fehler, auf die Sie bei Mirrorful stoßen.
- [Twitter](https://twitter.com/mirrorful) - Bleiben Sie auf dem Laufenden über die neuesten Produktaktualisierungen. Teilen Sie Ihre Memes!

## 🏘 Open-Source vs. Bezahlt

Dieses Repo ist vollständig MIT-lizenziert, mit Ausnahme derjenigen, die unter dem `ee`-Verzeichnis liegen und Premium-Unternehmensfunktionen enthalten, die eine Mirrorful-Lizenz erfordern. Wir konzentrieren uns derzeit zunächst auf die Entwicklung von Nicht-Unternehmensangeboten, die für die meisten Anwendungsfälle geeignet sein sollten.

Wir arbeiten hart daran, Mirrorful noch umfangreicher zu machen. Benötigen Sie Integrationen oder wollen Sie ein neues Feature? Fühlen Sie sich frei ein [Issue zu erstellen](https://github.com/Mirrorful/mirrorful/issues) oder tragen Sie direkt zum Repository bei. _(Der erste Entwurf dieser README wurde von einem Mitwirkenden erstellt!)_

## 🛡 Sicherheit

Mirrorful nimmt Sicherheitsfragen sehr ernst. Wenn Sie Bedenken bezüglich Mirrorful haben oder glauben, eine Sicherheitslücke entdeckt zu haben, wenden Sie sich bitte an die folgende E-Mail-Adresse [support@mirrorful.io](mailto:support@mirrorful.io). Versuchen Sie in der Nachricht, das Problem zu beschreiben und es im Idealfall zu reproduzieren. Das Team wird sich **unverzüglich** mit Ihnen in Verbindung setzen.

Bitte reichen Sie keine GitHub-Probleme ein und posten Sie keine Sicherheitslücken in unserem öffentlichen Forum, da diese öffentlich sind.

## ⭐ Bleiben Sie auf dem Laufenden

Es gibt eine Menge neuer Funktionen, die sehr häufig erscheinen. Geben Sie diesem Repo eine Stern, um auf dem Laufenden zu bleiben.

<img width="300" src="../assets/tower.png" alt="Bauen">

## 🛠️ Mitwirken

Ob groß oder klein, wir lieben Beiträge. Die Betreuer dieses Repos haben schon früher Open-Source-Projekte aufgebaut und lieben es. Herzlich willkommen!

Sie wissen nicht, wo Sie anfangen sollen? Sie können:

- [Buchen Sie ein kostenloses, druckfreies Pairing mit einem unserer Teammitglieder (auf Englisch)](https://usemotion.com/meet/teddyni/meet?d=15)!

- Treten Sie unserem [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) bei und stellen Sie uns dort Ihre Fragen. 

Unabhängig von dem PR werden alle GitHub-Avatare der Mitwirkenden mit deren Erlaubnis in die README von Mirrorful aufgenommen.

## 🪞 Mitwirkende

[//]: contributor-faces

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<a href="https://github.com/alexdanilowicz"><img src="https://avatars.githubusercontent.com/u/29822597?v=4" width="50" height="50" alt=""/></a> <a href="https://github.com/teddarific"><img src="https://avatars.githubusercontent.com/u/16343600" width="50" height="50" alt=""/></a> <a href="https://github.com/isabellytubao"><img src="https://avatars.githubusercontent.com/u/113177368" width="50" height="50" alt=""/></a> <a href="https://github.com/gfang200"><img src="https://avatars.githubusercontent.com/u/13005240?v=4" width="50" height="50" alt=""/></a> <a href="https://github.com/sallyxu"><img src="https://avatars.githubusercontent.com/u/1229627" width="50" height="50" alt=""/></a> <a href="https://github.com/zachsnoek"><img src="https://avatars.githubusercontent.com/u/26049962" width="50" height="50" alt=""/></a>

## 🌎 Übersetzungen

Mirrorful ist derzeit auf Englisch, Deutsch und demnächst auch auf Spanisch verfügbar. Helfen Sie uns, unsere Dokumentation und Benutzeroberfläche in Ihre Sprache zu übersetzen!

Alle Informationen finden Sie unter [diesem Issue](https://github.com/Mirrorful/mirrorful/issues/18).
