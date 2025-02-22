import Publicacion from "./publi.model.js"
import Categoria from "../categoria/cate.model.js"

export const createPublic = async (req, res) => {
    try{
        const { titu, categoria, texPrinci } = req.body;
        const author = req.user.id;

        const existingCatego = await Categoria.findById(categoria);
        if (!existingCatego) {
            return res.status(400).json({ 
                success: false, 
                message: "La categoría no existe" });
        } 

        const newPost = new Post({ titu, categoria, texPrinci, author });
        await newPost.save();

        res.status(200).json({ 
            success: true, 
            message: "Publicación creada exitosamente", 
            post: newPost });

    }catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error al crear la publicación", 
            error });
    }
}

//Actualizar Publicacion
export const updaterPubli = async (req, res) => {
    try{
        const { id } = req.params;
        const { titu, categoria, texPrinci } = req.body;
        const userId = req.user.id;

        const publi = await Publicacion.findById(id)

        if(!publi){
            return res.status(404).json({
                success: false,
                message: "La publicacion no fue encontrada"
            })
        }

        publi.titu = titu || publi.titu;
        publi.categoria = categoria || publi.categoria;
        publi.texPrinci = texPrinci || publi.texPrinci;
        publi.updatedAt = Date.now();

        await post.save();
        res.json({ success: true, message: "Publicación actualizada exitosamente", post });

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error });
    }
}

//Eliminar publicacion del dueño
export const deletePubli = async (req, res) => {
    try{
        const { id } = req.params;
        const userId = req.user.id;

        const publi = await Publicacion.findById(id);

        if(!publi){
            return res.status(404).json({
                success: false,
                message: "La publicacion no fue encontrada"
            })
        }

        if(publi.author.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "No tiene permiso para eliminar la publicacion"
            })
        }

        await publi.deleteOne();
        return res.status(200).json({
            success: true,
            message: "La publicacion a sido eliminada"
        })

    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error });
    }
}