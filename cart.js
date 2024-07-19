let currUser = JSON.parse(localStorage.getItem('currUser'));
let totalAmount = 0;

if (currUser) {
    document.addEventListener('DOMContentLoaded', () => {
        let cartCardContainer = document.querySelector('.cart_html');
        let total = document.querySelector('.sub_total');
        let productArr = JSON.parse(localStorage.getItem('productArr') ?? []);

        function updateCart() {
            totalAmount = 0; // Reset totalAmount
            cartCardContainer.innerHTML = '';

            productArr.forEach((element, index) => {
                totalAmount += (element.price*10);

                cartCardContainer.innerHTML += `
                <div class="card" data-index="${index}">
                    <div class="img_container">
                        <img src="${element.img}" alt="cloth">
                    </div>
                    <p class="product_name">
                        ${element.name}
                    </p>
                    <p class="cost">₹${(element.price*10).toFixed(2)}</p>
                    <div class="cost_cart_btn">
                        <button class="cart_btn">Remove</button>
                    </div>
                </div>
                `;
            });

            total.textContent = `Total : ₹${totalAmount.toFixed(2)}`;

            attachRemoveEventListeners();
        }

        function attachRemoveEventListeners() {
            let removeButtons = document.querySelectorAll('.cart_btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    let card = e.target.closest('.card');
                    let index = card.getAttribute('data-index');

                    productArr.splice(index, 1);
                    localStorage.setItem('productArr', JSON.stringify(productArr));

                    updateCart();
                });
            });
        }

        updateCart();

        document.querySelector(".checkout").onclick = function (e) {
            e.preventDefault();

            var options = {
                key: "rzp_test_l897UIyxOg4iXb",
                amount: totalAmount * 100,
                currency: "INR",
                name: "Md Faizur Rahman",
                description: "This is your order",
                theme: {
                    color: "#E6C744",
                },
                image: "https://www.mintformations.co.uk/blog/wp-content/u",
            };

            var rzpy1 = new Razorpay(options);
            rzpy1.open();
            // clear mycart - localStorage
        };
    });
} else {
    alert('User does not exist');
    alert('You are being redirected to the Home Page');
    window.location.href = './index.html';
}



