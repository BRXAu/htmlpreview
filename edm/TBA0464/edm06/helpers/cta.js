export default function insertCTA(cta,path,arrow){
  return `
    <table class="safe-table table-cta-border" role="presentation" width="120" border="0" cellpadding="0" cellspacing="0" style="width: ${cta.width}px;">
        <tr>
          <td class="cta-text" valign="middle">
            <!--[if mso]><i style="letter-spacing: 10px; mso-font-width: -100%; display: none;">&nbsp;</i><![endif]--><a class="cta-text-url" href="${cta.url}" target="_blank" style="">${cta.text}</a>
          </td>
          <td class="cta-arrow" width="15" align="right" valign="middle">
            <a class="img-href" href="${cta.url}" target="_blank">
              <img class="cta-arrow-img" src="${path}${arrow}" width="15" height="11" alt="">
            </a>
          </td>
        </tr>
      </table>
  `
}