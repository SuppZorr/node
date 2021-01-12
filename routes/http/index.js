const express = require('express');

const router = express.Router();
// const articleController = require('controllers/article')

// const Ajv = require('ajv');
// const testSchema = require('schemas/routes/test');

router.get('/', (req, res) => {
  res.json({
    status: 'ok', payload: 'Hello. I`m API server',
  });
});

module.exports = router;
