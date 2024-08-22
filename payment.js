
emailjs.init("WQ4WgEngySo64rSK5");

function updateProductInfo() {
    const productSelect = document.getElementById('product');
    const productInfo = document.getElementById('product-info');
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const description = selectedOption.getAttribute('data-description');
    
    productInfo.innerHTML = `
        <h2>${selectedOption.text}</h2>
        <p>${description}</p>
        <p><strong>Price: ₹${(price / 100).toFixed(2)}</strong></p>
    `;
}

document.getElementById('product').addEventListener('change', updateProductInfo);
updateProductInfo(); // Initialize with the default selection

var options = {
    "key": "rzp_test_8uWq3JvB51nowt", // Enter the Key ID generated from the Dashboard
    "amount": function() {
        const productSelect = document.getElementById('product');
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        return selectedOption.getAttribute('data-price'); // Amount in currency subunits
    }(),
    "currency": "INR",
    "name": "Study Sphere",
    "description": function() {
        const productSelect = document.getElementById('product');
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        return selectedOption.getAttribute('data-description');
    }(),
    "image": "Images/1.png",
    "handler": function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id + "  "+ name);

        // Redirect to Google Drive link in a new page
        const productLink = document.getElementById('product').selectedOptions[0].getAttribute('data-link');
        window.open(productLink, '_blank');

        // Send customer info via EmailJS
        emailjs.send("service_uh3rxtd", "template_s2is7ev", {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            payment_id: response.razorpay_payment_id,
            company_info: "Study Sphere",
            product_link: productLink
        }).then(function(response) {
            console.log('Email sent successfully:', response);
        }, function(error) {
            console.log('Failed to send email:', error);
        });
    },
    "prefill": {
        "name": name,
        "email": email,
        "contact": phone
    },
    "notes": {
        "address": "StudySphere Office"
    },

    "theme": {
        "color": "#28a745"
    }
};

document.getElementById('rzp-button').onclick = function(e){
    options.amount = document.getElementById('product').selectedOptions[0].getAttribute('data-price');
    options.description = document.getElementById('product').selectedOptions[0].getAttribute('data-description');
    
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
}
