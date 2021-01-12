// модель оплаты
const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  items: [{ // собственно масив заказаных позиций
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    amount: {
      type: Schema.Types.Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    }
  }],
  sign: {
    type: Schema.Types.String,
    default: '',
    minLength: 0,
    maxLength: 255,
  }
}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
