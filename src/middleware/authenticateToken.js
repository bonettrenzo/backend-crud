
import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {

    const bearerHeader = req.header("Authorization");
    if(typeof bearerHeader !== "undefined"){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }else{
        res.status(403).json({
            error: "no tienes permisos para acceder",
            success: false
        })
    }

}
