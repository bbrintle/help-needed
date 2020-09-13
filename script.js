var stripe = Stripe('pk_test_51HQfxcDWSmRspLnGbJM5WqgCwfcWNZg2Bth5BOYVI5YvhTdyKvOOBi1zZ9HYMybbQll3SwDmD2Ek354FK4aT6UDG00ZJ9a5b1u');
var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card-element');