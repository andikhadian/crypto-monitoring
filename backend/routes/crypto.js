const routerCrypto = require('express').Router({ caseSensitive: true });

const rp = require('request-promise'); 

routerCrypto.route('/all').get((req, res) => {
    const { search } = req.query
    const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'daaf93ee-41c1-44d5-83f6-7a2d2a021c9a'
    },
    json: true,
    gzip: true
    };

    rp(requestOptions).then(response => {
        let data = response.data
        if (search) {
            data = data.filter(el => el.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || el.symbol.toLowerCase().indexOf(search.toLowerCase()) >= 0)
        }
        return res.status(200).json(data)
    }).catch((err) => {
    console.log('API call error:', err.message);
    });
}) 

routerCrypto.route('/add-crypto').post((req, res) => {
    Crypto.create(req.body, (error, data) => {
        if (error) {
            return console.log(error)
        }
        
        return res.status(200).json(data)
    })
}) 

module.exports = routerCrypto