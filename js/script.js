window.addEventListener("DOMContentLoaded", function() {
  // Fazendo a requisição GET para obter os produtos em destaque
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      const carouselContainer = document.querySelector('.carousel-container');

      // Limpa o conteúdo atual do carrossel
      carouselContainer.innerHTML = '';

      // Adiciona as imagens dos produtos ao carrossel
      products.slice(0, 3).forEach(product => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.title;
        slideElement.appendChild(imageElement);

        carouselContainer.appendChild(slideElement);
      });

      // Inicializa o carrossel
      const slides = document.querySelectorAll('.slide');
      const slideWidth = slides[0].clientWidth;
      let slideIndex = 0;

      function moveSlides() {
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0;
        }
        carouselContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
      }

      setInterval(moveSlides, 3000);
    })
    .catch(error => console.log('Erro na requisição:', error));
});

window.addEventListener("DOMContentLoaded", function() {
  const productsContainer = document.querySelector('.products-container');

  // Fazendo a requisição GET para obter os produtos em destaque
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      // Exibe os produtos em destaque
      products.slice(0, 3).forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.title;
        productElement.appendChild(imageElement);

        const titleElement = document.createElement('h3');
        titleElement.textContent = product.title;
        productElement.appendChild(titleElement);

        const priceElement = document.createElement('p');
        priceElement.textContent = `Price: $${product.price}`;
        productElement.appendChild(priceElement);

        // Cria o link para a página de detalhes do produto
        const linkElement = document.createElement('a');
        linkElement.href = `detalhes-produto.html?id=${product.id}`;
        linkElement.textContent = 'Detalhes';
        productElement.appendChild(linkElement);

        productsContainer.appendChild(productElement);
      });
    })
    .catch(error => console.log('Erro na requisição:', error));
});





window.addEventListener("DOMContentLoaded", function() {
  // Fazendo a requisição GET para obter as categorias
  fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then(categories => {
      const categoryButtonsContainer = document.querySelector('.category-buttons');

      // Limpa o conteúdo atual dos botões de categoria
      categoryButtonsContainer.innerHTML = '';

      // Cria e adiciona os botões de categoria
      categories.forEach(category => {
        const buttonElement = document.createElement('button');
        buttonElement.classList.add('category-button');
        buttonElement.textContent = category;
        buttonElement.addEventListener('click', () => {
          window.location.href = `produtos.html?categoria=${category}`;
        });
        categoryButtonsContainer.appendChild(buttonElement);
      });
    })
    .catch(error => console.log('Erro na requisição:', error));
});
