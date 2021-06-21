const userModel = require('../../models')['User'];
const crypto = require('crypto');

class RegistrationController{
    router
    constructor(router) {
    this.router = router;
    }
    register(){
        this.router['post']('/register', (req, res) => {
            this.createUser(req, res);
        });
    }
    createUser(request, response){
        const userData = request.body;
        if (userData){
            const pw_hash = crypto
                .createHash('sha256')
                .update(userData.password)
                .digest('hex');
            userModel.create({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email:userData.email,
                password: pw_hash
            }).then((savedUser) => {
                if (savedUser){
                    delete savedUser.password;
                    response.json(savedUser);
                    response.status(201).json(savedUser);
                }else{
                    response.status(500);
                }

            }, error => response.status(500).json(error));
        }
    }
}

module.exports = {RegistrationController}
