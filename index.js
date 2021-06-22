const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const eurekaRegistration = require('./eureka')
const expressJwt = require('express-jwt');
const jwtVerification = require('./controller/authentication/tokenVerification')
const router = require('./controller/')
const http = require('http');

const https = require('https');
const fs = require('fs');


const app = express();

const options = {
    key: fs.readFileSync('C:/Users/rbren/localhost.key'),
    cert: fs.readFileSync('C:/Users/rbren/localhost.cert'),
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app)


//Default cors options
const origin = {
    origin: 'http://localhost:4200',
    credentials: true
};

//Angular Clients
const whitelist = ['https://localhost:4200', 'http://localhost:4200'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}

eurekaRegistration().start((error) => {
    if (error){
        console.log(error);
    }
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.raw());

function log(request, response, next){
    console.log('url:', request.url, 'method:', request.method);
    next();
}

app.use(log);
app.use('/api/', cors(origin), router);

app.use('/services', expressJwt({secret: 'secret', algorithms: ['HS256']}), cors(origin), router);

app.use(function (err, request, response, next) {
    if (err.name === 'UnauthorizedError'){
        response.status(401).json('unauthorized');
    }
});


httpServer.listen(8082, () => {
    console.log("http server has started")
});
httpsServer.listen(8081, () => {
    console.log("https server has started")
});


