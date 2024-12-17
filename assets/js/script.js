// debut enzo 

// fin enzo 

// debut clem 
const stripe = require('stripe')('sk_test_51QUPnHFhiydSL0HhfqTv2s5DosXmrbaV6Vg1zpL2Wws5djqzmKzpQrWH2GuDK1SVFg1dETLHCSjc95GJA5XmDjDD00ahdizCvC');

stripe.products.create({
    name: 'Starter Subscription',
    description: '$12/Month subscription',
}).then(product => {
    stripe.prices.create({
        unit_amount: 1200,
        currency: 'usd',
        recurring: {
            interval: 'month',
        },
        product: product.id,
    }).then(price => {
        console.log('Success! Here is your starter subscription product id: ' + product.id);
        console.log('Success! Here is your starter subscription price id: ' + price.id);
        console.log('Price: $' + (price.unit_amount / 100) + ' per ' + price.recurring.interval);
    }).catch(err => {
        console.error('Error creating price:', err);
    });
}).catch(err => {
    console.error('Error creating product:', err);
});

// fin clem 

// debut jules 

// fin jules

// debut zak

// fin zal