import { Schema, model } from "mongoose"

const cateSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Categoria", cateSchema)