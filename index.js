const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const eurekaRegistration = require('./eureka')
const expressJwt = require('express-jwt');
const jwtVerification = require('./controller/authentication/tokenVerification')
const router = require('./controller/')


/*eurekaRegistration().start((error) => {
    if (error){
        console.log(error);
    }
})

 */

const origin = {
    origin: 'http://localhost:4200',
    credentials: true
};

const app = express();

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
app.use('/api/', cors(origin), router)

app.use('/services', expressJwt({secret: 'secret', algorithms: ['HS256']}), cors(origin), router);

app.use(function (err, request, response, next) {
    if (err.name === 'UnauthorizedError'){
        response.status(401).json('unauthorized');
    }
});

app.listen(8081, () => console.log("server has started"));


