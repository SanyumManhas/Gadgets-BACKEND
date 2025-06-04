
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:'smtp.hostinger.com',
    port:465,
    secure:true,
    auth:{
        user:'class@gtbinstitute.com',
        pass:'Gtboutlook1#'
    }
})

module.exports = transporter;