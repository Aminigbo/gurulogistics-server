function OtpEmailTemplate({ otp }) {
  return `<div style="background: #f7f4fa; min-height: 100vh; padding: 0; margin: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 0 0 30px 0;">
       
        <div style="background: #fff; text-align: center; padding: 32px 0 24px 0;">
          <div style="width: 70px; height: 70px; background: #fff; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0;">
            <img src="https://firebasestorage.googleapis.com/v0/b/guru-logistics.firebasestorage.app/o/Group.png?alt=media&token=08ba3214-396a-46fe-b6c2-34ec14c2be3b" alt="Email Icon" style=""/>
          </div>
        </div>
        <div style="padding: 32px 40px 0 40px;">
          <h2 style="margin: 0 0 18px 0; color: #222; font-weight: 700; font-size: 2rem;">Email verification</h2>
          <div style="color: #222; font-size: 1.1rem; margin-bottom: 28px;">Congratulations,<br><br>You're almost set to start enjoying the Guru Logistics app. Use the code below to verify your email address and get started. The token expires in 48 hours.</div>
          <div style="text-align: center; margin-bottom: 32px;">
            <a style="background: #0076D2; color: #fff; text-decoration: none; padding: 14px 36px; border-radius: 6px; font-size: 1.1rem; font-weight: bold; display: inline-block;">${otp}</a>
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 18px 0;">
        <div style="text-align: center;">
          <a href="#" style="margin: 0 8px;"><img src="https://img.icons8.com/color/36/000000/facebook-new.png" style="vertical-align:middle;"/></a> 
          <a href="#" style="margin: 0 8px;"><img src="https://img.icons8.com/color/36/000000/instagram-new.png" style="vertical-align:middle;"/></a>
        </div>
        <div style="text-align: center; color: #222; margin-top: 18px; font-size: 0.95rem;">
          Guru Logistics App, All Rights Reserved.
        </div>
        <div style="text-align: center; color: #222; margin-top: 8px; font-size: 0.95rem;">
          | <a href="#" style="color: #222; text-decoration: underline;">Privacy Policy</a> | <a href="#" style="color: #222; text-decoration: underline;">Contact Details</a> |
        </div>
        <div style="text-align: left; color: #aaa; margin: 18px 0 0 18px; font-size: 0.85rem;">
          <a href="#" style="color: #aaa; text-decoration: underline;">Unsubscribe</a>
        </div>
         
      </div>
    </div>`
}


function ReportBethelEmailTemplate({ event, type, report, name, email, phone, state }) {
  return `<div style="background: #f7f4fa; min-height: 100vh; padding: 0; margin: 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 0 0 30px 0;">
   
    <div style="background: #fff; text-align: center; padding: 32px 0 24px 0;">
      <div style="width: 70px; height: 70px; background: #fff; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 0;">
        <img src="https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/assets//icon.png" alt="Email Icon" style=""/>
      </div>
    </div>
    <div style="padding: 32px 40px 0 40px;">
      <h2 style="margin: 0 0 18px 0; color: #222; font-weight: 700; font-size: 2rem;">${type} Report</h2>
      <div style="color: #222; font-size: 1.1rem; margin-bottom: 28px;">${name} reported ${type == "BETHEL" ? "a Bethel" : "an Event"}.<br><br>
      
        <div style="color: #222; font-size: 1.1rem; margin-bottom: 28px;">
          <b>Report</b>: ${report} <br><br>
          <b>${type == "BETHEL" ? "Bethel" : "Event"}</b>: ${event} <br><br> 
        </div>

        <div style="color: #222; font-size: 1.1rem; margin-bottom: 28px;">
          <b>Reporter info</b> 
          <p>${name}</p> 
          <p>${email}</p> 
          <p>${phone}</p> 
          <p>${state}</p> 
        </div>

      </div>
     
    </div>
    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 18px 0;">
    <div style="text-align: center;">
      <a href="#" style="margin: 0 8px;"><img src="https://img.icons8.com/color/36/000000/facebook-new.png" style="vertical-align:middle;"/></a> 
      <a href="#" style="margin: 0 8px;"><img src="https://img.icons8.com/color/36/000000/instagram-new.png" style="vertical-align:middle;"/></a>
    </div>
    <div style="text-align: center; color: #222; margin-top: 18px; font-size: 0.95rem;">
      Guru Logistics App, All Rights Reserved.
    </div>
    <div style="text-align: center; color: #222; margin-top: 8px; font-size: 0.95rem;">
      | <a href="#" style="color: #222; text-decoration: underline;">Privacy Policy</a> | <a href="#" style="color: #222; text-decoration: underline;">Contact Details</a> |
    </div>
    <div style="text-align: left; color: #aaa; margin: 18px 0 0 18px; font-size: 0.85rem;">
      <a href="#" style="color: #aaa; text-decoration: underline;">Unsubscribe</a>
    </div>
     
  </div>
</div>`
}


module.exports = {
  ReportBethelEmailTemplate,
  OtpEmailTemplate
}