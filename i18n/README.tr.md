<h1 align="center">
  <img width="300" src="../assets/logo-light-mode.png#gh-light-mode-only" alt="Mirrorful">
  <img width="300" src="../assets/logo-dark-mode.png#gh-dark-mode-only" alt="Mirrorful">
</h1>
<p align="center">
  <p align="center">Uygulamanızın temellerini, basit ve açık kaynaklı tasarım altyapısıyla oluşturun.</p>
</p>

<h4 align="center">
  <a href="https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA">Slack</a> |
  <a href="https://mirrorful.com/">Website</a> |
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

**[Mirrorful](https://mirrorful.com)** basit, açık kaynaklı bir tasarım sistemi altyapısıdır. Projelerinizde renkler ve diğer tasarım elemanlarını oluşturmak için Mirrorful'ü yükleyin. Daha sonra, oluşturduğunuz bu elemanları uygulamanıza aktarın.

- **Yeni projelerinize doğru bir kaynakla başlayın**
- **Temalarınızı görsel olarak değiştirin**
- **Renkleri oluşturun**
- 🔜 **Tema şablonları**
- 🔜 **Hafif Headless Bileşen Kütüphanesi**
- 🔜 **Eslint Kuralları**
- 🔜 **Tokenları projeler arasında yayma**
- 🔜 **Figma entegrasyonu**

Ve daha fazlası...

## 🎨 Mirrorful'ı neden kullanmalıyım?

Tasarım sistemleri, uygulamanızın yapı taşlarıdır. Ancak birçok proje doğru bir şekilde kurulana kadar bunları benimsemez, çünkü kurulumları zordur. Mirrorful, temel bir tasarım sistemi için sizi dakikalar içinde hazırlar ve gelecekteki özelleştirmeler için esneklik sağlar. Hafif ve son derece basittir.

Projenizin olabildiğince güzel olmasına yardımcı olmak için çalışıyoruz. Yüksek kaliteli tasarım için çıta giderek yükseliyor. Herkesin yeni (ve mevcut) projelere basit tasarım simgeleri eklemesine yardımcı olmak istiyoruz.

Basit tasarım sistemleri aynı zamanda geliştirme sürecini de hızlandırır - hatta erken aşamadaki projeleri bile! Bir rapor, bir tasarım sistemi kullanarak basit bir form oluşturmanın %47 daha hızlı olduğunu öne sürüyor. Uygulamanızda her buton için rastgele bir renk yoksa, mühendisler,tasarımcılar ve özellikle müşterileriniz için de kullanışlıdır.

## 🚀 Başlarken

Mirrorful, bir geliştirici bağımlılığı olarak yüklenmesi amaçlanan bir NPM paketidir.

```bash
npm install mirrorful -D
```

veya

```bash
yarn add mirrorful -D
```

## ✨ Kullanım

Aşağıdaki komutlar, yerel bir düzenleyiciyi `localhost:5050` adresinde başlatacaktır.

```
yarn run mirrorful
```

veya

```
npx mirrorful
```

## 💿 Dışa Aktarma Biçimleri

Editörde temanızı yapılandırdıktan sonra, uygulamanızda kullanmak için dışa aktarabilirsiniz.

Şu anda, aşağıdaki dosya türlerine dışa aktarım yapmaktayız: `.js`, `.ts`, `.css`, `.scss`, `.json`

**CSS Değişkenlerini Kullanma**

Örnek:

```css
.primary-button {
  background-color: var(--color-primary);
}

.primary-button:hover {
  background-color: var(--color-primary-hover);
}
```

**JavaScript Sabitlerini Kullanma**

Örnek:

```javascript
<button backgroundColor={{ Tokens.primary.base }}>Click here</button>
```

## 🤝 Bağımsız Bileşen Kütüphanesi

Bağımsız bileşen kütüphanesi olmak için çalışıyoruz. Material UI, Chakra UI, Tailwind, Ant Design veya şirket içi kütüphanenizi kullanıyor olsanız bile, Mirrorful kolayca entegre edilebilir.

⚠️ `create-react-app`, src dizini dışından içe aktarma yapmaya çalıştığınızı uyarabilir. Uzun vadeli bir çözüm üzerinde çalışıyoruz, ancak şimdilik `.mirrorful` klasörünün bir kopyasını, src dizininize koymanızı öneririz.

Örneklerimize göz atın:

- [Mirrorful 🤝 Tailwind CSS (and Next)](https://github.com/Mirrorful/mirrorful/tree/main/examples/tailwind-next)
- [Mirrorful 🤝 Chakra UI](https://github.com/Mirrorful/mirrorful/tree/main/examples/with-chakra-ui)
- [Mirrorful 🤝 Basic Create React App](https://github.com/Mirrorful/mirrorful/tree/main/examples/create-react-app)
- [Mirrorful 🤝 Basic Nuxt 3 App](https://github.com/Mirrorful/mirrorful/tree/main/examples/nuxt-3)

Belirli bir örnek mi arıyorsunuz? [Buradan bir talepte bulunun!](https://github.com/Mirrorful/mirrorful/issues)

## ❤️ Topluluk ve Destek

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) - Mirrorful ekibiyle ve toplulukla canlı tartışma için.
- [GitHub Discussions](https://github.com/Mirrorful/mirrorful/discussions) - özellikler hakkında daha derin tartışmalar ve yardım almak için
- [GitHub Issues](https://github.com/Mirrorful/mirrorful/issues) - Mirrorful kullanırken karşılaştığınız hatalar için.
- [Twitter](https://twitter.com/mirrorful) - En son ürün güncellemeleriyle güncel kalın. Meme'lerinizi paylaşın!

## 🏘 Açık kaynak vs. ücretli

Bu repo tamamen MIT lisanslıdır.

Mirrorful'u daha kapsamlı hale getirmek için çok çalışıyoruz. Herhangi bir entegrasyona mı ihtiyacınız var veya yeni bir özellik mi istiyorsunuz? Bir sorun [oluşturmaktan](https://github.com/Mirrorful/mirrorful/issues) veya doğrudan repoya katkıda bulunmaktan çekinmeyin. _(Bu README'nin ilk taslağı bir katılımcı tarafından hazırlanmıştır!)_

## 🛡 Güvenlik

Mirrorful güvenlik konularına çok önem verir. Eğer Mirrorful ile ilgili herhangi bir endişeniz varsa veya bir zafiyet bulduğunuzu düşünüyorsanız, lütfen [support@mirrorful.io](mailto:support@mirrorful.io) e-posta adresi aracılığıyla iletişime geçin. Mesajda, sorunun tanımını ve nasıl bulduğunuzu adımlara bölerek anlatabilirsiniz. Ekip size **derhal** geri dönecektir.

## ⭐ Güncel Kalın

Sık sık yeni özellikler ekleniyor. Güncel kalmak için bu repo'yu favorilere ekleyin (star'layın).

<img width="300" src="../assets/tower.png" alt="Build">

## 🛠️ Katkıda bulunmak

İster büyük ister küçük olsun, katkıları seviyoruz. Bu reponun geliştiricileri daha önce açık kaynaklı projeler oluşturdular ve bunu seviyorlar. Hoş geldiniz!

Nereden başlayacağınızdan emin değil misiniz? Şunları yapabilirsiniz:

- [Bir takım arkadaşımızla ücretsiz, eğlenceli görüşme ayarlayın!](https://usemotion.com/meet/teddyni/meet?d=15)!

- [Slack](https://join.slack.com/t/mirrorful/shared_invite/zt-1ps2xtxh0-2NaixFfFzSKZbr5gw_AHfA) sunucumuza katılın ve bize istediğiniz soruyu sorun.

Katkıda bulunanların tüm Github avatarları, PR(Pull Request) ne olursa olsun izinleri alınarak Mirrorful README'ye eklenecektir.

## 🪞 Katkıda Bulunanlar

<a href="https://github.com/mirrorful/mirrorful/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mirrorful/mirrorful" />
</a>

## 🌎 Çeviriler

Mirrorful şu anda İngilizce, [Almanca 🇩🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.de.md), [İsveççe 🇸🇪](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.sv.md) ve [Türkçe 🇹🇷](https://github.com/Mirrorful/mirrorful/tree/main/i18n/README.tr.md) dillerinde kullanılabilir durumda. Dokümantasyon ve arayüzümüzü kendi dilinize çevirmemize yardımcı olun!

Bu konuyla ilgili tüm bilgileri [burada](https://github.com/Mirrorful/mirrorful/issues/18) bulabilirsiniz.
