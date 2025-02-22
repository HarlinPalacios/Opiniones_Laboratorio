import { Router } from "express"
import { createCate } from "./cate.controller.js"
import { createCateValidator } from "../middlewares/cate-validator.js"
import { validateJWT } from "../middlewares/validate-jwt.js"
import { hasRoles } from "../middlewares/validate-roles.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: API para gestionar categorías
 */

/**
 * @swagger
 * /createCategoria:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - descripcion
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la categoría
 *     responses:
 *       200:
 *         description: La categoría se creó exitosamente
 *       400:
 *         description: La categoría ya existe
 *       500:
 *         description: Error al crear la categoría
 */
router.post("/createCategoria", validateJWT, hasRoles("ADMIN_ROLE"), createCateValidator, createCate)

export default router