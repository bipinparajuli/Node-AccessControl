const sequelize = require("../database")

const {Sequelize, STRING, ENUM, INTEGER} = require("sequelize")

const User = sequelize.define("user",{
    id:{
        type:INTEGER,
        allowNull:false,
      autoIncrement:true,
      primaryKey:true  
    },
email:{
    type:STRING,
    allowNull:false
},
password:{
    type:STRING,
    allowNull:false
},
role:{
    type:ENUM("basic","supervisor","admin"),
    defaultValue:"basic",
},
accessToken:{
    type:STRING
}

});

module.exports=User