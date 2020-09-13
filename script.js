var stripe = Stripe('pk_test_51HQfxcDWSmRspLnGbJM5WqgCwfcWNZg2Bth5BOYVI5YvhTdyKvOOBi1zZ9HYMybbQll3SwDmD2Ek354FK4aT6UDG00ZJ9a5b1u');
var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');

// //This event triggers when a change is made to the cardElement. The conditional checks
// //to see if the entire input field has been completed, and if so, informs them its complete
// //in the console
cardElement.on('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else if (event.complete) {
      displayError.textContent = '';
      console.log("Credit Card Field has been filled out completely!")

        // Need to create or find the PaymentIntent to pull {Payment_Intent_Client_Secret}

        //confirm card payment ({Payment_Intent_Client_Secret} provided below is a static key, but needs to be dynamic
        //and collect the {Payment_Intent_Client_Secret} from the PaymentIntent.)
        stripe.confirmCardPayment("pi_1HQzz7DWSmRspLnGYl9MbOMk_secret_RsUlJ3beDu8wiDUty1gHAVPWh", {
            payment_method: {
                card: cardElement,
                billing_details: {
                name: "Jenny Rosen",
                },
            },
        })
        .then(function(result) {
            console.log(result)
        });

    } else{
        //return nothing
    }
 });
        

//Set the zipcode in the card input if provided in first input
cardElement.on('focus', function(event) {
    // Update an element with details collected elsewhere on your page
    var myPostalCodeField = $('#postal-code').val();
    console.log(myPostalCodeField);
    cardElement.update({value: {postalCode: myPostalCodeField}});
});

//Clear out credit card input if esc is pressed
cardElement.on('escape', function(event) {
    console.log("escape button pressed in the element")
    //clears the values inside of the element
    cardElement.clear()
});