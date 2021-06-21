const designerService = require('./resources')
const {ForwardController} = require("../../ForwardController");
const httpProxy = require('express-http-proxy')
const designerProxy = httpProxy('http://localhost:8082')
const jwtVerification = require('../../authentication/tokenVerification')

class DesignerController extends ForwardController {

    router

    constructor(router) {
        super();
        this.router = router;
        this.register();
    }

    register() {
        designerService.forEach((operation) => {
            this.router[operation.toString()]('/designerservice/**',  (req, res) => {
                this.forward(req, res)
            });
        })
    }

     forward(req, res) {
        designerProxy(req, res)
    }
}

module.exports = {DesignerController};


