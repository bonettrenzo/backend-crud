import express  from "express";
import ClientController from "../controller/ClientController.js";
import AuthController from "../controller/AuthController.js";
import authenticateToken from "../middleware/authenticateToken.js";

/* CLIENTE */
const {
    createClient, 
    deleteClient, 
    getAllClients, 
    getOneClient, 
    updateClient
} = ClientController

const {
    createAuth,
    loginAuth, 
} = AuthController

const router = express.Router();
router.use(express.json())
/* AUTH */
router.route("/register").post(createAuth)
router.route("/login").post(loginAuth)
/* AUTH */

/* router.use(authenticateToken)
 */


/* CLIENTE */
router.route("/clients").get(getAllClients)
router.route("/client/:clientId").get(getOneClient)
router.route("/client").post(createClient)
router.route("/client/:clientId").put(updateClient)
router.route("/client/:clientId").delete(deleteClient)

/* CLIENTE */


export default router;