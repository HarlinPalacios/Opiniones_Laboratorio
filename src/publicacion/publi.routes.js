import { Router } from "express"
import { createPublic, updaterPubli, deletePubli } from "../publicacion/publi.controller.js"
import { validarJWT } from "../middlewares/validate-jwt.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Publicaciones
 *   description: API para gestionar publicaciones
 */

/**
 * @swagger
 * /crearP:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titu
 *               - categoria
 *               - texPrinci
 *             properties:
 *               titu:
 *                 type: string
 *                 description: Título de la publicación
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría
 *               texPrinci:
 *                 type: string
 *                 description: Texto principal de la publicación
 *     responses:
 *       200:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: La categoría no existe
 *       500:
 *         description: Error al crear la publicación
 */
router.post("/crearP", validarJWT, createPublic)

/**
 * @swagger
 * /actualizarP/{id}:
 *   put:
 *     summary: Actualizar una publicación existente
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titu:
 *                 type: string
 *                 description: Título de la publicación
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría
 *               texPrinci:
 *                 type: string
 *                 description: Texto principal de la publicación
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente
 *       404:
 *         description: La publicación no fue encontrada
 *       500:
 *         description: Error al actualizar la publicación
 */
router.put("/actualizarP/:id", validarJWT, updaterPubli)

/**
 * @swagger
 * /eliminarP/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publicaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: La publicación ha sido eliminada
 *       404:
 *         description: La publicación no fue encontrada
 *       403:
 *         description: No tiene permiso para eliminar la publicación
 *       500:
 *         description: Error al eliminar la publicación
 */
router.delete("/eliminarP/:id", validarJWT, deletePubli)

export default router;