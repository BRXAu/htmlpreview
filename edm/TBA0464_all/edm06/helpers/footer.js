export default function footer(icons,paths){
  return `
  <mj-raw>
    <table class="safe-table" role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
      <tr>
        <!-- Text Column -->
        <td class="footer-text" valign="bottom" align="left" style="">
          <span class="footer-raw-text" style="">
            <strong style="font-weight: bold;">Stay in touch</strong><br>
            Connect with us and keep up to date with the latest&nbsp;from&nbsp;BHP
          </span>
        </td>
        <!-- Facebook Column -->
        <td width="28" valign="bottom" style="width: 22px; padding: 0 10px 0 10px;">
          <a class="footer-icon-link" href="${icons.facebook.url}" target="_blank">
            <img class="footer-icon-img" src="${paths.current}${icons.facebook.src}" width="28" height="28" alt="${icons.facebook.alt}" border="0"/>
          </a>
        </td>
        <!-- Instagram Column -->
        <td width="28" valign="bottom" style="width: 22px; padding: 0 10px 0 0px;">
          <a class="footer-icon-link" href="${icons.linkein.url}" target="_blank">
            <img class="footer-icon-img" src="${paths.current}${icons.linkein.src}" width="28" height="28" alt="${icons.linkein.alt}" border="0"/>
          </a>
        </td>
        <!-- YouTube Column -->
        <td width="28" valign="bottom" style="width: 22px; padding: 0 25px 0 0px;">
          <a class="footer-icon-link" href="${icons.youtube.url}" target="_blank">
            <img class="footer-icon-img" src="${paths.current}${icons.youtube.src}" width="28" height="28" alt="${icons.youtube.alt}" border="0"/>
          </a>
        </td>
      </tr>
    </table>
  </mj-raw>
  `
}