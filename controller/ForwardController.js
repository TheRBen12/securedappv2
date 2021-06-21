class ForwardController{

    router

    constructor(router) {
        this.router = router;
    }

    forward(){
        console.log('ControllerBase: '  + ' -> Not implemented!')
        return null
    }

    register(){
        console.log('ControllerBase: ' + ' -> Not implemented!')
        return null
    }
}

module.exports = {ForwardController}
