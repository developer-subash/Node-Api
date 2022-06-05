const nodemailer = require('nodemailer');
const emailNotification = nodemailer.createTransport({
       host: 'smtp.mailtrap.io',
       port: 2525,
       auth: {
           user: "930f52598c5372",
           pass: "0974bec7b04b09"
       }
})

export default emailNotification;