class User {
    iduser = "";
    firstname = "";
    lastname = "";
    email = "";
    password = "";
    constructor(iduser, firstname, lastname, email, password) {
        this.iduser = iduser;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
};

module.exports = User;
