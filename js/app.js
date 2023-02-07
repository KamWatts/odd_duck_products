'use strict'

console.log('Hello There')
// Global variables and DOM window:

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');

let image1 = document.querySelector('section img:first-child')
let image2 = document.querySelector('section img:nth-child(2)')
let image3 = document.querySelector('section img:nth-child(3)')

let numberOfMatches = 0;
let numberOfMatchesAllowed = 25;

let allProducts = [];


function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.imageShown = 0;
  this.likes = 0;
}

let bag = new Products('bag');
let banana = new Products('banana');
let bathroom = new Products('bathroom');
let boots = new Products('boots');
let breakfast = new Products('breakfast');
let bubblegum = new Products('bubblegum');
let chair = new Products('chair');
let monster = new Products('cthulhu');
let dogduck = new Products('dog-duck');
let dragon = new Products('dragon');
let pen = new Products('pen');
let petsweep = new Products('pet-sweep');
let scissors = new Products('scissors');
let shark = new Products('shark');
let childsweep = new Products('sweep', 'png');
let snuggie = new Products('tauntaun');
let unicorn = new Products('unicorn');
let watercan = new Products('water-can');
let wineglass = new Products('wine-glass');

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
  wineglass
];

function selectRandomImage() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let product1 = selectRandomImage();
  let product2 = selectRandomImage();
  let product3 = selectRandomImage();
  console.log(product1, product2, product3);
  while (product1 === product2 || product1 === product3 || product2 === product3) {

    if (product1 === product2){
      product2 = selectRandomImage();
    }
   else if (product1 === product3 || product2 === product3){
    product3 = selectRandomImage();
    }
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;
  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;

  allProducts[product1].imageShown++;
  allProducts[product2].imageShown++;
  allProducts[product3].imageShown++;

  numberOfMatches++;
  }
}

function renderTotals() {
  let results = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].likes}likes and was shown this many times: ${Products.imageShown} times`;

    results.appendChild(li);
    }
  }

function handleClick(event) {

  let clickedProduct = event.target.alt;

  for (let i = 0; i < allProducts.length; i++) {

    if (allProducts[i].name === clickedProduct) {
      allProducts[i].likes++;
    }
  }

  if (numberOfMatches < numberOfMatchesAllowed) {

    renderProducts();

  } else {

    myContainer.removeEventListener('click', handleClick);
    myButton.addEventListener('click', renderProducts);
  }
}
renderProducts();
myContainer.addEventListener('click', handleClick);