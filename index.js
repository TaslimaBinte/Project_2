// Grabbing Elements
const cards = document.querySelectorAll(".card");
const pageRightSide = document.querySelector(".page-right");
//console.log(cards); 

//console.log(cards[0].childNodes[3].childNodes[5].childNodes[1]);

const cartState = { totalPrice : 0 };



cards.forEach((singleCard,idx) => {



//const singleButton = singleCard.childNodes[3].childNodes[5].childNodes[1];


singleCard.addEventListener('click',() => {
const _price = singleCard.querySelector("article strong").textContent;
const price = Number(_price.split(" ")[1]);
const productName = singleCard.querySelector("article h2").textContent;
const productImage = singleCard.querySelector("figure img").src;
  // console.log(`Clicked ${idx}`)

  if(productName in cartState){
    cartState[productName].quantity++;
    cartState.totalPrice += price;
  }else{
    cartState[productName] = {};
    cartState[productName].price = price;
    cartState[productName].quantity = 1;
    cartState[productName].image = productImage 
    cartState.totalPrice += price;

  }
  appendCartItems(cartState);
 

 })
})

function appendCartItems(currentCartState){
  pageRightSide.innerHTML = "";

  pageRightSide.innerHTML += createGrandTotal(currentCartState.totalPrice);

  for(let productName in currentCartState){
    if(productName != 'totalPrice'){
      const quantity = currentCartState[productName].quantity;
      const price = currentCartState[productName].price;
      const img = currentCartState[productName].image;

      const cartItem = createCartItem(img, productName, price, quantity )
      pageRightSide.innerHTML += cartItem;

    }
  }
}

function createGrandTotal(grand_total){
  const grandTotalElement = `
  <section>
     <strong> Grand Total : ${grand_total.toFixed(2)} BDT (only)</strong>
  </section>
  `
  return grandTotalElement;
}



function createCartItem(img_url, title, unit_price, quantity){
  const cartItem = `
  <section class="cart-item">
            <section class="flex flex-between pe-1">
              <figure class="cart-figure">
                <img class="cart-img" src="${img_url}" alt="${title}">
                <article>
                  <h3 class="pb-0 mb-0">${title}</h3>
                </article>
              </figure>
              <article class="flex w-50 flex-between">
                <div>
                  <p>Unit Price</p>
                  <p><strong>${unit_price}</strong></p>
                </div>
                <div>
                  <p>Quantity</p>
                  <p><strong>${quantity}</strong></p>
                </div>
              </article>
            </section>
            <article class="text-center cart-total-btn">
              <p class="p-0 m-0"><strong>Total: ${(unit_price*quantity).toFixed(2)}  BDT</strong></p>
            </article>
          </section>`

          return cartItem
}



