import Categoria from "./cate.model.js"

//creacion de una categoria
export const createCate = async (req, res) =>{
    try{
        const { name, descripcion } = req.body;

        const existe = await Categoria.findOne ({name, descripcion})
        if(!existe) {
            return res.status(400).json({
                message: "la categoria ya existe"
            })
        }

        await Categoria.save()
        return res.status(200).json({
            message: "La categoria se creo exitosamente",
            Categoria
        })

    }catch(err) {
        return res.status(500).json({
            messaje: "Error al crear la categoria",
            error: err.message
        })
    }
}

//Tres categorias por defecto
export const createCategories = async () => {
    try {
        const categories = [
            { name: 'Cosas exoticas', descripcion: 'Productos y servicios relacionados con la tecnología' },
            { name: 'Moda', descripcion: 'Últimas tendencias en ropa y accesorios' },
            { name: 'Familia', descripcion: 'Equipos, accesorios y noticias sobre deportes' }
        ];

        for (const category of categories) {
            const existingCategory = await Categoria.findOne({ name: category.name });
            if (existingCategory) {
                console.log(`La categoría ${category.name} ya existe`);
            } else {
                const newCategory = new Categoria(category);
                await newCategory.save();
                console.log(`Categoría ${category.name} creada correctamente`);
            }
        }
    } catch (error) {
        console.error("Error al crear las categorías:", error);
    }
};