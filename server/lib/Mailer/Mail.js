var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var fs = require('fs');

var template = fs.readFileSync(__dirname+"/templates/mail.html", 'utf8');

//console.log(__dirname+"/templates/mail.html")


//console.log(template)
// create reusable transporter object using SMTP transport
//smtp-117262.m62.wedos.net
//ot@drojd.eu
var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
        user: 'bot@mg.drojd.cz',
        pass: 'X@f5Ol2*re'
       }
    }
);

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails





var mailOptions = {
    from: 'Drojd Bot <bot@mg.drojd.cz>', // sender address
    to: 'dolezal000@gmail.com', // list of receivers
    subject: 'Vítejte zde tady fakt', // Subject line
    html: template// html body
};

// send mail with defined transport object

module.exports=function(){
console.log("start");
/*
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});
*/
}