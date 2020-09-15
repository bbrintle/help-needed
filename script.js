var stripe = Stripe('pk_test_51HQfxcDWSmRspLnGbJM5WqgCwfcWNZg2Bth5BOYVI5YvhTdyKvOOBi1zZ9HYMybbQll3SwDmD2Ek354FK4aT6UDG00ZJ9a5b1u');
var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');




// //This event triggers when a change is made to the cardElement. The conditional checks
// //to see if the entire input field has been completed, and if so, informs them its complete
// //in the console
cardElement.on('change', function(event) {
    var sourceClientSecret;
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else if (event.complete) {
      displayError.textContent = '';
      console.log("Credit Card Field has been filled out completely!")

        stripe.createSource({
        type: 'ideal',
        amount: 1099,
        currency: 'eur',
        owner: {
            name: 'Jenny Rosen',
        },
        redirect: {
            return_url: 'https://shop.example.com/crtA6B28E1',
        },
        }).then(function(result) {

            sourceClientSecret = result.source.client_secret;
            console.log(sourceClientSecret);

                //create a PaymentIntent to pull {Payment_Intent_Client_Secret}
                //currently using a static {Payment_Intent_Client_Secret}
                //need to figure out how to find the PaymentIntent object so I can collect the client secret
                //and pass it through the confirmCardPayment() dynamicly.
                
                //confirm card payment
                stripe.confirmCardPayment("pi_1HQygWDWSmRspLnGyv6O78db_secret_TpxSP7jL1nvioi4Ao6ZE62nch", {
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