<template>
    <div>
        <h1>Error- 404: PAGE NOT FOUND</h1>
        <img src="https://wpklik.com/wp-content/uploads/2019/03/A-404-Page-Best-Practices-and-Design-Inspiration.jpg" alt="page not found" />
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

div{
    margin: auto;
    text-align: center;
}
img{
    width: 100%;
    height: 40rem;
}
</style>

<!-- <template>
    <div>
        <button type="submit">Pay Now</button>
    </div>
</template>

<script>
import { VueStripe } from '@vue-stripe/vue-stripe';

export default {
    name: 'PageNotFound',
    data() {
        return {
            amount: 1000, // amount in cents
            currency: 'inr',
            stripe: null
        };
    },
    async created() {
        this.stripe = await VueStripe.create('pk_test_51MygxuSCuSinckWQMAw9Ig81En7GCnRHQnvB8HuXLUfujlne3pTtX2UvcxRY7iWQKu4A5eTOJOLzmXQQyj6wLR4k00JHmgAyNM');
    },
    methods: {
        async submitForm() {
            // create checkout session
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price: 'price_1Myr5XSCuSinckWQ7LUOCIXO', // your price key
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'https://localhost:3000/success',
                cancel_url: 'https://localhost:3000/errorPage',
                currency: this.currency,
                billing_address_collection: 'required',
            });

            // redirect to checkout page
            window.location.href = session.url;
        }
    }
}
</script>

<template>
    <div>
        <button @click="redirectToCheckout">Buy Now</button>
    </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';

export default {
    name: 'StripeCheckoutButton',
    data() {
        return {
            stripe: null,
            priceId: 'price_1Myr5XSCuSinckWQ7LUOCIXO', // replace with your own price ID
        };
    },
    methods: {
        async redirectToCheckout() {
            if (!this.stripe) {
                this.stripe = await loadStripe('pk_test_51MygxuSCuSinckWQMAw9Ig81En7GCnRHQnvB8HuXLUfujlne3pTtX2UvcxRY7iWQKu4A5eTOJOLzmXQQyj6wLR4k00JHmgAyNM'); // replace with your own public key
            }
            const { error } = await this.stripe.redirectToCheckout({
                lineItems: [{ price: this.priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: 'http://localhost:8080/success',
                cancelUrl: 'http://localhost:8080/cancel',
            });
            if (error) {
                console.error(error);
            }
        },
    },
};
</script -->

