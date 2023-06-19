// Obtém o ID do produto selecionado do localStorage
const selectedProductId = localStorage.getItem('selectedProductId');

// Fazendo a requisição GET para obter os detalhes do produto selecionado
fetch(`https://fakestoreapi.com/products/${selectedProductId}`)
  .then(response => response.json())
  .then(product => {
    const productDetailsSection = document.querySelector('.product-details');

    // Cria elementos HTML para exibir os detalhes do produto
    const imageElement = document.createElement('img');
    imageElement.src = product.image;
    imageElement.alt = product.title;
    productDetailsSection.appendChild(imageElement);

    const titleElement = document.createElement('h3');
    titleElement.textContent = product.title;
    productDetailsSection.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = product.description;
    productDetailsSection.appendChild(descriptionElement);

    const priceElement = document.createElement('h4');
    priceElement.textContent = `$${product.price}`;
    productDetailsSection.appendChild(priceElement);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'adicionar ao carrinho';
    addToCartButton.addEventListener('click', () => addToCart(product));
    productDetailsSection.appendChild(addToCartButton);
  })
  .catch(error => console.log('Erro na requisição:', error));

// Função para adicionar um item ao carrinho quando o botão for clicado
const addToCart = (product) => {
  // Obtém os itens do carrinho do localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Verifica se o item já está no carrinho
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

  if (existingItemIndex !== -1) {
    // Se o item já está no carrinho, incrementa a quantidade
    cartItems[existingItemIndex].quantity++;
  } else {
    // Se o item não está no carrinho, adiciona-o
    const selectedProduct = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: 1
    };
    cartItems.push(selectedProduct);
  }

  // Salva os itens atualizados no localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Exibe uma mensagem de confirmação ao usuário
  alert('Item adicionado ao carrinho!');
};
