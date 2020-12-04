var express = require('express');
var router = express.Router();
const axios = require('axios');
const { response } = require('express');


const info = {
  data : "",
  loaderstyle : "display: none",
  selectedRb: "",
}

let countriesArr = [];
let catsArr = [];
let unitedArr = [];

const country = async () => {
  let temp = await axios.get('https://restcountries.eu/rest/v2/all');
  temp = temp.data;
  let temp2 = temp.map(el => {
    return  {flag: el.flag,
            name: el.name,
            region: el.region,
               }
   });
   countriesArr = temp2;
};

const catsGetImages = async () => {
  let arrayOfPromises = catsArr.map( el  => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${el.id}`)
  });
  await Promise.all(arrayOfPromises)
  .then(res => {
    catsArr.forEach( (el, index) => {
      el.image = res[index].data[0].url
    });
  });
};

const cats = async () => {
  let temp = await axios.get('https://api.thecatapi.com/v1/breeds');
  temp = temp.data;
  let temp2 = temp.map(el => {
    let orgn = el.origin;
    switch(orgn) {
      case 'United States': orgn ='United States of America';
      break;
      case  'Russia': orgn ='Russian Federation';
      break;
      case 'United Kingdom': orgn ='United Kingdom of Great Britain and Northern Ireland';
      break;
      case 'Iran (Persia)': orgn ='Iran (Islamic Republic of)';
      break;
      case 'Burma': orgn ='Myanmar';
      break;
      default:
        orgn = el.origin;
    };
    return  {id: el.id,
            name: el.name,
            origin: orgn 
            };
    });
    catsArr = temp2;
};

const catsGetFlags = () => {
  unitedArr = catsArr.map((element) => {
    let common = countriesArr.find((obj) => obj.name === element.origin);
    let flagValue;
    let regionValue;
    if (common) { flagValue =  common.flag;
    regionValue = common.region}
    else {flagValue = "";
  regionValue = ""};
    return {
      id : element.id,
      name: element.name,
      origin: element.origin,
      image: element.image,
      flag: flagValue,
      region: regionValue,
    };
  });
};

const getStrForRender = (reg) => {

  let tempArr = [];

  unitedArr.forEach( el => {
  let common = tempArr.find((obj) => obj.name === el.origin);
  if (common) {1}
  else {
  let temp = {
     name: el.origin,
     flag: el.flag,
     region: el.region,
     cats: [],
   };
   tempArr.push(temp);
  };
 });
  
 catsArr.forEach( el => {
  let x = tempArr.find(item => item.name === el.origin);
  let y = {
    name: el.name,
    image: el.image,
  };
  x.cats.push(y);

 });

 
 let resultArr;

  if (reg === 0) { resultArr = tempArr }
  else { resultArr = tempArr.filter( (el) => {
    return el.region === reg
  })
  };

  console.log(resultArr);


  info.data = resultArr.reduce((total, el) => {
    let cats = '';
    for (i=0; i<el.cats.length; i++) {
    cats += `<div class="cat"> <img class="catimage" src=${el.cats[i].image}> </img> <div>${el.cats[i].name} </div>  </div>`;
    }
    
      return total+=  `<div class="country"><div class="main"><p><b>${el.name}</b> </p> <img class="flag" src=${el.flag}> </img> </div> <div class="catsinfo">  ${cats}   </div> </div>`
    }, "");


  console.log(info.data.length);
};





const mainFunction = async (reg=0) => {
  await Promise.all([country(),cats()]);
  await catsGetImages();
  await catsGetFlags();
  getStrForRender(reg);
  console.log("reg",reg);
}



/* GET home page. */
router.get('/', async function(req, res, next) {
  await mainFunction();
  res.render('index', info);
  info.data = "";
});


router.get('/:reg', async function(req, res, next) {
  info.selectedRb = req.params.reg;
  await mainFunction(req.params.reg);
  res.render('index', info);
  info.data = "";

});

















































// router.get('/', function(req, res, next) {
//   axios.get('https://restcountries.eu/rest/v2/all')
//   .then(res1 => {
//     return res1.data;
//   })
//   .then(res2 => {
//     return newArr = res2.map(el => {
//       return  {flag: el.flag,
//                name: el.name,
//                capital: el.capital,
//                region: el.region,
//                population: el.population,
//                }
//     });
//   })
//   .then(res3 => {
//     info.data = res3.reduce( (total, el) => {
//       return total+=  `<div class="country"><div class="main"><p><b>${el.name}</b> </p> <img class="flag" src=${el.flag}> </img> </div> <div class="info">   <ul><li>Capital: ${el.capital} </li> <li>Region: ${el.region} </li> <li>Population: ${el.population} </li></ul> </div> </div>`
//     }, "");

//     res.render('index', info );
//   })
//   .catch(err => console.log(err.response.status));

// });



// router.get('/:name', function(req, res, next) {
//   axios.get(`https://restcountries.eu/rest/v2/region/${req.params.name}`)
//   .then(res1 => {
//     return res1.data;
//   })
//   .then(res2 => {
//     return newArr = res2.map(el => {
//       return  {flag: el.flag,
//                name: el.name,
//                capital: el.capital,
//                region: el.region,
//                population: el.population,
//                }
//     });
//   })
//   .then(res3 => {
//     info.data = res3.reduce( (total, el) => {
//       return total+=  `<div class="country"><div class="main"><p><b>${el.name}</b> </p> <img class="flag" src=${el.flag}> </img> </div> <div class="info">   <ul><li>Capital: ${el.capital} </li> <li>Region: ${el.region} </li> <li>Population: ${el.population} </li></ul> </div> </div>`
//     }, "");
//     info.selectedRb = req.params.name;
//     res.render('index', info );
//   })
//   .catch(err => console.log(err.response.status));




// });








module.exports = router;
