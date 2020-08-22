const express = require('express');
const router = express.Router();
const db = require('../models');
//const isLoggedIn = require('./middleware/isLoggedIn');


router.get('/', (req,res)=> {
    db.favorite.findAll({
        where: { userId: req.user.id}
    })
    .then(favorites=> {
        //res.send(favorites)
        res.render('favorites', {favoritesData: favorites})
    })

})


router.post('/:id/add', (req,res)=> {
    console.log("here is the req.body");
    console.log(req.body)
    db.user.findOne({
        where: {id: req.params.id}
    })
    .then(user=> {
        //console.log(req.body);

        let departureAirport = req.body.departureAirport;
        let arrivalAirport = req.body.departureAirport;
        let departureTime = req.body.departureAirport;
        let arrivalTime = req.body.departureAirport;
        let travelTime = req.body.departureAirport;

        //console.log(departureAirport[0]);

        if(req.body.departureAirport.length) {
            user.createFavorite({
                userId: user.dataValues.id,
                airline: req.body.airline,
                boeing: req.body.boeing,
                stops: req.body.stops,
                departureAirport1: departureAirport[0],
                departureTime1: departureTime[0],
                arrivalAirport1: arrivalAirport[0],
                arrivalTime1: arrivalTime[0],
                travelTime1: travelTime[0],
                departureAirport2: departureAirport[1],
                departureTime2: departureTime[1],
                arrivalAirport2: arrivalAirport[1],
                arrivalTime2: arrivalTime[1],
                travelTime2: travelTime[1],
                departureAirport3: departureAirport[2],
                departureTime3: departureTime[2],
                arrivalAirport3: arrivalAirport[2],
                arrivalTime3: arrivalTime[2],
                travelTime3: travelTime[2],
                departureAirport4: departureAirport[3],
                departureTime4: departureTime[3],
                arrivalAirport4: arrivalAirport[3],
                arrivalTime4: arrivalTime[3],
                travelTime4: travelTime[3],
                departureAirport5: departureAirport[4],
                departureTime5: departureTime[4],
                arrivalAirport5: arrivalAirport[4],
                arrivalTime5: arrivalTime[4],
                travelTime5: travelTime[4],
                totalTravelTime: req.body.totalTravelTime,
                price: req.body.price
            }).then(favorite=> {
            //console.log(favorite)
            })
        } else {
            user.createFavorite({
                userId: user.dataValues.id,
                airline: req.body.airline,
                boeing: req.body.boeing,
                stops: req.body.stops,
                departureAirport1: req.body.departureAirport,
                departureTime1: req.body.departureTime,
                arrivalAirport1: req.body.arrivalAirport,
                arrivalTime1: req.body.arrivalTime,
                travelTime1: req.body.travelTime,
                totalTravelTime: req.body.totalTravelTime,
                price: req.body.price
            }).then(favorite=> {
            //console.log(favorite)
            })
        }
    
        res.redirect(`/favorites`);
    })




})



module.exports = router;