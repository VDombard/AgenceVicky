class Destination {
    iddestination = "";
    fkuser = "";
    fkagence = "";
    country = "";
    city = "";
    days = "";
    constructor(iddestination, fkuser, fkagence, country, city, days) {
        this.iddestination = iddestination;
        this.fkuser = fkuser;
        this.fkagence = fkagence;
        this.country = country;
        this.city = city;
        this.days = days;
    }
};

module.exports = Destination;