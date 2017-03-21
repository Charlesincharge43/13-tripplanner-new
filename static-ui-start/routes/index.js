const router = require('express').Router();
const { db, Place, Hotel, Restaurant, Activity } = require('../db');


let dbholder = {};

router.get('/', function(req, res, next){
  // Place.findAll({}).then(function(results){
  //     // console.log(results[0].toJSON());
  //     return res.render('index', {results: results});
  // })
  Hotel.findAll({})//*** don't forget to pass in empty object EDIT: apparently not?
    .then(hotelArr => {
      dbholder.hotels = hotelArr;
      return Restaurant.findAll({});
    })
    .then(restaurantArr => {
      dbholder.restaurants = restaurantArr;
      return Activity.findAll({});
    })
    .then(activityArr => {
      dbholder.activities = activityArr;
      res.render('index', {
        templateHotels: dbholder.hotels,
        templateRestaurants: dbholder.restaurants,
        templateActivities: dbholder.activities
      })
    })
    .catch(err => console.log(err));
})


module.exports = router
