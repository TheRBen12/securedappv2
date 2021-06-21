const express = require('express');
const router = express.Router();
const jwtVerification = require('./authentication/tokenVerification');

const {AuthenticationController} = require('./authentication/authenticationController');
const {UserController} = require('./forwardController/user/usercontroller');
const {DesignerController} = require('./forwardController/designer/designercontroller')
const {RegistrationController} = require('./registration/registrationController')

const registrationController = new RegistrationController(router);
registrationController.register();

const authenticationController = new AuthenticationController(router);
authenticationController.register()

const userController = new UserController(router);

const designerController = new DesignerController(router);


module.exports = router;





