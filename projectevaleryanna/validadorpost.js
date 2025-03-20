document.addEventListener("DOMContentLoaded", async () => { //Esperar a que el contenido del DOM esté completamente cargado antes de ejecutar el código
    try {
        const response = await fetch("posts.json"); //hacer una solicitud para obtener el archivo JSON con los comentarios
        const posts = await response.json(); //guardarlo en un objeto

        const tablaBody = document.getElementById("posts-body"); //obtener el elemento del html

        if (!tablaBody) { //verificar si l'eleent existeix, mostrar error per consola si es que no...
            console.error("No se encontró el elemento con ID 'posts-body'");
            return;
        }

        posts.forEach(post => { //per cada element de l'obj que vam crear, crear rows i anar omplint les cel·les
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.wordCount || "0"}</td> <!-- Añadimos el contador de palabras -->
            `;

            tablaBody.appendChild(row); //afegir files
        });

    } catch (error) { //si es produeix algun error al carregar les dades mostrar error per sonsola
        console.error("Error cargando los comentarios:", error);
    }
});