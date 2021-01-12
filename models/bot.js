// модель ботов. Боты которые регистрируют люди, попадают сюда
const path = require('path');
const mongoose = require('mongoose');

// Подключаем модели на которые существует ref. Может случиться что они еще не подключены
require('models/user');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  title: { // имя бота для админки
    type: Schema.Types.String,
    default: '',
    minLength: 0,
    maxLength: 255,
  },
  provider: { // тип бота, телеграм или другой
    type: Schema.Types.String,
    enum: ['telegram'],
    require: true
  },
  token: { // тип бота, телеграм или другой
    type: Schema.Types.String,
    require: true
  },
  owner: { // владелей бота
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true
  }


  firstname: { // владелей бота
    type: Schema.Types.String,
  },
  lastname: { // владелей бота
    type: Schema.Types.String,
  },
  hashpwd: { // владелей бота
    type: Schema.Types.String,
  }




}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


generalSchema.statics.findByOwner = async function(id) {
  // this === BotModel
  return await this.findOne({ owner: id });
}


generalSchema.methods.checkpwd = function(val) {
  const hash = crypto(this.hashpwd) // какаято функция хеширования
  return val === hash;
}

generalSchema.virtual('password')
  .get(function(val) {
    const hash = crypto(val) // какаято функция хеширования
    this.hashpwd = hash
  });




generalSchema.methods.findSimilarTypes = function(err) {
  const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
  return model;

  console.log(this.title); // title
  this.create() // X
}

generalSchema.statics.findSimilarTypes = function(err) {
  console.log('а чо бля нах. Данных еще нет');
  this.create() // V
}


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;
