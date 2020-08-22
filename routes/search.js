const express = require('express');
const router = express.Router();
const API_KEY = process.env.API_KEY;
const AIR_LAB_API_KEY = process.env.AIR_LAB_API_KEY;
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
            let all = [];
            let carrierCodeArray = [];
            let airlineNames = [];
            resultData.forEach(eachResult => {
                let segments= eachResult.itineraries[0].segments
                segments.forEach(segment=> {
                    let carrierCode = segment.carrierCode
                    if(carrierCodeArray.includes(carrierCode)) {
                        // skip this code
                    } else {
                        carrierCodeArray.push(carrierCode);
                        all.push(axios.get(`http://airlabs.co/api/v7/airlines?api_key=${AIR_LAB_API_KEY}&iata_code=${carrierCode}`))
                    }
                })
                if(eachResult.itineraries[1]) {
                    let returnSegments = eachResult.itineraries[1].segments;
                    returnSegments.forEach(segment=> {
                        let carrierCode = segment.carrierCode
                        if(carrierCodeArray.includes(carrierCode)) {
                            // skip this code
                        } else {
                            carrierCodeArray.push(carrierCode);
                            all.push(axios.get(`http://airlabs.co/api/v7/airlines?api_key=${AIR_LAB_API_KEY}&iata_code=${carrierCode}`))
                        }
                    })
                }
            })

    
            Promise.all(all).then(responses=> {
                responses.forEach(response=> {
                    let airlineName = response.data.response[0].name;
                    let tempObj = {
                        carrierCode: response.data.response[0].iata_code,
                        airlineName: airlineName
                    }
                    airlineNames.push(tempObj);
                })
                return airlineNames;
            }).then(airlineNames=> {
                //console.log(airlineNames)       

                if (req.user) {
                    res.render('search',{resultData: resultData , queryData: req.query, user: req.user, airlineNames: airlineNames});
                } else {
                    //res.send(resultData);
                    res.render('search',{resultData: resultData , queryData: req.query, airlineNames: airlineNames});
                }
            }).catch(error=> {
                console.log('Error',error);
                res.redirect('/error');
            })
            
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