import { body,} from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"

export const createCateValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").notEmpty().withMessage("La descripcion es requerida"),

    validarCampos,
    handleErrors
]