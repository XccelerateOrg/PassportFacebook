const express = require('express');
const app = express();

const morgan = require('morgan');

const fs = require('fs');
const https = require('https')

app.use(morgan('combined'));

const bodyParser = require('body-parser');

const session = require('express-session');

const setupPassport = require('./passport/passport')
const router = require('./router')(express);

app.use(session({
    secret: 'superDifficultAndSecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false|true}));

const options = {
    cert: fs.readFileSync('./localhost.crt'),
    key: fs.readFileSync('./localhost.key')
};

setupPassport(app);

app.use('/', router);


https.createServer(options, app).listen(8080, function(){
    console.log('app is listening to port 8080')
});
// app.listen(8080, function(){
//     console.log(`Application is listening to port 8080`)
// });