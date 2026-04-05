// Galería dinámica
function mostrarGaleria() {
    const galeria = document.getElementById("galeria");
    galeria.innerHTML = `
    <div class="cards">
        <div class="card">Proyecto 1</div>
        <div class="card">Proyecto 2</div>
        <div class="card">Proyecto 3</div>
    </div>
    `;
};