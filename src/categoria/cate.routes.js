import { Router } from "express"
import { createCate } from "./cate.controller.js"
import { createCateValidator } from "../middlewares/cate-validator.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

const router = Router()

router.post("/createCategoria", validateJWT, hasRoles("ADMIN_ROLE"), createCateValidator, createCate)

export default router