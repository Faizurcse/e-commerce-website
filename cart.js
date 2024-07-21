let currUser = JSON.parse(localStorage.getItem('currUser'));
let totalAmount = 0;

if (currUser) {
    document.addEventListener('DOMContentLoaded', () => {
        let cartCardContainer = document.querySelector('.cart_html');
        let total = document.querySelector('.sub_total');
        let productArr = JSON.parse(localStorage.getItem('productArr') ?? '[]');

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
                    <p class="cost">${(element.price*10).toFixed(2)}₹</p>
                    <div class="cost_cart_btn">
                        <button class="cart_btn">Remove</button>
                    </div>
                </div>
                `;
            });

            total.textContent = `Total : ${totalAmount.toFixed(2)}₹`;

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



        // Select the checkout button and add a click event listener to it
document.querySelector(".checkout").onclick = function (e) {
    // Prevent the default action of the button click (e.g., form submission)
    e.preventDefault();

    // Define the options for the Razorpay payment
    var options = {
        key: "rzp_test_l897UIyxOg4iXb", // The Razorpay API key for the merchant
        amount: totalAmount * 100, // The amount to be paid in the smallest currency unit (e.g., paise for INR)
        currency: "INR", // The currency of the payment
        name: "Md Faizur Rahman", // The name of the merchant or business
        description: "This is your order", // A description of the order or payment
        theme: {
            color: "#E6C744", // The color theme of the payment window
        },
        image: "https://www.mintformations.co.uk/blog/wp-content/u", // A URL to the merchant's logo or image
    };

    // Create a new Razorpay payment object with the specified options
    var rzpy1 = new Razorpay(options);
    // Open the Razorpay payment window
    rzpy1.open();
    //  clear the shopping cart stored in localStorage after the payment is initiated
    localStorage.removeItem('productArr');

};

    });
} else {
    alert('User does not exist');
    alert('You are being redirected to the Home Page');
    window.location.href = './index.html';
}


// click On Logo Goto shope screen

function clickOnLogoGotoShope(){
    window.location.href = './shope.html';
}
