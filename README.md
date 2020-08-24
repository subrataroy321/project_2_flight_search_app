# CHEAP FLIGHT SEARCH

[Access Cheap Flight Search Here](https://cheap-flight-search.herokuapp.com/)

This is my project 2 for building a full stack application. 

## Application Overview: 

* Search Page:
    </br>
    <img src="./searchPage.png">

* Search Results (Examples):
    </br>
    <img src="./searchResult.png">


## Applications Used:
* `JavaScript Vanila`
* `node modules`
* `CSS`
* `VS Code`
* `Heroku for Deploying it on the internet`

## Node Modules Used for building this application:
* `chai`
* `mocha`
* `supertest`
* `axios`
* `bcrypt`
* `connect-flash`
* `connect-session-sequelize`
* `dotenv`
* `ejs`
* `express`
* `express-ejs-layouts`
* `express-session`
* `method-override`
* `morgan`
* `passport`
* `passport-local`
* `pg`
* `sequelize`
* `airport-autocomplete-js`
* `sequelize-cli`
* `emailjs-com --save`

## API Used:
* [amadeus](https://developers.amadeus.com/self-service/apis-docs)
* [airlabs](http://airlabs.co/#/get_started)
* [EmailJs](https://www.emailjs.com/docs/)

## Routes:

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | server.js | Home page/SearchPage |
| GET | /search | search.js | Search Result Page |
| GET | /favorites | favorites.js | Favorite Page |
| POST | /favorites/id/add | favorites.js | Add itinaries to Favorite |
| DELETE | /favorites/delete/id | favorites.js | Delete itinaries from Favorite |
| GET | /auth/login | auth.js | Login form |
| GET | /auth/signup | auth.js | Signup form |
| POST | /auth/login | auth.js | Login user |
| POST | /auth/signup | auth.js | Creates User |
| GET | /auth/logout | auth.js | Removes session info |
| GET | /profile | server.js | Regular User Profile |
| PUT | /profile/changePassword | server.js | to change user Password |
| GET | /contact | server.js | contact Page |
| GET | /error | server.js | Error Page |

</br>
</br>

## ERD:
</br>
<img src="./FlightSearch1.png">

</br>
</br>

## Steps to use in local machine

1. [Click here](https://github.com/subrataroy321/project_2_flight_search_app) to `Fork` and `Clone` the repo into local machine. 
2. [Click Here](https://www.postgresql.org/download/) to Download and Install PostgresSQL.
3. open iTerm or Terminal and cd into the cloned repo.
4. Install node modules from the package.json. Simply run `npm install` or `npm i` on iTerm/Terminal.
5. Create a local database for this project. Use this `sequelize db:create` command to create a database.
6. `sequelize model:create` use this sequelize command to create a model.
7. Run `sequelize db:migrate` to migrate the model into database. 
8. Add a .env file with the following fields:
* SESSION_SECRET: Can be any random string; usually a hash in production
* API_KEY: get an api key from [amadeus](https://developers.amadeus.com/self-service/apis-docs)
* API_SECRET: get an api secret from [amadeus](https://developers.amadeus.com/self-service/apis-docs)
* AIR_LAB_API_KEY: get an api key from [airlabs](http://airlabs.co/#/get_started)
* EMAILJS_USER_ID: get an user id from [EmailJs](https://www.emailjs.com/docs/)
9. Run server using following commands.
`nodemon`
or
`node index.js`
10. on your browser open `http://localhost:3000` to use the application.
    

## Code Snippets:

```js
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
                if (req.user) {
                    res.render('search',{resultData: resultData , queryData: req.query, user: req.user, airlineNames: airlineNames});
                } else {
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
```


## Thanks to owner and developer for the 404 Error Page 
[Codepen Link](https://codepen.io/subrataroy/pen/Vwajbpe)

## Special Thanks to all IA's and TA's.

## Author:

Subrata Roy </br>
@ General Assembly Student</br>
Connect [github](https://github.com/subrataroy321) - [linkedIn](https://www.linkedin.com/in/subrataroy321/)

