const http = require('http');
const request = require('request');
const fs = require('fs');

const PORT = 3000;
const url = 'https://auto.ria.com/uk/search/?category_id=1&marka_id=2233&model_id=0&city%5B0%5D=0&state%5B0%5D=0&s_yers%5B0%5D=0&po_yers%5B0%5D=0&price_ot=&price_do=';
let html = '';
const tempArr = [];
let tempStr = '';
const allCarsWithStats = [];

request(url, (error, response, body) => {
  console.error('error:', error);
  console.log('statusCode:', response.statusCode);
  html = body;


  const start = '<';
  const end = '>';
  let cut = false;

  for (i = 0; i < html.length; i++) {
    if ((html[i] === start) || (html[i] === end)) {
      cut = !cut;
    }

    tempStr += html[i];

    if (cut) {
      tempArr.push(tempStr);
      tempStr = '';
      cut = !cut;
    }
  }

  const carsArr = [];
  tempArr.forEach((element) => {
    if ((element[0] === 'T') && (element.length < 50) && (element.length > 10)) {
      carsArr.push(element.slice(0, -1));
    }
  });

  // console.log(carsArr);

  const carsYear = [];
  tempArr.forEach((el) => {
    if ((el.length === 7) && (el[0] === ' ') && (el[1] === '2')) {
      carsYear.push(Number(el.slice(0, -1)));
    }
  });

  // console.log(carsYear);

  const carsUSD = [];
  tempArr.forEach((el) => {
    if (((el.length === 7) && (el[2] === ' ') && (el[0] !== ' ') && (el[3] !== ' ')) || (el.length === 8) && (el[3] === ' ') && (el[0] !== '+') && (el[0] === '1') && (el[2] !== ' ')) {
      carsUSD.push(el.slice(0, -1));
    }
  });


  const carsUSDformated = carsUSD.map((element) => {
    if (element.length === 6) {
      return Number(element.slice(0, 2) + element.slice(3, 6));
    }
    return Number(element.slice(0, 3) + element.slice(4, 7));
  });


  const carsUAH = [];
  tempArr.forEach((el) => {
    if ((el.length === 10) && (el[1] === ' ') && (el[5] === ' ') && (el[0] !== '\n') && (el[0] !== ' ')) {
      carsUAH.push(el.slice(0, -1));
    } else if ((el.length === 8) && (el[3] === ' ') && (el[0] !== '+') && (el[0] !== '1') && (el[0] !== '2') && (el[2] !== ' ')) {
      carsUAH.push(el.slice(0, -1));
    }
  });


  const carsUAHformated = carsUAH.map((elem) => {
    if (elem.length === 9) {
      return Number(elem[0] + elem.slice(2, 5) + elem.slice(6, 9));
    } return Number(elem.slice(0, 3) + elem.slice(4, 7));
  });


  for (let i = 0; i < carsArr.length; i++) {
    const temp = [carsArr[i], carsYear[i], carsUSDformated[i], carsUAHformated[i]];
    allCarsWithStats[i] = temp;
  }

  console.table(allCarsWithStats);
  saveFile('ria');
  console.log(createTable(allCarsWithStats));
});

// 2) Написать функцию, которая генерирует текущую дату в формате строки 'YYYYMMDD-HHmmSS',
// YYYY-год, MM-месяц, DD-день, HH-час, mm-минуты, SS-секунды.


const timeStamp = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const sec = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hour}${min}${sec}`;
};

// console.log(timeStamp());


// 3) Написать функцию формирования CSV файла из массива, разделитель точка с запятой (";"), текст в двойных кавычках

const writeCsv = (massive) => {
  let content = '';

  massive.forEach((element) => {
    element.forEach((el) => {
      if (element.indexOf(el) === 0) {
        content += `"${el}"` + ';';
      } else {
        content += `${el};`;
      }
    });
    content += '\n';
  });

  return content;
};

// writeCsv(allCarsWithStats);


// 4) Написать функцию сохранения файла CSV на диск, аргументы (name, str с задания 3), при этом обязательно использовать конструкцию try-catch, формат файла должен быть name_YYYYMMDD-HHmmSS.csv.

const saveFile = (name) => {
  const fileName = `${name}_${timeStamp()}.csv`;
  try {
    fs.writeFileSync(fileName, writeCsv(allCarsWithStats));
  } catch (error) {
    console.log(error);
  }
};


// 5) Написать функцию формирования строки для вставки таблицы в html, теги <table></table>,
// входной параметр- массив

const createTable = (arr) => {
  let str = '<table>';
  let temp = '';
  arr.forEach((elem) => {
    elem.forEach((el) => {
      temp += `<td>${el}</td>`;
    });
    str += `<tr>${temp}</tr>`;
    temp = '';
  });
  str += '</table>';
  return str;
};


// 6) Запустить сервер, который:
// при обычном запросе пишет только ссылку <a href='/tesla'>обновить данные по Тесле</a>
// При нажатии на эту ссылку на странице появляется:
// * строка: ссылка <a href='/tesla'>обновить данные по Тесле</a>
// * таблица с актуальными данными
// * строка: ссылка на скачивание актуального csv-файла (например, tesla_20201031-145233.csv)


// простой сервер, на котором будут наши все функции


http.createServer((req, res) => {
  console.log('req.url:', req.url);
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<a href="./index.html">обновить данные по Тесла</a>', 'utf-8');
  } else {
    res.write('<b>none</b>');
  }
  res.end();
}).listen(PORT);
