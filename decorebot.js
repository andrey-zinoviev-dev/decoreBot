const express = require("express");
const { Bot, InlineKeyboard, Keyboard } = require("grammy");
const { Menu } = require("@grammyjs/menu");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const bot = new Bot(process.env.token);

//Initial Keyboard
const keyboard = new Keyboard()
.text("Я- покупатель")
.text("Я- дизайнер").row()
.text("Правила площадки")
.text("Частые вопросы и ответы")
.text("Галерея")
.resized();

//commands
bot.api.setMyCommands([
    {
        command: "start",
        description: "Начать диалог сначала"
    },
    {
        command: "help",
        description: "Что можно в боте делать?"
    },
    {
        command: "rules",
        description: "Правила Moghen-Tokhen",
    },
    {
        command: "faq",
        description: "Частые вопросы и ответы на них"
    }
]);

//menu
const mainMenu = new Menu("welcome-menu")
// .submenu
.submenu("Вы- покупатель?", "buyer_menu")
.submenu("Вы- дизайнер?", "designer_menu")

const buyerMenu = new Menu("buyer_menu")
.text("Где купить?", (ctx) => {
    ctx.reply("Купить можно на сайте");
    // ctx.menu.update();
})
.text("Как происходит доставка?", (ctx) => {
    ctx.reply("Есть самовывоз, есть доставка, есть заказ из-за рубежа");
    // ctx.menu.update();
})
.back("Назад");

const designerMenu = new Menu("designer_menu")
.text("Условия размещения товара", (ctx) => {
    ctx.reply("На октябре");
    // ctx.menu.update();

})
.text("Оформление вашего профиля на плафторме", (ctx) => {
    ctx.reply("Фото вас, концепция вашей деятельности, узнать, чем вы занимаетесь");
    // ctx.menu.update();
})
.back("Назад");



//activate menu
// bot.use(buyerMenu);
// bot.use(designerMenu);
mainMenu.register([buyerMenu, designerMenu]);
bot.use(mainMenu);


bot.command("start", (ctx) => {
    ctx.reply("Приветствуем Вас, дорогой гость! Готовы помочь с выбором предмета дизайна, который добавит приятных ноток в вашу жизнь! Давайте вместе создадим уникальный интерьер!", {
        reply_markup: keyboard,
    });
});

bot.start()

app.listen(3000, () => {
    console.log("server is up and running");
})