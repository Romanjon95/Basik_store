// Elements on the page
const productsCont = document.querySelector('.productsContainer');
const bucket = document.querySelector('.bucket');
const cartBag = document.querySelector('.cart-bag');
const xmark = document.querySelector('.xmark');

// Cart open/close
bucket.addEventListener('click', () => {
  console.log('Bombass');
  cartBag.classList.add('cart-bag_active');
})

xmark.addEventListener('click', () => {
  cartBag.classList.remove('cart-bag_active');
})

// Counter
window.addEventListener('click', (event) => {
//announce the let for the counter
  let counter;

  //Verify the click by buttons plus or minus
  if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
    //find a wrapper of counter
    const counterWrapper = event.target.closest('.product__counter-wrapper');

    //find a number of counter
    counter = counterWrapper.querySelector('[data-counter]');
  };

  //if the element is a plus key
  if (event.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
  }

  //if the element is a minus key
  if (event.target.dataset.action === 'minus') {
    //Verify if the counter is more than 1
    if (parseInt(counter.innerText) > 1) {
      counter.innerText = --counter.innerText;
      // calcCartPrice();
    }
  }

  //verifying a click + or - inside the cart
  if (event.target.hasAttribute('[data-action]') && event.target.closest('.productsContainer')) {
  }

  if (event.target.hasAttribute('data-action') && event.target.closest('.productsContainer')) {
    calcCartPrice();
  }
});

// Add products into the cart
window.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-cart')) {
    const product = event.target.closest('.product');
    const productInfo = {
      id: product.dataset.id,
      imgSrc: product.querySelector('.product__img').getAttribute('src'),
      title: product.querySelector('.product__text').innerText,
      price: product.querySelector('.product__price').innerText,
      counter: product.querySelector('[data-counter]').innerText,
    };

    console.log(productInfo);

    //is there a product in the cart - verification
    const itemInCart = productsCont.querySelector(`[data-id="${productInfo.id}"]`);

    // if there is a product in the cart
    if (itemInCart) {
      const counterElement = itemInCart.querySelector('[data-counter]');
      counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
    } else {
      // If there is no such a product in the cart

      const productItemHTML = `<div class="product bag" data-id="${productInfo.id}">
    <img class="product__img bag-img" src="${productInfo.imgSrc}" alt="${productInfo.title}">
    <div class="product__description bag-description">
      <p class="product__text bag-text">${productInfo.title}</p>
      <div class="product__price bag-price">${productInfo.price}</div>
      <p class="product__price bag-remove">remove</p>
    </div>
    <div class="product__counter-wrapper">
      <div class="product__control" data-action="plus">˄</div>
      <div class="product__current" data-counter="">${productInfo.counter}</div>
      <div class="product__control" data-action="minus">˅</div>
    </div>
  </div>`;
      
      productsCont.insertAdjacentHTML('beforeend', productItemHTML);
    }

    //Reset the counter after adding to card
    product.querySelector('[data-counter]').innerText = '1';

    //Calculation of total price of all items in the cart
    calcCartPrice();
  }
});

// Deleting an element from the cart
window.addEventListener('click', (event) => {
  if (event.target.closest('.bag-remove')) {
    event.target.closest('.product').remove();
    //calculating the total price
    calcCartPrice();
  }
});

// Deleting all elements from the cart
const checkout = document.querySelector('.featured__btn');
checkout.addEventListener('click', () => {
  productsCont.innerHTML = '';
  //calculating the total price
  calcCartPrice();
});

// Caclucating Products in the cart
function calcCartPrice() {
  const cartItems = document.querySelectorAll('.bag');
  const total = document.querySelector('.total');

  let totalPrice = 0;

  cartItems.forEach(function (item) {

    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.product__price');

    const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText)
    totalPrice += currentPrice;
  });

  //render the total price
  total.innerText = `Total : ${totalPrice}`;
};