const { default: insertCTA } = await import(`./cta.js`)
const { default: footer } = await import(`./footer.js`)

export const helpers = {
  insertCTA,
  footer
}