import { products } from "./DB/product.js";   

const parentContainer = document.getElementById("product");

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
    cardTitle.innerText = "Premimum Collection";
    cardDetails.appendChild(cardTitle);
    cardContainer.appendChild(cardDetails);

    const cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    cardDescription.innerHTML = `<p class="card-des">${product.name}</p>
                      <p class="card-price">
                     Rs. ${product.newPrice}
                        <span class="price-strike-through">Rs. ${product.oldPrice}</span>
                     <span class="discount">(${product.discount} % OFF)</span>
                  </p>`
    cardDetails.appendChild(cardDescription);

    

}   

