const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//Set up the jade views
// ---------------------------------------
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'jade');
// ---------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended  : false}));
app.use(express.static(path.join(__dirname , 'public')));

app.get('/' , (req , res)=>{
    // res.send('<h1>Hello world</h1>'); //if write console.log('hello world'), then hello world shows up in the terminal because run on the server, if want to send to client then must write like as writed 
    res.render('index' , {title : 'Welcome'});
})
app.get('/about' , (req , res)=>{
    // res.send('<h1>Hello world</h1>'); //if write console.log('hello world'), then hello world shows up in the terminal because run on the server, if want to send to client then must write like as writed 
    res.render('about');
})

app.get('/contact' , (req , res)=>{
    res.render('contact');
})

app.post('/contact/send' , (req , res)=>{
// this is your project that i fork it on codesandbox you can freely check it
//     https://codesandbox.io/s/silly-cohen-mdj37
    
// google address for allow to accessing another device:
//     https://accounts.google.com/b/0/displayunlockcaptcha

// pouya read below article,this explain all steps to enable gmail transporting. 
// https://community.nodemailer.com/using-gmail/
    

    let transporter = nodemailer.createTransport({
        // 'service' : 'Gmail',
        // host : "localhost",
        port : 2000,
        secure : false,
        auth : {
            // type : 'OAuth2',
            user : 'pouyahobbi504@gmail.com',
            // accessToken : 'myAccessToken',
            // refreshToken : 'myRefreshToken',
            pass : "pass" // sajjad: type your real password
        }
    });
    let mailOptions = {
        from : 'Brad Traversy <pouyahobbi504@gmail.com>',
        to:'support@joomdigi.com',
        subject : 'Website submission'    ,
        text : 'You have a submission with the following details... Name :  '+req.body.name+ 'Email:' +req.body.email+ 'Message : ' +req.body.message ,
        html : '<p>You have a submission with the following details...</p><ul><li> Name :'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message : '+req.body.message+'</li></ul>',
    }
    transporter.sendMail(mailOptions , function(error , info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message sent : ' + info.response);
            res.redirect('/');
        }
    })
})
app.listen(2000);
console.log('Server is running on port 2000');
