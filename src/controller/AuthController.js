import authService from "../services/AuthService.js"
import { Auth } from "../model/Auth.js"
import { validateField, validateEmail } from "../helpers/helpers.js"


export const createAuth = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        /* VALIDACION DE CAMPOS */
        let nameV = validateField(name);
        let emailV = validateEmail(email);
        let passwordV = validateField(password);
        
        /* COMPROBAR QUE TODO ESTE CORRECTO */
        if(!nameV || !emailV || !passwordV){
            return res.json({
                "success" : false,
                "error" : "Información incompleta o incorrecta"
            })
        }   
        
        /* LLAMO AL SERVICE PARA QUE HAGA LA PETICION */
        let info = await authService.createAuth(nameV, emailV, passwordV)

        /* VALIDO QUE EXISTA UN ERROR EN LA PETICION  */
        if(info?.parent?.name == "error") {
            return res.json({
                "success" : false,
                "error" : "Información incompleta o incorrecta"
            })
        }
        /* SI NO EXISTE NINGUN ERROR ENTONCES REGRESO EN JSON LA INFORMACION */
        return res.json({info, "success":true})

    }catch(error){
          return  res.json({
                "success" : false,
                "error" : "Error inesperado"
            })
    }
};




export const loginAuth = async (req, res) =>{
    const { email, password } = req.body;
    
    console.log(req.body)
    try{
        /* VALIDACION DE LOS CAMPOS */
        let emailV = validateEmail(email);
        let passwordV = validateField(password);
        
        /* VERFICAR QUE TODO ESTE CORRECTO SINO QUE REGRESE UN ERROR */
        if(!emailV || !passwordV){
            return res.json({
                "success" : false,
                "error" : "Información incompleta"
            })

        }   
        /* LLAMO AL SERVICIE PARA HACER LA PETICION */
        let info = await authService.loginAuth(emailV, passwordV)

        /* VALIDO LOS ERRORES */
        if(info){
            /* SI ESTA TODO BIEN, REGRESO LA INFORMACION DEL USER */
           return res.json(info)
        }else{
            /* SINO REGRES UN ERROR */
            return res.json({
                "success" : false,
                "error" : "error en las credenciales"
            })
        }

    }catch(error){
        return res.json({
            "success" : false,
            "error" : "Error inesperado!"
        })
    }

}



export default {
    createAuth,
    loginAuth
}