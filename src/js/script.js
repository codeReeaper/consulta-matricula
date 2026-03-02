    let indiceMatriculas = {};

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

    const resultado = indiceMatriculas[matricula];

    if (!resultado) {
        mostrarMensagem("Matrícula não encontrada no sistema. Por favor, verifique a digitação e entre em contato com o programador.", "erro");
        return;
    }

    const linkMaps = `https://www.google.com/maps?q=${resultado.latitude},${resultado.longitude}`;

    document.getElementById("resultado").innerHTML = `
        <div class="card sucesso">
        <p><strong>Matrícula:</strong> ${resultado.matricula}</p>
        <p><strong>Latitude:</strong> ${resultado.latitude}</p>
        <p><strong>Longitude:</strong> ${resultado.longitude}</p>
        <a href="${linkMaps}" target="_blank">
            <button>Abrir no Google Maps</button>
        </a>
        </div>
    `;
    }

    function mostrarMensagem(texto, tipo) {
    const resultadoDiv = document.getElementById("resultado");

    resultadoDiv.innerHTML = `
        <div class="card ${tipo}">
        <p>${texto}</p>
        </div>
    `;
    }