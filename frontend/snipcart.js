const secret = "YOUR_SECRET_API_KEY"

const request = await fetch('https://app.snipcart.com/api/orders', {
    headers: {
        'Authorization': `Basic ${btoa(secret)}`,
        'Accept': 'application/json'
    }
})

const result = await request.json()