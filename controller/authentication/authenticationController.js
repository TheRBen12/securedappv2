const {UserService} = require("../../services/userservice");
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

class AuthenticationController {

    userService;
    router

    register() {
        this.router['post']('/authenticate', (req, res) => {
            this.authenticate(req, res);
        });
        this.router['get']('/account', (req, res) => {
            this.fetchCurrentUser(req, res);
        });
    }

    constructor(router) {
        this.router = router;
        this.userService = new UserService();
    }

    fetchCurrentUser(request, response){
        const options = {
            userId: request.user.id
        }
       this.userService.findById(options.userId).then((user) => {
           if (user){
               response.json(user);
           }
       })
    }

    authenticate(request, response) {
        const password = request.body.password;
        const pw_hash = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');
        this.userService.findByEmail(request.body.email)
            .then((user) => {
                    if (user) {
                        if (user.password === pw_hash) {
                            const payload = {...user};
                            delete payload.password;
                            const token = jwt.sign(payload, 'secret');
                            response.cookie('accessToken', token)
                           console.log(response.headers);
                            response.json({token: token, user: payload});
                        }
                    } else {
                        response.status(401).json('unauthorized');
                    }
                }, error => response.status(401).json('unauthorized')
            );
    }
}

module.exports = {AuthenticationController};


