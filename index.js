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
}   

