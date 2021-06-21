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
    }

    constructor(router) {
        this.router = router;
        this.userService = new UserService();
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


