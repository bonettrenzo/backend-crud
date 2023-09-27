import { Client } from "../model/Client.js"
import { Auth } from "../model/Auth.js"

const getAllClients = async () =>{
    try {
        const info = await Client.findAll({
            include:[{
                model : Auth,
                attributes: ["id", "name", "email"]
            }]
        })
        
        return {info, "success" : true}

    } catch (error) {
        return {error, "success" : false};
    }
}

const getOneClient = async (param) => {
    try {
        const info = await Client.findOne({
            where:{
                id : param
            }
        })

        return {info, "success":true}
    } catch (error) {
        return {error, "success": false}
    }
}

const createClient = async (name, phone_number, email, authId, fecha) => {

    try{
        const info = await Client.create({
            "nombre" : name,
            "phone_number": phone_number,
            "email" : email,
            "auth_id": authId,
            "createdAt" : fecha
        })
    
        return {info, "success": true}

    }catch(error){
        return {error, "success": false}
    }

}

const updateClient = async (param, updateField) => {

    try {
        const info = await Client.update(updateField,{
            where:{
                id: param
            }
        })

        return {info, "success": true}
    } catch (error) {
        return {error, "success": false}
    }

}

const deleteClient = async (clientId) => {

    try {
        const info = await Client.destroy({
            where:{
                id : clientId
            }
        })

        return {info, success: true}
    } catch (error) {
        return {error, success: false}
    }

}   

export default {
    getAllClients,
    getOneClient,
    createClient,
    updateClient, 
    deleteClient

}