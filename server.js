const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'key-334e49c58f7905974a1713c5a6bce136',
        domain: 'sandboxccff2ad0f0774e728d0e4ca7a7be0d15.mailgun.org'
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/get', (req, res) => {
    res.send('Node and express  are running.');
});

app.post('/send', (req, res) => {
    const mailOptions = {
        from:req.body.email,
        to:"it@mbc.ca",
        subject:"Testing",
        text:req.body.message
    }
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err)
            console.log('Error Occurs');
        else
            console.log('Message Sent!!');
    })

    res.send('Send Node and express');
});


app.listen(port, ()=>{
    console.log(`Express is running on port ${port}`);
});