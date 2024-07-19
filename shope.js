// Check if user is logged in
let currUser = JSON.parse(localStorage.getItem('currUser'));

if (!currUser) {
    alert('User does not exist');
    alert('You are redirecting to Login Page');
    window.location.href = './login.html';
}

let shop_card_container = document.querySelector('.shop_card_container');

// Function to render products
function renderProduct(data) {
    shop_card_container.innerHTML = ``;

    data.forEach(element => {
        shop_card_container.innerHTML += `
        <div class="card">
            <div class="img_container">
                <img src="${element.image}" alt="cloth">
            </div>
            <p class="mini_para">
                ${element.category}
            </p>
            <p class="product_name">
                ${element.title}
            </p>
            <div class="rating" id="rating-${element.id}">
                ${renderStar(element.rating.rate)}
            </div>
            <div class="cost_cart_btn">
                <p class="cost">${(element.price*10).toFixed(2)}₹</p>
                <button class="add_to_cart" data-product-id="${element.id}" data-product-name="${(element.price*10).toFixed(2)}" data-product-price="${element.price}" data-product-img="${element.image}"><img src="images/cart2.png" alt="cart"></button>
            </div>
        </div>
        `;
    });

    attachAddToCartEventListeners();
}

// Function to render star ratings
function renderStar(rate) {
    let fullStars = Math.floor(rate);
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += `<img src="images/yellow_star.png" alt="star">`;
    }

    return stars;
}

// Toggle active class among filter buttons
let btns = document.querySelectorAll('.shop_filter_btn');
btns.forEach(button => {
    button.addEventListener('click', (e) => {
        btns.forEach(button => button.classList.remove('active_shope'));
        e.target.classList.add('active_shope');
    });
});

// Fetch and render all products
function allProduct() {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        renderProduct(data);
    });
}

// Fetch and render men's products
let men = document.querySelector('.men');
men.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let men_data = data.filter((element) => element.category === "men's clothing");
        renderProduct(men_data);
    });
});

// Fetch and render women's products
let women = document.querySelector('.women');
women.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let women_data = data.filter((element) => element.category === "women's clothing");
        renderProduct(women_data);
    });
});

// Fetch and render jewelry products
let jewelery = document.querySelector('.Jewelery');
jewelery.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let jewelery_data = data.filter((element) => element.category === "jewelery");
        renderProduct(jewelery_data);
    });
});

// Fetch and render electronic products
let electronic = document.querySelector('.Electronic');
electronic.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let electronic_data = data.filter((element) => element.category === "electronics");
        renderProduct(electronic_data);
    });
});

// Attach event listeners to add to cart buttons
function attachAddToCartEventListeners() {
    let add_to_cart_buttons = document.querySelectorAll('.add_to_cart');
    add_to_cart_buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let product = {
                id: button.getAttribute('data-product-id'),
                name: button.getAttribute('data-product-name'),
                price: parseFloat(button.getAttribute('data-product-price')),
                img: button.getAttribute('data-product-img')
            };

            let productArr = JSON.parse(localStorage.getItem('productArr') ?? "[]");
            productArr.push(product);
            localStorage.setItem('productArr', JSON.stringify(productArr));
            alert('Product added to cart successfully!');
        });
    });
}

// Initial function call to render all products
allProduct();

// Sidebar functionality
document.querySelector('.filter_btn').addEventListener('click', () => {
    let priceFilters = [...document.querySelectorAll('.checkbox:checked')].map(el => el.closest('span').textContent.trim());
    let starRating = document.querySelector('.range').value;

    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let filteredData = data;

        // Filter by price range
        if (priceFilters.length > 0) {
            filteredData = filteredData.filter(product => {
                let price = product.price;
                return priceFilters.some(filter => {
                    if (filter === "100₹ to 250₹" && price <= 25) return true;
                    if (filter === "250₹ to 500₹" && price > 25 && price <= 50) return true;
                    if (filter === "500₹ to 1000₹" && price > 50 && price <= 100) return true;
                    if (filter === "₹1000 onwards" && price > 100) return true;
                    return false;
                });
            });
        }

        // Filter by star rating
        filteredData = filteredData.filter(product => product.rating.rate >= starRating);

        renderProduct(filteredData);
    });
});


// Search functionality
let searchInput = document.querySelector('.shop_search');
searchInput.addEventListener('input', (e) => {
    let query = e.target.value.toLowerCase();

    fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then((data) => {
        let filteredData = data.filter(product => product.title.toLowerCase().includes(query));
        renderProduct(filteredData);
    });
});

