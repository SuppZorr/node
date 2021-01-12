module.exports = async (data, api, next) => {
  const { chat, from, text } = data.message;

  if (text !== 'піструн') {
    next();
    return;
  }

  const res = await api.sendMessage({
    chat_id: chat.id,
    text: `${from.first_name} ${from.last_name} не ругайся!`
  });
}
