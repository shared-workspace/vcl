export function footerLog() {
    const isNuxt3OrBridge = true
    console.log(
      [
        '👉 Report an issue: https://github.com/nuxt/nuxt/issues/new',
        '👉 Suggest an improvement: https://github.com/nuxt/nuxt/discussions/new',
        `👉 Read documentation: ${
          isNuxt3OrBridge ? 'https://nuxt.com' : 'https://v2.nuxt.com'
        }`,
      ].join('\n\n') + '\n',
    )
  }