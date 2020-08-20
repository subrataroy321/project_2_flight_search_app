const express = require('express');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const axios = require('axios');


router.get('/', (req,res)=> {

    let url; 
    if(req.query.tripType === 'oneway'){
        url =`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${req.query.originLocationCode.slice(0,3)}&destinationLocationCode=${req.query.destinationLocationCode.slice(0,3)}&departureDate=${req.query.departureDate}&adults=${req.query.adults}&children=${req.query.children}&infants=${req.query.infants}&travelClass=${req.query.travelClass}&currencyCode=USD&max=30`
        
    } else if(req.query.tripType === 'return'){
        url =`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${req.query.originLocationCode.slice(0,3)}&destinationLocationCode=${req.query.destinationLocationCode.slice(0,3)}&departureDate=${req.query.departureDate}&returnDate=${req.query.returnDate}&adults=${req.query.adults}&children=${req.query.children}&infants=${req.query.infants}&travelClass=${req.query.travelClass}&currencyCode=USD&max=30`
        
    }

    const qs = `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
    
    axios.post(' https://test.api.amadeus.com/v1/security/oauth2/token', qs, {
        headers:  {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response=> {
        let accessToken = response.data.access_token;
        
        axios.get( url, {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then( response => {
            let resultData= response.data.data;
            res.render('search',{resultData: resultData , queryData: req.query});
        })
        .catch(error=> {
            console.log('Error',error);
            res.redirect('/error');
        })

    })
    .catch(error=> {
        console.log('Error',error)
        res.redirect('/error');
    })

})


router.post('/add', (req,res)=> {
    
})


module.exports = router;