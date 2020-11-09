// 1) создать сайт с ссылкой "обновить картинку", после нажатия каждый раз выводится случайная картинка, dog.ceo
// 2) создать массив ссылок на случайные картинки, 30 штук. Вывести массив в консоль.
// 3) массив преобразовать в массив объектов картинок: { id, url, download_time, breed }, породу взять из ссылки
// 4) в объекты массива добавить свойство размера картинки. Отсортировать массив по времени загрузки.

const http = require('http');
const request = require('request');
const fs = require('fs');
const { Buffer } = require('buffer');

const url = 'https://dog.ceo/api/breeds/image/random';
const PORT = 3000;
let html = {};
let pic = '';


http.createServer((req, res) => {
  console.log('req.url:', req.url);
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<a href="/a">показатьть  собачку</a><br><a href="/b">30  собак</a>', 'utf-8');
    res.end();
  } else if (req.url === '/a') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    request(url, (error, response, body) => {
      html = JSON.parse(body);
      if (html.status === 'success') {
        pic = html.message;
      } else {
        pic = 'error';
      }
      res.write(`<a href="/a">показатьть  собачку</a><br><a href="/b">30  собак</a><br><img src="${pic}">`);
      res.end();
    });
  } else if (req.url === '/b') {
      //задания 2,3,4 будут выполнены в теле этого ответа.
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const dogsArr = [];
    const dogsDownloadTimeArr = [];
    const dogsPicSizeArr = [];
    const dogsObj = [];
    //отправляем 30 запросов, записываем ссылки картинок в массив dogsArr.
    for (let i = 0; i < 30; i++) {
      request(url, (error, response, body) => {
        html = JSON.parse(body);
        if (html.status === 'success') {
          pic = html.message;
          dogsArr.push(pic);
        } else {
          pic = 'error';
        }
    // как только в массиве dogsArr будет 30 ссылок, запустится функция подсчета времени загрузки каждой картинки
        dogsArr.length === 30 ? getDownloadTime(dogsArr) : dogsArr;
      });
    }
   // функция загрузки каждой картинки, записываем в массив dogsDownloadTimeArr.
    const getDownloadTime = (item) => {
      for (let i = 0; i < item.length; i++) {
        const startTime = new Date().getTime();
        request(item[i], (error, response, body) => {
          //получаем размер каждой картинки, записываем в массив dogsPicSizeArr
          dogsPicSizeArr.push(Buffer.byteLength(body));
          const endTime = new Date().getTime();
          dogsDownloadTimeArr.push(endTime - startTime);
          //как только массив dogsDownloadTimeArr будет заполнен, запускаем функцию превращения массива в массив обьектов.
          dogsDownloadTimeArr.length === 30 ? transform(dogsArr) : dogsDownloadTimeArr;
        });
      }
    };

    // функция обрезает ссылку картинки, вытягивает название породы.
    const dogBreed = (item) => {
      const lastSlash = item.lastIndexOf('/');
      const temp = item.slice(30, lastSlash);
      return temp;
    };

    // превращение массива в массив обьектов
    const transform = (arr) => {
        //вывод в консоль массива 30 ссылок на собак
      console.log(dogsArr);
      //проход по массиву dogsArr, превращение каждого элемента в обьект с помощью элементов с еще 2 массивов - с временем загрузки и с размером картинки.
      arr.forEach((element, index) => {
        const dog = new Object();
        dog.id = index + 1;
        dog.url = element;
        dog.download_time = dogsDownloadTimeArr[index];
        dog.breed = dogBreed(element);
        dog.pic_size = dogsPicSizeArr[index];
        dogsObj.push(dog);
      });
      console.log(dogsObj);
    };


    res.end();
  }
}).listen(PORT);
