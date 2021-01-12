const natural = require('natural');
console.log(natural.JaroWinklerDistance('1хуй', 'хуйово'));
console.log(natural.JaroWinklerDistance('1хуйово', 'хуй'));
console.log(natural.LevenshteinDistance('1хуй', 'хуйово'));
console.log(natural.LevenshteinDistance('1хуйово', 'хуй'));


module.exports = async (data, api, next) => {
  if( !data.message) {
    next();
    return;
  }

  const messages = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': ' ',
  }

  const { chat, from, text } = data.message;
  if( 
    !messages[text]
    || messages[text].trim() === ''
  ) {
    console.log('ді нахуй')
    next();
    return;
  }

  const res = await api.sendMessage({
    chat_id: chat.id,
    // text: `Hi ${from.first_name} ${from.last_name}`
    text: messages[text]
  }).catch(err => {
    console.log('err', err);
  })
}
