import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';

//egistras usuarios
export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        const token = jwt.sign({ id: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email,
            token

        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

//Generar el login
export const login = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password); 

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture || null  // Asegúrate de que el campo profilePicture existe
            }
        });
    } catch (err) {
        console.error(err);  // Imprime el error para ayudarte a depurarlo
        return res.status(500).json({
            success: false,
            message: "Login failed, server error",
            error: err.message
        });
    }
};

//Agregar al admin por defectro
export const createAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminExists) {
            const hashedPassword = await hash("i$hyygsrfg5jhdGFd", 10); 

            const admin = new User({
                name: "Harlin",
                surname: "Palacios",
                username: "hpalacios",
                email: "palaciosW@gmail.com",
                password: hashedPassword,
                phone: "21326554",
                role: "ADMIN_ROLE",
                status: true
            });

           
            await admin.save();

            console.log("Usuario ADMIN_ROLE creado correctamente");
        } else {
            console.log("Ya existe un usuario con el rol ADMIN_ROLE");
        }
    } catch (error) {
        console.error("Error al inicializar el usuario ADMIN_ROLE:", error);
    }
};