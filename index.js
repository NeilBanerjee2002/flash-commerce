import { products } from "./DB/product.js";   

const parentContainer = document.getElementById("product");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function isProductInCart(cart,productId) {
    const product = cart && cart.length>0 && cart.some((item) => item._id === productId);
    return product;
}

for (let product of products){
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card",
        "card-vertical",
        "d-flex",
        "direction-column",
        "relative",
        "shadow",
    );
    
    
    const cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.src = product.img;
    
    cardContainer.appendChild(cardImage);
    parentContainer.appendChild(cardContainer);

    const cardDetails = document.createElement("div"); 
    cardDetails.classList.add("card-details");
    
    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = `${product.name}`;
    cardDetails.appendChild(cardTitle);
    cardContainer.appendChild(cardDetails);

    const cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    cardDescription.innerHTML = `<p class="card-des">${product.name}</p>
                      <p class="card-price d-flex align-end gap-sm">
                     Rs. ${product.newPrice}
                        <span class="price-strike-through">Rs. ${product.oldPrice}</span>
                     <span class="discount">(${product.discount} % OFF)</span>
                  </p>`
    cardDetails.appendChild(cardDescription);

    const cardRating = document.createElement("div");
    cardRating.classList.add("card-rating", "d-flex", "align-center", "gap-sm");
    cardRating.innerHTML = `<span class="rating">${product.rating}</span>
                            <i class="fa-solid fa-star star"></i>`
    cardDetails.appendChild(cardRating);

    const cardButton = document.createElement("div");
    const isInCart = isProductInCart(cart, product._id);
    cardButton.classList.add("cta-btn");
    cardButton.innerHTML = `
    <button class="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
        <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart" style="width: 20px; height: 20px;">
        ${isInCart ? 'Remove from Cart' : 'Add To Cart'}
    </button>`;

    cardDetails.appendChild(cardButton);
    cardButton.setAttribute("data-id", product._id);
   
}   

// Attach event to the parent container
parentContainer.addEventListener("click", (event) => {
    // Make sure only the actual button triggers the event
    const cartButton = event.target.closest(".cta-btn");

    if (cartButton) {
        const productId = cartButton.dataset.id;
        const inCart = isProductInCart(cart, productId);

        if (!inCart) {
            const productAddtoCart = products.find((product) => product._id === productId);
            if (productAddtoCart) {
                cart.push(productAddtoCart);
                cartButton.innerHTML = `
                            <button class="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin" data-id="${productId}">
                                <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart" style="width: 20px; height: 20px;"> 
                             Remove From Cart
                            </button>
                            `;
                localStorage.setItem("cart", JSON.stringify(cart));
                
            }
        }
        else{
            const productRemoveFromCart = products.find((product) => product._id === productId);
            if (productRemoveFromCart) {
                cart = cart.filter((item) => item._id !== productId);
                cartButton.innerHTML = `
                            <button class="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin" data-id="${productId}">
                                <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="cart" style="width: 20px; height: 20px;"> 
                             Add To Cart
                            </button>
                            `;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    
});


