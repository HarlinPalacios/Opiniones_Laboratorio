import { Router } from "express"
import { getUsers, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { updatePasswordValidator, updateUserValidator, updateProfilePictureValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of users to return
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of users to skip
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total:
 *                   type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Error retrieving users
 */
router.get("/", getUsers)

/**
 * @swagger
 * /users/updatePassword/{uid}:
 *   patch:
 *     summary: Update user password
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The old password
 *               newPassword:
 *                 type: string
 *                 description: The new password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error updating password
 */
router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /users/updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser)

/**
 * @swagger
 * /users/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture file
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: No file in the request
 *       500:
 *         description: Error updating profile picture
 */
router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
