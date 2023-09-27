import { Auth } from "../model/Auth.js"
import { generateSecretKey } from "../helpers/helpers.js"
import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"

const createAuth = async (nameV, emailV, passwordV) => {

    /* CREACION DEL TOKEN DE AUTENTICACION */
    const secretKey = "MYKEY"
    const payload = {emailV }
    const token = jwt.sign(payload, secretKey)

    try{
        /* PETICION A LA BASE DE DATOS */
        let info = await Auth.create({
            "name" : nameV,
            "email": emailV,
            "password" : await bcrypt.hash(passwordV, 10),
        })
        /* SI TODO VA BIEN, REGRESO LA INFORMACION Y ADEMAS EL TOKEN */
        return {info, token}

    }catch(error){
        /* RETORNO EL ERROR PARA VALIDARLO DESDE EL CONTROLADOR */
        return error
    }

}

const loginAuth = async (email, password) =>{
    /* CREACION DEL TOKEN */
    const secretKey = "MYKEY"
    const payload = {email }

    const token = jwt.sign(payload, secretKey)
    try{
        /* VALIDO QUE EL CORREO EXISTA EN BASE DE DATOS */
        const user = await Auth.findOne({
            where:{
                email : email
            }
        })

        /* VALIDO QUE LA CONTRASEÑA SEA IGUAL A LA QUE ESTA HASHEADA */
       const passwordMatch = await bcrypt.compare(password, user?.password)
        
       /* SI TODO VA BIEN REGRESO EL USER CON EL TOKEN */
       if(passwordMatch){
        return {user, token, "success": true}
       }else{
        /* SINO RETORNO FALSE Y VALIDO DESDE EL CONTROLADOR */
        return false
       }


    }catch(error){
        console.log(error)
    }
}

export default {
    createAuth,
    loginAuth
}