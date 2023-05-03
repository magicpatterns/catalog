<div class="container">
  <h1>Sveltekit + Mirrorful Example</h1>
  <div>
    <p class="color-whiskey">This text is in color whiskey 900.</p>
    <p class="color-amethyst">This text is in color amethyst 900.</p>
    <p class="font-large">This text is in font size large.</p>
    <p class="font-medium">This text is in font size medium.</p>
    <p class="font-small">This text is in font size small.</p>

    <button class="shadow-small">SMALL SHADOW</button>
    <button class="shadow-medium">MEDIUM SHADOW</button>
    <button class="shadow-large">LARGE SHADOW</button>
  </div>
</div>

<style>
  @import '../mirrorful/theme.css';

  .color-whiskey {
    color: var(--color-whiskey-900);
  }

  .color-amethyst {
    color: var(--color-amethyst-900);
  }
  .font-large {
    font-size: var(--font-size-lg);
  }

  .font-medium {
    font-size: var(--font-size-md);
  }

  .font-small {
    font-size: var(--font-size-sm);
  }

  .shadow-small {
    box-shadow: var(--box-shadow-sm);
  }

  .shadow-medium {
    box-shadow: var(--box-shadow-md);
  }

  .shadow-large {
    box-shadow: var(--box-shadow-dark-lg);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
</style>
