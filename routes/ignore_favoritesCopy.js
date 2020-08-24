const express = require('express');
const router = express.Router();
const db = require('../models');
//const isLoggedIn = require('./middleware/isLoggedIn');


router.get('/', (req,res)=> {
    db.outboundFavorite.findAll({
        where: { userId: req.user.id}
    })
    .then(favorites=> {
        //console.log(favorites)
        if(favorites === []) {
            console.log('line 14')
            console.log(favorites)
            res.render('favorites', {favoritesData: favorites, favoritesIsNull: 'You don/`t have anything added to Favorites Yet'})
        } else {
            console.log('line 17')
            console.log(favorites)
            res.render('favorites', {favoritesData: favorites})
        }
    })
    .catch(error=> {
        console.log('Error',error);
        res.redirect('/error');
    })

})


router.post('/:id/add', (req,res)=> {
    console.log("here is the req.body");
    //console.log(req.body)
    db.user.findOne({
        where: {id: req.user.id}
    })
    .then(user=> {
        console.log(req.body);
        let airline = req.body.airline;
        let airlineCode = req.body.airlineCode;
        let aircraftCode = req.body.aircraftCode;
        let departureAirport = req.body.departureAirport;
        let arrivalAirport = req.body.departureAirport;
        let departureTime = req.body.departureAirport;
        let arrivalTime = req.body.departureAirport;
        let travelTime = req.body.departureAirport;

        let returnAirline = req.body.returnAirline;
        let returnAirlineCode = req.body.returnAirlineCode;
        let returnAircraftCode = req.body.returnAircraftCode;
        let returnDepartureAirport = req.body.returnDepartureAirport;
        let returnDepartureTime = req.body.returnDepartureTime;
        let returnArrivalAirport = req.body.returnArrivalAirport;
        let returnArrivalTime = req.body.returnArrivalTime;
        let returnTravelTime = req.body.returnTravelTime;

        //console.log(departureAirport[0]);
        if(req.body.tripType === 'oneway') {
            console.log('user found');
            if(req.body.departureAirport.length) {
                db.outboundFavorite.findOrCreate({
                    where: {

                        tripType: req.body.tripType,
                        stops: req.body.stops,
                        totalTravelTime: req.body.totalTravelTime,
                        price: req.body.price,
                        airline1: airline[0],
                        airlineCode1: airlineCode[0],
                        aircraftCode1: aircraftCode[0],
                        departureAirport1: departureAirport[0],
                        departureTime1: departureTime[0],
                        arrivalAirport1: arrivalAirport[0],
                        arrivalTime1: arrivalTime[0],
                        travelTime1: travelTime[0],
                        airline2: airline[1],
                        airlineCode2: airlineCode[1],
                        aircraftCode2: aircraftCode[1],
                        departureAirport2: departureAirport[1],
                        departureTime2: departureTime[1],
                        arrivalAirport2: arrivalAirport[1],
                        arrivalTime2: arrivalTime[1],
                        travelTime2: travelTime[1],
                        airline3: airline[2],
                        airlineCode3: airlineCode[2],
                        aircraftCode3: aircraftCode[2],
                        departureAirport3: departureAirport[2],
                        departureTime3: departureTime[2],
                        arrivalAirport3: arrivalAirport[2],
                        arrivalTime3: arrivalTime[2],
                        travelTime3: travelTime[2]
                        // airline4: airline[3],
                        // airlineCode4: airlineCode[3],
                        // aircraftCode4: aircraftCode[3],
                        // departureAirport4: departureAirport[3],
                        // departureTime4: departureTime[3],
                        // arrivalAirport4: arrivalAirport[3],
                        // arrivalTime4: arrivalTime[3],
                        // travelTime4: travelTime[3],
                        // airline5: airline[4],
                        // airlineCode5: airlineCode[4],
                        // aircraftCode5: aircraftCode[4],
                        // departureAirport5: departureAirport[4],
                        // departureTime5: departureTime[4],
                        // arrivalAirport5: arrivalAirport[4],
                        // arrivalTime5: arrivalTime[4],
                        // travelTime5: travelTime[4]
                    }
                }).then(([favorite,created])=> {
                    user.addOutboundFavorite(favorite).then(()=> {
                        res.redirect(`/favorites`);
                    })
                //console.log(favorite)
                })
                .catch(error=> {
                    console.log('Error',error);
                    res.redirect('/error');
                })
            } else {
                db.outboundFavorite.findOrCreate({
                    where: {

                        
                        tripType: req.body.tripType,
                        stops: req.body.stops,
                        totalTravelTime: req.body.totalTravelTime,
                        price: req.body.price,
                        airline1: airline,
                        airlineCode1: airlineCode,
                        aircraftCode1: aircraftCode,
                        departureAirport1: departureAirport,
                        departureTime1: departureTime,
                        arrivalAirport1: arrivalAirport,
                        arrivalTime1: arrivalTime,
                        travelTime1: travelTime,
                    }
                }).then(([favorite,created])=> {
                    user.addOutboundFavorite(favorite).then(()=> {
                        res.redirect(`/favorites`);
                    })
                })
                .catch(error=> {
                    console.log('Error',error);
                    res.redirect('/error');
                })
            }
        } else if(req.body.tripType === 'return') {
            // create outbound favorite with inbound favorite 
            
            if(req.body.departureAirport.length) {
                db.outboundFavorite.findOrCreate({
                    where: {

                        tripType: req.body.tripType,
                        stops: req.body.stops,
                        totalTravelTime: req.body.totalTravelTime,
                        price: req.body.price,
                        airline1: airline[0],
                        airlineCode1: airlineCode[0],
                        aircraftCode1: aircraftCode[0],
                        departureAirport1: departureAirport[0],
                        departureTime1: departureTime[0],
                        arrivalAirport1: arrivalAirport[0],
                        arrivalTime1: arrivalTime[0],
                        travelTime1: travelTime[0],
                        airline2: airline[1],
                        airlineCode2: airlineCode[1],
                        aircraftCode2: aircraftCode[1],
                        departureAirport2: departureAirport[1],
                        departureTime2: departureTime[1],
                        arrivalAirport2: arrivalAirport[1],
                        arrivalTime2: arrivalTime[1],
                        travelTime2: travelTime[1],
                        airline3: airline[2],
                        airlineCode3: airlineCode[2],
                        aircraftCode3: aircraftCode[2],
                        departureAirport3: departureAirport[2],
                        departureTime3: departureTime[2],
                        arrivalAirport3: arrivalAirport[2],
                        arrivalTime3: arrivalTime[2],
                        travelTime3: travelTime[2]
                        // airline4: airline[3],
                        // airlineCode4: airlineCode[3],
                        // aircraftCode4: aircraftCode[3],
                        // departureAirport4: departureAirport[3],
                        // departureTime4: departureTime[3],
                        // arrivalAirport4: arrivalAirport[3],
                        // arrivalTime4: arrivalTime[3],
                        // travelTime4: travelTime[3],
                        // airline5: airline[4],
                        // airlineCode5: airlineCode[4],
                        // aircraftCode5: aircraftCode[4],
                        // departureAirport5: departureAirport[4],
                        // departureTime5: departureTime[4],
                        // arrivalAirport5: arrivalAirport[4],
                        // arrivalTime5: arrivalTime[4],
                        // travelTime5: travelTime[4]
                    }
                }).then(([favorite,created])=> {

                    console.log(favorite)
                    db.inboundFavorite.findOrCreate({
                        where: {
                            outboundFavoriteId: favorite.dataValues.id,
                            totalReturnTravelTime: req.body.totalReturnTravelTime,
                            returnStops: req.body.returnStops,
                            returnAirline1: returnAirline[0],
                            returnAirlineCode1: returnAirlineCode[0],
                            returnAircraftCode1: returnAircraftCode[0],
                            returnDepartureAirport1: returnDepartureAirport[0],
                            returnDepartureTime1: returnDepartureTime[0],
                            returnArrivalAirport1: returnArrivalAirport[0],
                            returnArrivalTime1: returnArrivalTime[0],
                            returnTravelTime1: returnTravelTime[0],
                            returnAirline2: returnAirline[1],
                            returnAirlineCode2: returnAirlineCode[1],
                            returnAircraftCode2: returnAircraftCode[1],
                            returnDepartureAirport2: returnDepartureAirport[1],
                            returnDepartureTime2: returnDepartureTime[1],
                            returnArrivalAirport2: returnArrivalAirport[1],
                            returnArrivalTime2: returnArrivalTime[1],
                            returnTravelTime2: returnTravelTime[1],
                            returnAirline3: returnAirline[2],
                            returnAirlineCode3: returnAirlineCode[2],
                            returnAircraftCode3: returnAircraftCode[2],
                            returnDepartureAirport3: returnDepartureAirport[2],
                            returnDepartureTime3: returnDepartureTime[2],
                            returnArrivalAirport3: returnArrivalAirport[2],
                            returnArrivalTime3: returnArrivalTime[2],
                            returnTravelTime3: returnTravelTime[2],
                            // returnAirline4: returnAirline[3],
                            // returnAirlineCode4: returnAirlineCode[3],
                            // returnAircraftCode4: returnAircraftCode[3],
                            // returnDepartureAirport4: returnDepartureAirport[3],
                            // returnDepartureTime4: returnDepartureTime[3],
                            // returnArrivalAirport4: returnArrivalAirport[3],
                            // returnArrivalTime4: returnArrivalTime[3],
                            // returnTravelTime4: returnTravelTime[3],
                            // returnAirline5: returnAirline[4],
                            // returnAirlineCode5: returnAirlineCode[4],
                            // returnAircraftCode5: returnAircraftCode[4],
                            // returnDepartureAirport5: returnDepartureAirport[4],
                            // returnDepartureTime5: returnDepartureTime[4],
                            // returnArrivalAirport5: returnArrivalAirport[4],
                            // returnArrivalTime5: returnArrivalTime[4],
                            // returnTravelTime5: returnTravelTime[4]
                        }
                    })
                    .then(([inboundFavorite,created])=> {
                        user.addInboundFavorite(favorite).then(()=> {
                            res.redirect(`/favorites`);
                        })
                    })
                })
                .catch(error=> {
                    console.log('Error',error);
                    res.redirect('/error');
                })
            } else {
                user.createOutboundFavorite({
                    userId: user.dataValues.id,
                    tripType: req.body.tripType,
                    stops: req.body.stops,
                    totalTravelTime: req.body.totalTravelTime,
                    price: req.body.price,
                    airline1: airline,
                    airlineCode1: airlineCode,
                    aircraftCode1: aircraftCode,
                    departureAirport1: departureAirport,
                    departureTime1: departureTime,
                    arrivalAirport1: arrivalAirport,
                    arrivalTime1: arrivalTime,
                    travelTime1: travelTime,
                }).then(favorite=> {
                    //console.log(favorite)
                    res.redirect(`/favorites`);
                })
                .catch(error=> {
                    console.log('Error',error);
                    res.redirect('/error');
                })
            }

        }
    
        
    })




})



module.exports = router;