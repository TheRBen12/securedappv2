const db = require('../models/index');
const userModel = db['User'];

class UserService {

    constructor() {

        this.usermdodel = userModel;
    }

    async create(reqBody) {
        return this.usermdodel.create({
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            password: reqBody.password,
        });
    }

    async findById(id){
        return this.usermdodel.findByPk(id);
    }

    async findByEmail(email) {
        return this.usermdodel.findOne(
            {
                where:
                    {email: email}
            });
    }

}

module.exports = {UserService};







