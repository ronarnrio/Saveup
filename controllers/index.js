var axios = require("axios").default;

function financeApis (req, res) {
    res.render('api', { title: '$aveUp | Finance' })
}

function bitcoinApi (req, res) {
    

    const options = {
      method: 'GET',
      url: 'https://coinranking1.p.rapidapi.com/coins',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': '9edacf6e67msh33e368f260c8d32p15b586jsnec4868131732'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
        const coinData = response.data
        res.render('bitcoindata', { title: '$aveUp | Bitcoin', coinData})
    }).catch(function (error) {
        console.error(error);
    });
}

function stockApiPage (req, res) {
    res.render('stockdata', { title: '$aveUp | Stocks' })
}

function stockApi (req, res) {
    const indices = req.query.indices
    const options = {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/price',
        params: {Indices: indices},
        headers: {
          'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com',
          'x-rapidapi-key': '9edacf6e67msh33e368f260c8d32p15b586jsnec4868131732'
        }
      };
      
      axios.request(options).then(function (response) {
        console.log(response.data);
        const stockData = response.data
        res.render('stockinfo', { title: '$aveUp | Stocks', stockData })
    }).catch(function (error) {
        console.error(error);
    });
}

module.exports = {
    financeApis,
    bitcoinApi,
    stockApiPage,
    stockApi
}