const express = require('express');

const router = express.Router();
const botCtrl = require('controllers/bot')

router.get('/add', async (req, res) => {

  // добавить бот
  const owner = '5ff0371a12387033b0f23997'; // это айди Alex Litv
  const title = 'тестовый бот';
  const token = '1396542865:AAEiDgv6YK1KEbcQEXuS6cC_yoqb9yjZKWg'; // Это токе тестового бота, который мы ранее получили от телеграма

  await botCtrl.telegram.addBot(title, owner, token);

  res.json({ status: 'ok' });
});

router.get('/remove', async (req, res) => {

  // удалить бот
  const id = '';
  await botCtrl.telegram.removeBot(  );

  res.json({ status: 'ok' });
});

module.exports = router;
