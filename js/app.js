/** @format */

"use strict"

// Convert objects to and from JSON with JSON.stringify() and JSON.parse().
// Save application state directly into local storage through localStorage.setItem().
// Retrieve application state from local storage through localStorage.getItem().
// Notes

console.log("Hello There");
// Global variables and DOM window:

let myContainer = document.querySelector("section");
let myButton = document.querySelector("section + div");

// target the images through css
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:nth-child(3)");

// keep track of these numbers globally for comparisons and data storage
let numberOfMatches = 0;
let numberOfMatchesAllowed = 25; 

// stores the product instances
let allProducts = [];

// stores the random images of the products
let indexArray = [];

// contructor function for each Product instance
function Products(name, fileExtension = "jpg") {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.imageShown = 0;
  this.likes = 0;
}
// The actual products called as new instances of the Products constructor
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

// array that stores the products
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


// Retrieves the products from the allProducts array and opens the data
function getProducts () {
  let data = localStorage.getItem('allProducts');
  allProducts = JSON.parse(data);
  console.log(allProducts);
  }

// turns the allProducts array into a string to save the data as an object in local storage
function storeProduct() {
  let stringifiedItems = JSON.stringify(allProducts);
  localStorage.setItem('allProducts', stringifiedItems);
}
// math to produce random images retreived from the allproducts array
function selectRandomImage() {
  return Math.floor(Math.random() * allProducts.length);
}
getProducts(); // calls our getProducts function

// shows the photos. pushes to the indexArray if the photos aren't there, populates 3 photos of the products.
function renderProducts() {

  while (indexArray.length < 6) {
    let ranProduct = selectRandomImage();
    
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
  
  // Increases the views tally
  allProducts[product1].imageShown++;
  allProducts[product2].imageShown++;
  allProducts[product3].imageShown++;
}

// What happens when the photo is clicked. Tracks the name of the photo and if that photo is clicked, the name will be registered into the console
function handleClick(event) {
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === clickedProduct) {
      allProducts[i].likes++;
    }
    if (!clickedProduct) {
      alert('Please click on an image to submit your vote');
    }
  }
  // keeps track of the maximum number of attempts in relation to the matches. Keeps track of how many times a photo is matched (picked more than once)
  if (numberOfMatches < numberOfMatchesAllowed) {
    renderProducts();
    numberOfMatches++;
  } else {
    myContainer.removeEventListener("click", handleClick);
    //myButton.addEventListener("click", renderTotals);
    // renderProducts();
    showChart();
  }
}
myContainer.addEventListener("click", handleClick);

// this chart will render with all of the data the local storage is collecting
function showChart() {
  let productLikes = [];
  let productNames = [];
  let productViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    productLikes.push(allProducts[i].likes);
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].imageShown);
    storeProduct(); // Saves product likes and views into local storage for page refresh
  }
  console.log(productLikes);
  console.log(productViews);

  // Chart.js code that styles the chart
  let config = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [
        {
          label: "# of Likes",
          data: productLikes,
          borderWidth: 2,
          backgroundColor: 'red',
          borderColor: 'rgb(255, 125, 255)',
          
        },
        {
          label: "# of Views",
          data: productViews,
        },
      ],
    },
    options: {
      scales: {
        y: {
            beginAtZero: true

        }
      }
    }
  };
  let ctx = document.getElementById("productChart").getContext('2d');
  console.log(ctx);
  new Chart(ctx, config);
}
renderProducts();
storeProduct();