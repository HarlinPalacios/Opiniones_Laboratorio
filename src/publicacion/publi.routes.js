import { Router } from "express"
import { createPublic, updaterPubli, deletePubli } from "../publicacion/publi.controller.js"
import { validarJWT } from "../middlewares/validate-jwt.js"

const router = Router()

router.post("/crearP", validarJWT, createPublic)

router.put("/actualizarP/:id", validarJWT, updaterPubli)

router.delete("/eliminarP/:id", validarJWT, deletePubli)

export default router;