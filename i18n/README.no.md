<h1 align="center">
  <img width="300" src="./../assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="./../assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Lag byggesteinene til appen din med Mirrorful: et enkelt, åpen kildekode designsystem rammeverk</p>
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
  <a href="https://github.com/Mirrorful/mirrorful/issues">
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

**Les på andre språk**: <kbd>[<img title="English" alt="English language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/us.svg" width="22">](i18n/README.en.md)</kbd>
<kbd>[<img title="German" alt="German language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/de.svg" width="22">](i18n/README.de.md)</kbd>
<kbd>[<img title="Swedish" alt="Swedish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/se.svg" width="22">](i18n/README.sv.md)</kbd>
<kbd>[<img title="Turkish" alt="Turkish language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/tr.svg" width="22">](i18n/README.tr.md)</kbd>
<kbd>[<img title="Portuguese" alt="Portuguese language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/pt.svg" width="22">
<img title="Portuguese" alt="Portuguese language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/br.svg" width="22">](i18n/README.pt.md)</kbd>
<kbd>[<img title="Norwegian" alt="Norwegian language" src="https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/no.svg" width="22">](i18n/README.no.md)</kbd>

**[Mirrorful](https://mirrorful.com)** Er et enkelt og åpent kildekode designsystem rammeverk. Installer Mirrorful for å generere farger og andre design token til ditt prosjekt. Så, importer disse tokens direkte inn til appen din som CSS variabler eller JSON. Det tar 5 minutter i dag, design og skaler for alltid.

Skap byggesteinene for rask front-end utvikling!

- **Start nye prosjekter med en kilde til sannhet**
- **Modifiser ditt tema visuelt**
- **Generer farger**
- 🔜 **Tema Maler**
- 🔜 **Lett bibliotek av hodeløse komponenter**
- 🔜 **Eslint regler**
- 🔜 **Spre token mellom prosjekter**
- 🔜 **Figma integrasjon**

og mer...

## 🎨 Hvorfor skal jeg bruke Mirrorful?

Designsystemer er byggesteinene i appen din, men mange prosjekter tar dem ikke i bruk før det er for sent fordi de er så vanskelige å sette opp riktig.
Mirrorful gjør det mulig å sette opp et grunnleggende designsystem på få minutter, samtidig gir det deg fleksibilitet til tilpasninger senere.
Det er lettvektig og veldig enkelt.

Vi har som mål å hjelpe ditt prosjekt til å være så vakkert som mulig. Kravet for design blir stadig høyere. Vi ønsker å hjelpe alle med å legge til enkle designtokens i nye (og eksisterende!) prosjekter.

Enkle designsystemer setter også fart på utviklingen - selv for prosjekter i tidlige stadier! En rapport antyder at det er 47% raskere å bygge ett enkelt skjema ved hjelp av et designsystem. Det er nyttig for ingeniører, designere og spesielt kundene dine at det ikke finnes en tilfeldig farge på hver eneste knapp i appen din.

## 🚀 Kom i gang

Mirrorful er en NPM pakke ment for å installeres som en dev dependency.

```bash
npm install mirrorful -D
```

eller

```bash
yarn add mirrorful -D
```

## ✨ Bruk

Følgende kommando kommer til å starte en lokal editor på `localhost:5050`

```
yarn run mirrorful
```

eller

```
npx mirrorful editor
```

## 💿 Eksporter Formater

Etter å ha konfigurert ditt tema i editoren kan du eksportere det for å bruke det i appen din.

For øyeblikket eksporterer vi til følgende filtyper: `.js`, `.ts`, `.css`, `.scss`, `.json`

**Bruk av CSS Variabler**

Eksempel:

```css
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}
```

**Bruk av JavaScript konstanter**

Exempel:

```javascript
<button backgroundColor={{ Tokens.colors.primary  }}>Click here</button>
```

## 🤝 Komponentbibliotek-agnostisk

Vi streber etter å være komponentbibliotekagnostiske. Uansett om du bruker Material UI, Chakra UI, Tailwind, Ant Design eller til og med ditt eget in-house bibliotek, integreres Mirrorful somløst.

`⚠️ create-react-app` kan varsle om at du forsøker å importere fra et sted utenfor `src`-mappen. Vi jobber på en langsiktig løsning, men for
øyeblikket anbefaler vi at du tar en kopi av `.mirrorful`-mappen i din `src` mappe.

Se på våre eksempler:

- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Basic Create React App](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)
- [Mirrorful 🤝 Sveltekit](https://github.com/Mirrorful/mirrorful/tree/main/examples/sveltekit)

Ser du etter et spesifikt eksempel? [Be om en her!](https://github.com/Mirrorful/mirrorful/issues)

## ❤️ Samfunn & Support

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - for en livlig diskusjon med samfunnet og Mirrorful teamet.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - for hjelp til å bygge og dypere samtaler om funksjoner og egenskaper.
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - for eventuelle bugs og feil du støter på når du bruker Mirrorful.
- [Twitter](https://twitter.com/mirrorful) - hold deg oppdatert på de seneste produktoppdateringene. Del dine memes!

## 🏘 Åpen kildekode vs. Betalt

Dette repository-et er fullt lisensiert under MIT-lisensen, med unntak av eventuelle filer under en `ee` katalog som inneholder bedriftsfunksjoner som krever en Mirrorful-lisens. For tiden fokuserer vi på å utvikle ikke-bedriftsfunksjoner som burde passe de fleste brukstilfeller.

Vi jobber hardt for å gjøre Mirrorful mer omfattende. Trenger du noen integrasjoner eller ønsker du en ny funksjon? Slå deg løs og [lag en issue](https://github.com/Mirroful/mirrorful/issues) eller bidra direkte til kodebasen.
_(Den første versjonen av denne README filen ble laget av en bidragsyter!)_

## 🛡 Sikkerhet

Mirroful tar sikkerhetsrisikoer på alvor. Om har noen bekymringer angående Mirrorful eller tror du har oppdaget en sårbarhet, vennligst kontakt oss via e-postadressen [support@mirrorful.io](mailto:support@mirrorful.io). Prøv å gi en beskrivelse av problemet og aller helst en ideell måte å reprodusere det på. Teamet vårt vil svare deg **umiddelbart**.

## ⭐ Hold deg oppdatert

Det er mange nye funksjoner som kommer ofte. Gi prosjektet en stjerne for å holde deg oppdatert.

<img width="300" src="./assets/tower.png" alt="Build">

## 🛠️ Bidra

Uansett om det er stort eller lite, elsker vi bidrag til prosjektet. Vedlikeholderne av dette repository-et har tidligere bygget åpen kildekode prosjekter og elsker det. Velkommen!

Ikke sikker på hvor du skal begynne? Du kan:

- [Book et gratis, null press, bli kjent møte med en av våre team-medlemmer](https://usemotion.com/meet/teddyni/meet?d=15)!

- Bli med i [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) og still spørsmål til hvem som helst der.

Uansett PR, kommer alle GitHub-avatarer fra bidragsytere til å bli lagt til i Mirrorful README med deres tillatelse.

## 🪞 Bidragsytere

<a href="https://github.com/alexdanilowicz"><img src="https://avatars.githubusercontent.com/u/29822597?v=4" width="50" height="50" alt=""/></a> <a href="https://github.com/teddarific"><img src="https://avatars.githubusercontent.com/u/16343600" width="50" height="50" alt=""/></a> <a href="https://github.com/isabellytubao"><img src="https://avatars.githubusercontent.com/u/113177368" width="50" height="50" alt=""/></a> <a href="https://github.com/gfang200"><img src="https://avatars.githubusercontent.com/u/13005240?v=4" width="50" height="50" alt=""/></a> <a href="https://github.com/sallyxu"><img src="https://avatars.githubusercontent.com/u/1229627" width="50" height="50" alt=""/></a> <a href="https://github.com/zachsnoek"><img src="https://avatars.githubusercontent.com/u/26049962" width="50" height="50" alt=""/></a>
<a href="https://github.com/tobiasdossinger"><img src="https://avatars.githubusercontent.com/u/33021996?v=4" width="50" height="50" alt=""/></a>
<a href="https://github.com/lagneshthakur"><img src="https://avatars.githubusercontent.com/u/13376802?v=4" width="50" height="50" alt=""/></a>

## 🌎 Oversettelser

Mirrorful er for øyeblikket tilgjengelig på Engelsk, [Tysk 🇩🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.de.md), [Svensk 🇸🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.sv.md), [Spansk 🇪🇸](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.es.md), [Tyrkisk 🇹🇷](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.tr.md), [Portugisisk 🇵🇹🇧🇷 ](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.pt.md)og [Norsk 🇳🇴](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.no.md). Hjelp oss å oversette vår dokumentasjon og brukergrensesnitt til ditt språk!

Alt av informasjon finnes i [denne issue](https://github.com/Mirrorful/mirrorful/issues/18).
