// // Все операции с файлами производить с помощью билиотеки fs и асинхронных функций.
// // 1) создаём 2 папки, в одну папку кладём картинку,  например SVG-файл. Эту картинку перемещаем из одной папки в другую.


const fs = require('fs');

let temp = null;

fs.readFile('./folder1/2203950.svg', (err, data) => {
  if (!err) {
    temp = data;
    fs.writeFile('./folder2/2203950.svg', temp, (error) => {
      if (error) {
        console.log('fail');
      } else {
        console.log('success!');
        fs.unlink('./folder1/2203950.svg', (err2) => {
          if (err2) console.log(err2);
          else console.log('file in folder1 was deleted');
        });
      }
    });
  }
});
