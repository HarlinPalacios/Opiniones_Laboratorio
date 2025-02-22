import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opiniones System API",
            version: "1.0.0",
            description: "API para un sistema de opiniones",
            contact:{
                name: "Harlin Palacios",
                email: "hpalacios-2020586@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/opiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/categoria/cate.routes.js",
        "./src/publicacion/publi.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)



export { swaggerDocs, swaggerUi}