const { default: insertCTA } = await import(`./cta.js`)
const { default: footer } = await import(`./footer.js`)
const { default: tableContainerOpen } = await import(`./tableContainer.js`)
const { default: tableContainerClose } = await import(`./tableContainerClose.js`)

export const helpers = {
  insertCTA,
  footer,
  tableContainerOpen,
  tableContainerClose
}