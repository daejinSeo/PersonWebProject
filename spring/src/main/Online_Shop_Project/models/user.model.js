const db = require('../database/database');

const bcrypt = require('bcryptjs');

class User{
    constructor(email, password, fullname, address, detailAddress, postal){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            address: address,
            detailAddress: detailAddress,
            postal: postal
        };


    }

    async getUserWithSameEmail(){
        const returnValue = await db.getDb().collection('users').findOne({
            email: this.email
        });
        return returnValue
    }

    async existAlready(){
        const exisitingUser = await this.getUserWithSameEmail();
        if(exisitingUser){
            console.log("exisitingUser: true");
            return true;
        }
        return false;
    }

    hasMatchingPassword(hashedPassword){
        return bcrypt.compare(this.password, hashedPassword);
    }

    async signup(){
        const hashedPassword = await bcrypt.hash(this.password, 12);

        const userInfo = {
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        }
        const result = await db.getDb().collection('users').insertOne(userInfo);
        // console.log(result);
    }
}

module.exports = User;