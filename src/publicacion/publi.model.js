import mongoose, { Schema, model} from "mongoose";

const publiSchema = Schema({
    titu:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        reqired: true
    },
    texPrinci:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        reqired: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

publiSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", publiSchema)