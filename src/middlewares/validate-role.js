const validateRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para acceder a este recurso"
            });
        }
        next(); // Si el rol es válido, sigue con la siguiente función
    };
};

export default validateRole;