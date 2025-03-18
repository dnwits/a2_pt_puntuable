document.addEventListener("DOMContentLoaded", async () => { //Esperar a que el contenido del DOM esté completamente cargado antes de ejecutar el código
    try {
        const response = await fetch("comments.json"); //hacer una solicitud para obtener el archivo JSON con los comentarios
        const comments = await response.json(); //guardarlo en un objeto

        const tablaBody = document.getElementById("comments-body"); //obtener el elemento del html

        if (!tablaBody) { //verificar si l'eleent existeix, mostrar error per consola si es que no...
            console.error("No se encontró el elemento con ID 'comments-body'");
            return;
        }

        comments.forEach(comment => { //per cada element de l'obj que vam crear, crear rows i anar omplint les cel·les
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${comment.id}</td>
                <td>${comment.name}</td>
                <td>${comment.email}</td>
                <td>${comment.body}</td>
            `;

            tablaBody.appendChild(row); //afegir files
        });

    } catch (error) { //si es produeix algun error al carregar les dades mostrar error per sonsola
        console.error("Error cargando los comentarios:", error);
    }
});
