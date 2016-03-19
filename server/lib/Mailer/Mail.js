var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var fs = require('fs');

var template = fs.readFileSync(__dirname+"/templates/mail.html", 'utf8');

var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: '',
        pass: ''
       }
    }
);

var mailOptions = {
    from: '',
    to: '',
    subject: '',
    html: template
};

module.exports=function(){

/*
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return error;
    }
});
*/
}