document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageSlug = urlParams.get('page');

    const contentContainer = document.getElementById('project-content-goes-here');

    if (!pageSlug) {
        contentContainer.innerHTML = '<h1>Error</h1><p>Proyecto no especificado.</p>';
        return;
    }

    const contentFilePath = `../content/${pageSlug}.html`;

    // 3. Cargar el "snippet" de HTML
    fetch(contentFilePath)
        .then(response => {
            if (!response.ok) {
                // Si el archivo no existe (ej. 404)
                throw new Error('Proyecto no encontrado.');
            }
            return response.text(); // Obtenemos el contenido como texto (HTML)
        })
        .then(htmlSnippet => {
            // 4. ¡Inyectar el HTML en el contenedor!
            contentContainer.innerHTML = htmlSnippet;
            
            // (Opcional) Intenta cambiar el título de la pestaña
            const titleElement = contentContainer.querySelector('h1');
            if (titleElement) {
                document.title = titleElement.textContent;
            }
        })
        .catch(error => {
            console.error(error);
            contentContainer.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
        });
});