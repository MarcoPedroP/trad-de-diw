// Fazendo a requisição GET para obter todos os produtos da Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const productsSection = document.querySelector('.products');

    // Função para criar elementos HTML dos produtos
    const createProductElement = (product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');

      const imageElement = document.createElement('img');
      imageElement.src = product.image;
      imageElement.alt = product.title;
      productElement.appendChild(imageElement);

      const titleElement = document.createElement('h3');
      titleElement.textContent = product.title;
      productElement.appendChild(titleElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = product.description;
      descriptionElement.classList.add('hidden');
      productElement.appendChild(descriptionElement);

      // Adiciona um ouvinte de eventos de clique ao produto
      productElement.addEventListener('click', () => {
        // Salva o ID do produto no localStorage
        localStorage.setItem('selectedProductId', product.id);

        // Redireciona para a página de detalhes do produto
        window.location.href = 'detalhes-produto.html';
      });

      return productElement;
    };

    // Renderiza todos os produtos inicialmente
    data.forEach(product => {
      const productElement = createProductElement(product);
      productsSection.appendChild(productElement);
    });

    // Armazena uma referência à entrada de pesquisa
    const searchInput = document.querySelector('.search input[type="text"]');

    // Adiciona um ouvinte de eventos de entrada à entrada de pesquisa
    searchInput.addEventListener('input', () => {
      // Obtém o valor atual da entrada de pesquisa
      const searchTerm = searchInput.value.trim().toLowerCase();

      // Remove todos os produtos existentes
      productsSection.innerHTML = '';

      // Filtra os produtos com base no termo de pesquisa
      const filteredProducts = data.filter(product => {
        // Verifica se o título do produto contém o termo de pesquisa
        return product.title.toLowerCase().includes(searchTerm);
      });

      // Renderiza os produtos filtrados
      filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsSection.appendChild(productElement);
      });
    });
  })
  .catch(error => console.log('Erro na requisição:', error));

  // Armazena a página atual e o número de produtos por página
let currentPage = 1;
const productsPerPage = 8;

// Função para renderizar os produtos com base na página atual
const renderProducts = (products) => {
  const productsSection = document.querySelector('.products');

  // Remove todos os produtos existentes
  productsSection.innerHTML = '';

  // Calcula os índices inicial e final dos produtos na página atual
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Renderiza os produtos da página atual
  for (let i = startIndex; i < endIndex; i++) {
    if (products[i]) {
      const productElement = createProductElement(products[i]);
      productsSection.appendChild(productElement);
    }
  }
};
