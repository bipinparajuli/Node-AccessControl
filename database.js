const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("accesscontrol","root","angularjs",{
    host:"localhost",
    dialect:"mysql"
})


module.exports = sequelize;