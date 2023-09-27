import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Client = sequelize.define("Client", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
    },
    phone_number:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING,
    },

},{
    timestamps: true
})

