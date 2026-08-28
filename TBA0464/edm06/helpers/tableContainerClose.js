export default function tableContainerClose(module01){
return `
<mj-raw>
  <!--[if mso]> 
      </td>
    </tr>
  </table>
  <![endif]--> 
  <!--[if !mso]><!--> 
      </td>
    </tr>
  </table> 
<!--<![endif]-->
    </td>
  </tr>
</table>
</mj-raw>

`

}
