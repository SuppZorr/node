module.exports = async (data, api, next) => {
  if( !data.message || data.message.text !== 'btn') {
    next();
    return;
  }

  const { chat, from } = data.message;

  const message = await api.sendMessage ({
    chat_id: chat.id,
    text: 'Hello world!',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Rules',
            url: 'http://telegra.ph/Pravila-chata-glovome-06-07',
          }, {
            text: 'GlovoINFORM',
            url: 'https://t.me/glovoinform',
          }
        ],

        [
          {
          text: 'дылдаки',
          url: 'http://telegra.ph/Pravila-chata-glovome-06-07',
          }, {
            text: 'пиструны',
            url: 'https://t.me/glovoinform',
          }, {
            text: 'вагины',
            url: 'https://t.me/glovoinform',
          }
        ],

      ]
    }
  });

  setTimeout(() => {
    api.deleteMessage({
      chat_id: message.chat.id,
      message_id: message.message_id
    })
  }, 5000);

  next();
}


