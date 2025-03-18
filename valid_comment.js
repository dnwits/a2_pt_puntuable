"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = require("ajv"); //importar avj para la validación
var comment_json_1 = require("comment.json"); //import els schema autogenerado
var response = await fetch('https://jsonplaceholder.typicode.com/comments'); //api con los datos
var comments = await response.json(); //guardar los datos en un array compuesto por obj de la clase Comment y esperar a que el json responda
var ajv = new ajv_1.default();
var validateComment = ajv.compile(comment_json_1.default); //validar la informació abans de tractar-la
comments.forEach(function (comment) {
    var valid = validateComment(comment); //true or false
    if (!valid) {
        console.log("Errors ", validateComment.errors);
    }
    else {
        console.log("Comentari de: ", comment.name);
    }
});
//-------------------FUNCIONS-------------------------
//filtrar solo los registros validos
var comentarisValids = comments.filter(function (name) { return validateComment(name); });
//slice per guardar a una constant només els 10 primers 
var primerosCinco = comentarisValids.slice(0, 10);
//retallar només els emails abans de @
var trimEmail = function (email) {
    //dividir el email en dos parts: abans i després del caràcter @
    var username = email.split('@')[0];
    //aplicar trim para eliminar els espais en blanc
    return username.trim();
};
// Aplicar la función trimEmail a los primeros 5 comentarios válidos
primerosCinco.forEach(function (comment) {
    var trimmedEmail = trimEmail(comment.email);
    console.log("Email recortado: ".concat(trimmedEmail));
});
//interacció amb html (js)
var renderList = function (comments) {
    var list = document.getElementById("commentsList");
    comments.forEach(function (comment) {
        var trimmedEmail = trimEmail(comment.email);
        var listItem = document.createElement("li");
        listItem.innerHTML = "\n            <strong>Nombre:</strong> ".concat(comment.name, "<br>\n            <strong>Email:</strong> ").concat(trimmedEmail, "<br>\n            <strong>Comentario:</strong> ").concat(comment.body, "\n        ");
        list.appendChild(listItem);
    });
};
// Llamar a la función para renderizar la lista
renderList(primerosCinco);
