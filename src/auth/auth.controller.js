import { hash, verify } from "argon2"
import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try {
        const data = req.body;
        let profilePicture = req.file ? req.file.filename : null;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture

        const user = await User.create(data);

        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

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

        const validPassword = await verify(user.password, password)

        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        // si la contraseña es valida se gen erara el token
        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login exitoso",
            userDetails: {
                username: user.username,
                role: user.role,
                token: token
            }
        });

    } catch (err) {
        console.error("Error en login:", err);
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};

export const admincreate = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExists) {
            console.log("El administrador ya existe");
            return;
        }

        // Crear el nuevo usuario admin
        const admin = new User({
            name: "Harlin",
            surname: "Palacios",
            username: "hpalacios",
            email: "palacios23@unires.com",
            password: "$iojhgfr54&",
            role: "ADMIN_ROLE",
            status: true
        });

        console.log("Usuario ADMIN creado correctamente");

    } catch (error) {
        console.error("Error al crear el usuario ADMIN:", error);
    }
};