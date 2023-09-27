import jwt, { decode } from "jsonwebtoken";
import { generateSecretKey } from "../helpers/helpers.js";

export default async function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Acceso no autorizado" });

    try {
        const decoded = await jwt.verify(token, "MYKEY");
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido" });
    }
}
