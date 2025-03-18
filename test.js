//llegir els diversos registres y mostrar los datos en la tabla
fetch("valid_comments.json")
    .then(response => response.json()) // Convertir a JSON
    .then(comments => {
        const tablaBody = document.getElementById("comments-body");

        // Mostrar solo los primeros 10 comentarios (ya filtrados antes)
        comments.slice(0, 10).forEach(comment => {
            const row = document.createElement("tr");

            // Crear celdas de la tabla
            const idCell = document.createElement("td");
            idCell.textContent = comment.id;
            row.appendChild(idCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = comment.name;
            row.appendChild(nameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = comment.email.split('@')[0]; // Recortar email antes del '@'
            row.appendChild(emailCell);

            const bodyCell = document.createElement("td");
            bodyCell.textContent = comment.body;
            row.appendChild(bodyCell);

            // Añadir la fila a la tabla
            tablaBody.appendChild(row);
        });
    })
    .catch(error => console.error("Error cargando los comentarios:", error));
