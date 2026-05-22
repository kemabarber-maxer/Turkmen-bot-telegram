import { Bot } from "grammy";

const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");

const jogaplar = {
  "salam": "Salam! men online dal bolsam sms yazyn +99362237781",
  "nähili": "Men gowy, sag bolun!",
  "bahasy": "50 manatdan baslayar.",
  "wagt": "Asgabat wagty: " + new Date().toLocaleString("tk-TM", {timeZone: "Asia/Ashgabat"}),
  "komek": "Komandalar: /salam /baha /wagt /komek"
};

bot.command("start", (ctx) => ctx.reply("Hos geldiniz! /komek basin."));
bot.command("salam", (ctx) => ctx.reply(jogaplar.salam));
bot.command("baha", (ctx) => ctx.reply(jogaplar.bahasy));
bot.command("wagt", (ctx) => ctx.reply(jogaplar.wagt));
bot.command("komek", (ctx) => ctx.reply(jogaplar.komek));

bot.on("message:text", (ctx) => {
  const t = ctx.message.text.toLowerCase();
  for (const [k, j] of Object.entries(jogaplar)) {
    if (t.includes(k)) return ctx.reply(j);
  }
  ctx.reply("Dusunmedim. /komek basin.");
});

bot.start();
console.log("Bot isleyar!");
