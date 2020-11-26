var express = require('express');
var router = express.Router();
const axios = require('axios');


const info = {
  data : "",
  loaderstyle : "display: none",
  selectedRb: "",
}


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(res1 => {
    return res1.data;
  })
  .then(res2 => {
    return newArr = res2.map(el => {
      return  {flag: el.flag,
               name: el.name,
               capital: el.capital,
               region: el.region,
               population: el.population,
               }
    });
  })
  .then(res3 => {
    info.data = res3.reduce( (total, el) => {
      return total+=  `<div class="country"><div class="main"><p><b>${el.name}</b> </p> <img class="flag" src=${el.flag}> </img> </div> <div class="info">   <ul><li>Capital: ${el.capital} </li> <li>Region: ${el.region} </li> <li>Population: ${el.population} </li></ul> </div> </div>`
    }, "");

    res.render('index', info );
  })
  .catch(err => console.log(err.response.status));

});



router.get('/:name', function(req, res, next) {
  axios.get(`https://restcountries.eu/rest/v2/region/${req.params.name}`)
  .then(res1 => {
    return res1.data;
  })
  .then(res2 => {
    return newArr = res2.map(el => {
      return  {flag: el.flag,
               name: el.name,
               capital: el.capital,
               region: el.region,
               population: el.population,
               }
    });
  })
  .then(res3 => {
    info.data = res3.reduce( (total, el) => {
      return total+=  `<div class="country"><div class="main"><p><b>${el.name}</b> </p> <img class="flag" src=${el.flag}> </img> </div> <div class="info">   <ul><li>Capital: ${el.capital} </li> <li>Region: ${el.region} </li> <li>Population: ${el.population} </li></ul> </div> </div>`
    }, "");
    info.selectedRb = req.params.name;
    res.render('index', info );
  })
  .catch(err => console.log(err.response.status));




});











module.exports = router;
