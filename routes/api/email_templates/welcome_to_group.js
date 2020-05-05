const WelcomeToGroup = token => {
  return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0;">
   
       <head>
           <title>You are invited to join to clazzbuddy group!</title>
       </head>
   
           <body style="margin: 0; padding: 0;">
           <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff">
           <tbody>
             <tr>
               
               <td style="display:none;font-size:1px;color:rgba(255,255,255,0.05);line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
                 
                 <a rel="nofollow" style="display:none;font-size:1px;color:rgba(255,255,255,0.05);line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden">
         Click the link http://localhost:3000/invite/group/${token}
     </a>
               </td>
             </tr>
     <tr>
       <td align="center" style="padding-top:0;padding-bottom:0;padding-left:3%;padding-right:3%">
               </td></tr>      
           </tbody>
         </table>
       </td>
     </tr>
     <tr>
       <td align="center" style="padding-top:0;padding-bottom:0;padding-left:3%;padding-right:3%">
       </td>
     <tr>
       <td align="center" style="padding-top:19px;padding-bottom:21px;padding-left:3%;padding-right:3%">
       </td>
     </tr>
           </tbody>
         </table>
           </body>
   
     </html>
    `;
};

module.exports = { WelcomeToGroup };
