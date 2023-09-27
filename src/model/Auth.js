import  {sequelize}  from "../database/database.js";
import { DataTypes } from "sequelize";
import { Client } from "./Client.js";

export const Auth = sequelize.define("Auth", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type : DataTypes.STRING
    },
    email:{
        type : DataTypes.STRING,
        unique: true
    },
    password : {
        type : DataTypes.STRING
    } 
})

Auth.hasMany(Client, {
    foreignKey: "auth_id",
    sourceKey: "id"
})

Client.belongsTo(Auth,{
    foreignKey: "auth_id",
    targetKey: "id"
})