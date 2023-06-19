// Função para obter os itens do carrinho do localStorage
const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  };
  
  // Função para exibir os itens do carrinho na página
  const displayCartItems = () => {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo anterior
  
    const cartItems = getCartItems();
    cartItems.forEach(item => {
      // Crie os elementos HTML para exibir os detalhes do item
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('cart-item');
  
      const titleElement = document.createElement('h3');
      titleElement.textContent = item.title;
      itemContainer.appendChild(titleElement);
  
      const quantityElement = document.createElement('p');
      quantityElement.textContent = `Quantidade: ${item.quantity}`;
      itemContainer.appendChild(quantityElement);
  
      // Adicione o item ao container do carrinho
      cartItemsContainer.appendChild(itemContainer);
    });
  
    // Verifique se o carrinho está vazio
    if (cartItems.length === 0) {
      const emptyCartMessage = document.createElement('p');
      emptyCartMessage.textContent = 'Seu carrinho está vazio.';
      cartItemsContainer.appendChild(emptyCartMessage);
    }
  };
  
  // Chame a função para exibir os itens do carrinho na página
  displayCartItems();
  