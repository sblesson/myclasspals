const mailer = require('nodemailer');
const { Hello } = require('./email_templates/hello_template');
const { Thanks } = require('./email_templates/thanks_template');
const { WelcomeToGroup } = require('./email_templates/welcome_to_group');

const getEmailData = (to, name, template, token) => {
  let data = null;

  switch (template) {
    case 'hello':
      data = {
        to: to,
        from: 'clazzbuddy.com <support@clazzbuddy.com>',
        subject: `Hello ${name}`,
        html: Hello()
      };
      break;

    case 'thanks':
      data = {
        from: 'clazzbuddy.com <support@clazzbuddy.com>',
        to: to,
        subject: `Hello ${name}`,
        html: Thanks()
      };
      break;
    case 'welcome_group':
      data = {
        from: 'clazzbuddy.com <support@clazzbuddy.com>',
        to: to,
        subject: `Welcome to group ${name} ${token}`,
        html: WelcomeToGroup(token)
      };
    default:
      data = {
        from: 'clazzbuddy.com <support@clazzbuddy.com>',
        to: to,
        subject: `REGISTER ${name} ${token}`,
        html: WelcomeToGroup(token)
      };
  }
  return data;
};

const sendEmail = (toEmail, name, adminEmail, adminPassword, type, token) => {
  const smtpTransport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'Gmail',

    //host: 'smtp.gmail.com',
    auth: {
      type: 'login', // default
      user: adminEmail,
      pass: adminPassword
    }
  });
  console.log(type);

  const mail = getEmailData(toEmail, name, type, token);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(' email sent successfully');
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
