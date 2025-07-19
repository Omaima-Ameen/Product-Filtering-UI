const products = [
  {
    name: "Samsung Galaxy",
    url: "images/smart1.jpg",
    category: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/camera2.jpg",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/camera.jpg",
    category: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/games2.jpg",
    category: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/games3.jpg",
    category: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/smart2.jpg",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/televison.jpg",
    category: "televisions",
    price: 1099.99,
  },

  {
    name: "Sony ZV1F Camera",
    url: "images/camera2.jpg",
    category: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/televisoon2.jpg",
    category: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/smart3.jpg",
    category: "smartphones",
    price: 999.99,
  },
  {
    name: "Samsung TV",
    url: "images/televison.jpg",
    category: "televisions",
    price: 1099.99,
  },

  {
    name: "Sony ZV1F Camera",
    url: "images/camera2.jpg",
    category: "cameras",
    price: 799.99,
  },
];

//select dom elemets
const productWrapper = document.getElementById("product-wrapper");
const checkBoxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

/// INitialise cart item count
let cartItemCount = 0;

///INitialise product element array
const productElements = [];

///Event listeners for filterning

filtersContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

/// ab hum products pe loop chlayenge and ek element banayenge
products.forEach((product) => {
  const productElement = createProductElement(product);
  //- iska mtlb hota hai adding an item to an array
  productElements.push(productElement);
  productWrapper.appendChild(productElement);
});

//-create product element
function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.className = "item space-y-2";
  productElement.innerHTML = `
<div
            class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
          >
            <img
              src="${product.url}"
              alt="${product.name}"
              class="w-100 h-40 object-cover bg-white-900"
            />
            <button
              class="status bg-red-500 text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
            >
              Add to Cart
            </button>
          </div>
          <p class="text-xl">${product.name}</p>
          <strong>$${product.price.toLocaleString()}</strong>
`;
  //- add to cart button se kuch krwana hai
  productElement.querySelector(".status").addEventListener("click", updateCart);
  return productElement;
}

/// ADD OR REMOVE ITEM IN CART
function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    //remove from cart
    statusEl.classList.remove("added");
    statusEl.classList.remove("bg-red-900");
    statusEl.classList.add("bg-red-500");
    statusEl.innerHTML = "Add to cart";

    cartItemCount--;
  } else {
    //add to the cart
    statusEl.classList.add("added");
    statusEl.innerHTML = "Remove from cart";
    statusEl.classList.remove("bg-red-500");
    statusEl.classList.add("bg-red-900");

    cartItemCount++;
  }

  //update cart item count

  cartCount.innerText = cartItemCount.toString();
}

//Filter products based on checkboxes and search input
function filterProducts() {
  //get search item
  const searchItem = searchInput.value.trim().toLowerCase();
  //get checked categories
  const checkedCategories = Array.from(checkBoxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  //- loop over products and check for matches
  productElements.forEach((productElement, index) => {
    const product = products[index];

    //check to see if the product matches the search or the checked categories

    const matchesSearch = product.name.toLocaleLowerCase().includes(searchItem);
    const isInCheckedCategory =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

      //-show or hide based on matches

      if(matchesSearch && isInCheckedCategory){
        productElement.classList.remove('hidden')
      }else{
        productElement.classList.add("hidden")
      }
  });
  console.log(checkedCategories);
}
