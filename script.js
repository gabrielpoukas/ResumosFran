// *************************************************************
// FUNÇÃO PARA CHAMAR A API DE CAPAS (OPEN LIBRARY)
// *************************************************************
function getCoverUrl(isbn, size = 'M') {
    if (!isbn) {
        // Imagem de placeholder elegante em caso de falta de ISBN
        return 'https://via.placeholder.com/80x120?text=Sem+Capa';
    }
    // Constrói a URL da Open Library
    return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}
// *************************************************************

// SIMULAÇÃO DE DADOS (LIVROS DA SARAH J. MAAS - TRADUZIDOS PARA O PORTUGUÊS)
const livros = [
    {
        id: 1,
        // Tradução: A Court of Thorns and Roses
        titulo: "Corte de Espinhos e Rosas",
        autor: "Sarah J. Maas",
        genero: "Ficção",
        // ISBN (ACOTAR #1) - Mantemos o ISBN americano para a API
        isbn: "9781619634442", 
        data: "15/10/2025",
        nota: 5,
        resumo_curto: "O primeiro livro da aclamada série ACOTAR. Uma caçadora é arrastada para a terra encantada das Fadas. Romance épico!",
        link: "detalhes.html?id=1",
        tag: "favoritos",
        citacao: "Só porque você não pode ver algo, não significa que não está lá."
    },
    {
        id: 2,
        // Tradução: House of Earth and Blood (Crescent City)
        titulo: "Casa de Terra e Sangue",
        autor: "Sarah J. Maas",
        genero: "Ficção",
        // ISBN (Crescent City #1)
        isbn: "9781635574043", 
        data: "28/09/2025",
        nota: 4,
        resumo_curto: "Fantasia urbana adulta, repleta de anjos caídos, mistério e uma semifeérica em busca de vingança. Um novo universo fascinante.",
        link: "detalhes.html?id=2",
        tag: "ficcao",
        citacao: "Meu nome é Bryce Quinlan. E eu não me curvarei a ninguém."
    },
    {
        id: 3,
        // Tradução: Throne of Glass
        titulo: "Trono de Vidro",
        autor: "Sarah J. Maas",
        genero: "Ficção",
        // ISBN (Throne of Glass #1)
        isbn: "9781619630635", 
        data: "10/09/2025",
        nota: 5,
        resumo_curto: "A assassina mais temida do reino deve competir em um torneio para conquistar a liberdade. Intriga política e muita ação!",
        link: "detalhes.html?id=3",
        tag: "favoritos",
        citacao: "Você não pode se curvar se não se partir primeiro."
    },
    {
        id: 4,
        // Tradução: A Court of Mist and Fury
        titulo: "Corte de Névoa e Fúria",
        autor: "Sarah J. Maas",
        genero: "Ficção",
        // ISBN (ACOTAR #2)
        isbn: "9781619635845", 
        data: "01/08/2025",
        nota: 5,
        resumo_curto: "A épica continuação de ACOTAR. Feyre descobre a Corte Noturna e precisa lidar com promessas quebradas e um amor inesperado.",
        link: "detalhes.html?id=4",
        tag: "favoritos",
        citacao: "Somos todos feitos de estrelas, e elas estão todas em desordem."
    }
];

// 1. Função para criar as estrelas de classificação
function criarEstrelas(nota) {
    let estrelas = '';
    for (let i = 0; i < 5; i++) {
        estrelas += (i < nota) ? '★' : '☆';
    }
    return `<span class="rating">${estrelas}</span>`;
}

// 2. Função para renderizar o Card de Destaque
function renderizarDestaque() {
    const destaqueCard = document.getElementById('destaque-card');
    if (!destaqueCard || livros.length === 0) return;

    // Pega o livro mais recente (o primeiro no array) como destaque
    const livro = livros[0]; 
    const capaURL = getCoverUrl(livro.isbn, 'L'); // Usa tamanho Grande

    // Atribui o link ao card
    destaqueCard.href = livro.link;

    destaqueCard.innerHTML = `
        <img src="${capaURL}" 
             alt="Capa do Livro ${livro.titulo}" 
             class="capa-destaque"
             onerror="this.onerror=null; this.src='https://via.placeholder.com/180x270?text=Capa+Indisponível';"
        >
        <div class="destaque-info">
            <h3>${livro.titulo}</h3>
            <p class="autor">Por ${livro.autor}</p>
            <p class="resumo-cita">"${livro.citacao}"</p>
            <a href="${livro.link}" class="btn-resenha">Ler Resenha Completa</a>
        </div>
    `;
}


// 3. Função para renderizar os cards na página inicial
function renderizarResumos(filter = 'all') {
    const mainContainer = document.getElementById('lista-resumos');
    if (!mainContainer) return;

    mainContainer.innerHTML = ''; // Limpa o container

    // Aplica o filtro
    const livrosFiltrados = livros.filter(livro => {
        if (filter === 'all') return true;
        if (filter === 'favoritos') return livro.nota === 5;
        
        // Filtra por gênero. Assumimos todos os livros SJM como "Ficção"
        return livro.genero.toLowerCase() === filter;
    });

    if (livrosFiltrados.length === 0) {
        mainContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">Nenhuma resenha encontrada nesta categoria.</p>';
        return;
    }

    livrosFiltrados.forEach(livro => {
        // CHAMA A FUNÇÃO API AQUI
        const capaURL = getCoverUrl(livro.isbn, 'M'); // Usa tamanho Médio para os cards

        const card = document.createElement('a');
        card.href = livro.link; 
        card.classList.add('resumo-card');
        
        card.innerHTML = `
            <span class="nota-selo">${livro.nota}★</span>
            <div class="card-content">
                <img src="${capaURL}" 
                     alt="Capa de ${livro.titulo}" 
                     class="capa-livro"
                     onerror="this.onerror=null; this.src='https://via.placeholder.com/80x120?text=Capa+Indisponível';"
                >
                <div class="card-info">
                    <h4>${livro.titulo}</h4>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p>${livro.resumo_curto}</p>
                    <p>${criarEstrelas(livro.nota)} - ${livro.data}</p>
                </div>
            </div>
        `;
        mainContainer.appendChild(card);
    });
}

// 4. Lógica do Menu Hambúrguer e Inicialização (ao carregar o DOM)
document.addEventListener('DOMContentLoaded', () => {
    // A. Menu Hambúrguer
    const menuToggle = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');

    if (menuToggle && menuList) {
        menuToggle.addEventListener('click', () => {
            menuList.classList.toggle('open');
            const icon = menuToggle.querySelector('.hamburguer-icon');
            if (icon) {
                icon.innerHTML = menuList.classList.contains('open') ? '&#10005;' : '&#9776;';
            }
        });
    }

    // B. Lógica de Filtragem 
    const filterNav = document.getElementById('filter-nav');
    if (filterNav) {
        filterNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                filterNav.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');
                renderizarResumos(filterValue);
            }
        });
    }

    // C. Inicialização: Renderiza o destaque e a lista de resumos ao carregar
    renderizarDestaque();
    renderizarResumos(); 
});