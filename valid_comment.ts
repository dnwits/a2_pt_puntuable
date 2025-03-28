import Ajv from "ajv" //importar avj para la validación
import type { Comment } from "./comment" //import de la clase Comment
import commentSchema from "./comment.json" //import els schema autogenerado
import { writeFileSync } from "fs"; // Para escribir archivos (json con registros validos), també es pot fer amb Bun.write ...

const response = await fetch('https://jsonplaceholder.typicode.com/comments'); //api con los datos
const comments: Comment[] = await response.json(); //guardar los datos en un array compuesto por obj de la clase Comment y esperar a que el json responda

const ajv = new Ajv();
const validateComment = ajv.compile(commentSchema); //validar la informació abans de tractar-la
comments.forEach(comment =>{ //ver veure per consola si la validació funciona o no (PROVES)
    const valid = validateComment(comment) //true or false
    if(!valid){
        console.log("Errors ", validateComment.errors);
    } else {
        console.log("Comentari de: ", comment.name);
    }
});

//-------------------FUNCIONS-------------------------

//filtrar solo los registros validos
const comentarisValids = comments.filter(name => validateComment(name))

//slice per guardar a una constant les dades validades - SI ES VOL VEURE MENYS REGISTRES A LA TAULA final, MODIFICAR el num (500 per qualsevol altre)
const primerosCincCents = comentarisValids.slice(0, 500)

//retallar només els emails abans de @
const trimEmail = (email: string): string => {
    //dividir (split) el email en dos parts: abans i després del caràcter @
    const [username] = email.split('@');
    //aplicar trim para eliminar els espais en blanc
    return username.trim();
};

// Aplicar la función trimEmail a los 500 comentarios válidos
primerosCincCents.forEach(comment => {
    const trimmedEmail = trimEmail(comment.email);
    console.log(`Email recortado: ${trimmedEmail}`); //test
});

//---------------------interacció amb html----------------------------
const trimmedData = primerosCincCents.map(comment => ({ // enllaçar els atributs
    id: comment.id,
    name: comment.name,
    email: comment.email.split('@')[0], // Tomamos solo la parte antes de @
    body: comment.body
}));

// Guardar en un archivo JSON los datos (validados y tratados) que utilizaremos en la tabla
writeFileSync("comments.json", JSON.stringify(trimmedData, null, 2)); //passar la informació validada i ficar-la a un json per després

console.log("✅ Datos validados guardados en comments.json");
