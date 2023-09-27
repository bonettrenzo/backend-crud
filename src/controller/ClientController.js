
import clientService from "../services/clientService.js"
import { validateField, validateEmail, validateParam} from "../helpers/helpers.js";

const getAllClients = async (req, res) =>{

try {
    const info = await clientService.getAllClients();
    if(!info.success){
       return res.json({
            "error": "error inesperado",
            "success": false
        })
    }

    if(info.success) return res.json(info)
    
} catch (error) {
  return  res.json({
        "error": "error inesperado",
        "success": false
    })
}


}

const getOneClient = async (req, res) => {

    try{
        const {clientId} = req.params

        if(!validateParam(clientId)){
            return res.json({
                "error": "el parametro no fue recibido correctamente",
                "success": false
            })
        }
        
        const info = await clientService.getOneClient(clientId)

        if(!info.success){
            return res.json({
                "error": info?.error?.parent?.detail,
                "success": false
            })
        }

        if(info.success) return res.json(info)

    }catch(error){
        return res.json({
            "error": "error inesperado",
            "success": false
        })
    }
}

const createClient = async (req, res) => {
    try {
        const {nombre, phone_number, email, auth_id, fecha} =  req.body

        const nameV = validateField(nombre)
        const phoneV = validateField(phone_number)
        const emailV = validateEmail(email)
    
        if(!nameV || !phoneV || !emailV){
            return res.json({
                "error" : "faltan campos o ingresados incorrectamente",
                "success" : false
            })
        }

        const info = await clientService.createClient(nameV, phoneV, emailV, auth_id, fecha)

        if(!info.success){
            return res.json({
                "error" : info?.error?.parent?.detail,
                "success" : false
            })
        }

        if(info.success) return res.json(info)

    } catch (error) {
        return res.json({
            "error" : info?.error?.parent?.detail,
            "success" : false
        })
    }
}

const updateClient = async (req, res) => {

    try {
        const nombre = validateField(req.body.nombre)
        const phone_number = validateField(req.body.phone_number)
        const email = validateEmail(req.body.email)
        const clientId = validateParam(req.params.clientId)
    
        if(!nombre, !phone_number, !email, !clientId){
            return res.json({
                "error" : "error en el ingreso de los datos",
                "success" : false
            })
        }
        const updateField = {"nombre":nombre, "phone_number": phone_number, "email":email}
    
        const info = await clientService.updateClient(clientId, updateField)
        if(info.success) return res.json(info)
        
    } catch (error) {
        return res.json({
            "error" : info?.error?.parent?.detail,
            "success" : false
        })
    }

}

const deleteClient = async (req, res) => {
    try{
        const {clientId} = req.params

        if(!validateParam(clientId)){
            return res.json({
                "error": "el parametro no fue recibido correctamente",
                "success": false
            })
        }
    
        const info = await clientService.deleteClient(clientId)

        if(info.success) return res.json(info)

    }catch(error){
        return res.json({
            "error" : info?.error?.parent?.detail,
            "success" : false
        })
    }

}



export default {
    getAllClients,
    getOneClient,
    createClient,
    updateClient, 
    deleteClient
}