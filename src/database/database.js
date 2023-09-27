import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("crudmaster", "postgres", "renzodb14",{
    host:"localhost",
    dialect: "postgres"
})