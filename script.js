document.addEventListener('DOMContentLoaded', () => {
    let menContainer = document.querySelector('.men');
    let womenContainer = document.querySelector('.women');

    function fetchProducts(category, container) {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                let filteredData = data.filter(element => element.category === category);
                container.innerHTML = ''; // Clear the container before adding new content

                filteredData.forEach(element => {
                    container.innerHTML += `
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
                                <p class="cost">$${element.price.toFixed(2)}</p>
                                <button class="add_to_cart" data-product-id="${element.id}" data-product-name="${element.title}" data-product-price="${element.price}" data-product-img="${element.image}">
                                    <img src="images/cart2.png" alt="cart">
                                </button>
                            </div>
                        </div>
                    `;
                });

                attachAddToCartEventListeners(); // Attach event listeners after updating the container
            });
    }

    function renderStar(rate) {
        let fullStars = Math.floor(rate);
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += `<img src="images/yellow_star.png" alt="star">`;
        }

        return stars;
    }

    function attachAddToCartEventListeners() {
        let addToCartButtons = document.querySelectorAll('.add_to_cart');
        addToCartButtons.forEach(button => {
            button.removeEventListener('click', addToCart); // Remove any existing event listener
            button.addEventListener('click', addToCart); // Attach a new event listener
        });
    }

    function addToCart(event) {
        event.preventDefault();
        let button = event.target.closest('.add_to_cart');
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
    }

    // Fetch and display products for men and women
    fetchProducts("men's clothing", menContainer);
    fetchProducts("women's clothing", womenContainer);
});
