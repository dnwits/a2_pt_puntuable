import Ajv from "ajv" //importar avj para la validación
import type { Comment } from "./comment" //import de la clase Comment
import commentSchema from "./comment.json" //import els schema autogenerado

const response = await fetch('https://jsonplaceholder.typicode.com/comments'); //api con los datos
const comments: Comment[] = await response.json(); //guardar los datos en un array compuesto por obj de la clase Comment y esperar a que el json responda

const ajv = new Ajv();
const validateComment = ajv.compile(commentSchema); //validar la informació abans de tractar-la
comments.forEach(comment =>{ //ver veure per consola si la validació funciona o no (proves)
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

//slice per guardar a una constant només els 10 primers 
const primerosCinco = comentarisValids.slice(0, 10)

//retallar només els emails abans de @
const trimEmail = (email: string): string => {
    //dividir el email en dos parts: abans i després del caràcter @
    const [username] = email.split('@');
    //aplicar trim para eliminar els espais en blanc
    return username.trim();
};

// Aplicar la función trimEmail a los primeros 5 comentarios válidos
primerosCinco.forEach(comment => {
    const trimmedEmail = trimEmail(comment.email);
    console.log(`Email recortado: ${trimmedEmail}`);
});

//---------------------interacció amb html----------------------------
const tablaBody = document.getElementById("comments-body");

if (tablaBody) {
    primerosCinco.forEach(comment => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = comment.id.toString();
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = comment.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = trimEmail(comment.email);
        row.appendChild(emailCell);

        const bodyCell = document.createElement("td");
        bodyCell.textContent = comment.body;
        row.appendChild(bodyCell);

        tablaBody.appendChild(row);
    }); 
} else {
    console.error("No se encontró el elemento con ID 'comments-body'");
}