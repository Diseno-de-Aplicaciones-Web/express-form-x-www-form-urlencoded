import express from "express"
import cors from "cors"
import multer from "multer"

const app = express()
app.use(cors())

/**
 * Permite que node actue como un servidor básico de páginas web
 * dando acceso a los ficheros guartados en una carpeta cuandos se
 * accede mediante GET a determinada ruta. En este caso la ruta
 *  / conduce al contenido de la carpeta ./static
 */
app.use("/", express.static("./static"))

/**
 * Ejemplos de middleware para recuperar (parsear) datos enviados en
 * diferentes formatos:
 *   - application/x-www-form-urlencoded: formato empleado por omisión
 *      por la etiqueta HTML form. No permite incluir ficheros en la
 *      información enviada por el formulario.
 *   - multipart/form-data: Formato empleado por la etiqueta form cuando
 *      así lo especificamos con su atributo enctype="multipart/form-data".
 *      Permite el envio de ficheros desde el formulario.
 *   - JSON: Formato empleado para el envío de datos de JavaScript:
 *      complejos como arrays y objetos o simples como numeros o strings.
 */

// Mdlw -> es "middleware" abreviado para estos ejemplos.
const urlEncodedMdlw = express.urlencoded() // application/x-www-form-urlencoded
const multipartMdlw = multer({dest: "./uploads/"}) // mime-multipart
const jsonMdlwr = express.json()

app.post("/usuario/urlencoded/", urlEncodedMdlw, controlador)
app.post("/usuario/multipart/", multipartMdlw.none(), controlador) // *
app.post("/usuario/json/", jsonMdlwr, controlador)
/**
 * * El .none() indica a multer que no deseamos almacenar los ficheros que puedan
 * venir incluidos en la información del formulario.
 */ 

app.listen(8000, ()=>console.log("Express trabajando...."))

function controlador(peticion, respuesta) {
    console.log("\nHa llegado un formulario")
    console.log(peticion.body)
    /**
     * Como respuesta al envío del formulario indicamos al navegador
     * que regrese a la página de inicio /
     */
    respuesta.redirect("/")
}