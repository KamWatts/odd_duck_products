/** @format */

"use strict";

console.log("Hello There");
// Global variables and DOM window:

let myContainer = document.querySelector("section");
let myButton = document.querySelector("section + div");

let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:nth-child(3)");

let numberOfMatches = 0;
let numberOfMatchesAllowed = 25;

let allProducts = [];
let indexArray = [];

function Products(name, fileExtension = "jpg") {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.imageShown = 0;
  this.likes = 0;
}

let bag = new Products("bag");
let banana = new Products("banana");
let bathroom = new Products("bathroom");
let boots = new Products("boots");
let breakfast = new Products("breakfast");
let bubblegum = new Products("bubblegum");
let chair = new Products("chair");
let monster = new Products("cthulhu");
let dogduck = new Products("dog-duck");
let dragon = new Products("dragon");
let pen = new Products("pen");
let petsweep = new Products("pet-sweep");
let scissors = new Products("scissors");
let shark = new Products("shark");
let childsweep = new Products("sweep", "png");
let snuggie = new Products("tauntaun");
let unicorn = new Products("unicorn");
let watercan = new Products("water-can");
let wineglass = new Products("wine-glass");

allProducts = [
  bag,
  banana,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  chair,
  monster,
  dogduck,
  dragon,
  pen,
  petsweep,
  scissors,
  shark,
  childsweep,
  snuggie,
  unicorn,
  watercan,
  wineglass,
];
console.log(allProducts);

function selectRandomImage() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  // let product1 = selectRandomImage();
  // let product2 = selectRandomImage();
  // let product3 = selectRandomImage();
  // console.log(product1, product2, product3);

  while (indexArray.length < 6) {
   let ranProduct = selectRandomImage();
   console.log(ranProduct);
   if (!indexArray.includes(ranProduct)) {
    indexArray.push(ranProduct);
   }
  }
  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();

  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;

  allProducts[product1].imageShown++;
  allProducts[product2].imageShown++;
  allProducts[product3].imageShown++;
}

// function renderTotals() {
//   let results = document.querySelector("ul");
//   console.log(allProducts);
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement("li");

//     li.textContent = `${allProducts[i].name} had ${allProducts[i].likes}likes and was shown this many times: ${allProducts[i].imageShown} times`;

//     results.appendChild(li);
//   }
// }

function handleClick(event) {
  let clickedProduct = event.target.alt;
  console.log(clickedProduct);
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === clickedProduct) {
      allProducts[i].likes++;
    }
  }

  if (numberOfMatches < numberOfMatchesAllowed) {
    numberOfMatches++;
    renderProducts();
    console.log(numberOfMatches);
  } else {
    myContainer.removeEventListener("click", handleClick);
    //myButton.addEventListener("click", renderTotals);
    console.log(allProducts);
    renderChart();
  }
}
renderProducts();
myContainer.addEventListener("click", handleClick);

function showchart() {
  let productLikes = 0;
  let productNames = 0;
  let productViews = 0;

  for (let i = 0; i < allProducts.length; i++) {
    productLikes.push(allProducts[i].likes);
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].imageShown);
}

const ctx = document.getElementById('productChart');

let configure = {
  type: 'bar',
  data: {
    
  }
}

}