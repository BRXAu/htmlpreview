export default function tableContainerOpen(module01,background){
return `
<mj-raw>
<!-- start max-width 450px -->
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; margin:0; padding:0;" >
  <tr> 
    <td align="center" style="padding:${module01.padding}px;" > 
  <!--[if mso]> 
  <table role="presentation" width="${module01.width}" border="0" cellpadding="0" cellspacing="0" style="width:${module01.width}px; border-collapse:collapse;" > 
    <tr>
      <td style="background-color:${background}; padding:0px;" > 
  <![endif]-->
  <!--[if !mso]><!--> 
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style=" width:100%; max-width:${module01.width}px; border-collapse:collapse; background-color:${background}; " >
    <tr>
      <td style="background-color:${background}; padding:0px;"> 
  <!--<![endif]--> 
</mj-raw>

`

}



