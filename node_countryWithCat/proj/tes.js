const axios = require('axios');
let catsArr = [];

const cats = async () => {
    let temp = await axios.get('https://api.thecatapi.com/v1/breeds');
    catsArr = temp.data.map(el => {
      return  {id: el.id,
              name: el.name,
              }
      });
};

const catsGetImages = async () => {
    await cats();
    let arrayOfPromises = catsArr.map( el  => {
      return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${el.id}`)
    });
  
    await Promise.all(arrayOfPromises)
    .then(res => {
      catsArr.forEach( (el, index) => {
        el.image = res[index].data[0].url;
        delete el.id;
      });
    });
    console.log(catsArr);
  };

  catsGetImages();