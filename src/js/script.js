let indiceMatriculas = {};

// Carregar base de dados
fetch('dados.json')
.then(res => res.json())
.then(json => {
    json.forEach(item => {
        indiceMatriculas[item.matricula] = item;
    });
})
.catch(() => {
    mostrarMensagem("Erro ao carregar base de dados.", "erro");
});

function buscar() {

    const matricula = document
        .getElementById("matricula")
        .value
        .trim();

    if (!matricula) {
        mostrarMensagem("Digite uma matrícula antes de consultar.", "erro");
        return;
    }

    // EVENTO: consulta realizada
    if (typeof gtag !== "undefined") {
        gtag('event', 'consulta', {
            matricula: matricula
        });
    }

    const resultado = indiceMatriculas[matricula];

    if (!resultado) {

        // EVENTO: matrícula não encontrada
        if (typeof gtag !== "undefined") {
            gtag('event', 'consulta_nao_encontrada', {
                matricula: matricula
            });
        }

        mostrarMensagem(
            "Matrícula não encontrada no sistema. Por favor, verifique a digitação e entre em contato com o programador.",
            "erro"
        );
        return;
    }

    // EVENTO: matrícula encontrada
    if (typeof gtag !== "undefined") {
        gtag('event', 'consulta_encontrada', {
            matricula: matricula
        });
    }

    const linkMaps = `https://www.google.com/maps?q=${resultado.latitude},${resultado.longitude}`;

    document.getElementById("resultado").innerHTML = `
        <div class="card sucesso">
        <p><strong>Matrícula:</strong> ${resultado.matricula}</p>
        <p><strong>Latitude:</strong> ${resultado.latitude}</p>
        <p><strong>Longitude:</strong> ${resultado.longitude}</p>
        <a href="${linkMaps}" target="_blank">
            <button onclick="registrarCliqueMaps('${resultado.matricula}')">
                Abrir no Google Maps
            </button>
        </a>
        </div>
    `;
}

function registrarCliqueMaps(matricula){

    if (typeof gtag !== "undefined") {
        gtag('event', 'abrir_maps', {
            matricula: matricula
        });
    }

}

function mostrarMensagem(texto, tipo) {

    const resultadoDiv = document.getElementById("resultado");

    resultadoDiv.innerHTML = `
        <div class="card ${tipo}">
        <p>${texto}</p>
        </div>
    `;
}