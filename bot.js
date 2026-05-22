import { Bot } from "grammy";
‎
‎const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");
‎
‎const jogaplar = {
‎  "salam": "Salam! men online dal bolsam +99362237781 jan edin",
‎  "nähili": "Men gowy, sag boluň!",
‎  "bahasy": "50 manatdan başlaýar.",
‎  "wagt": "Aşgabat wagty: " + new Date().toLocaleString("tk-TM", {timeZone: "Asia/Ashgabat"}),
‎  "kömek": "Komandalar: /salam /baha /wagt /kömek"
‎};
‎
‎bot.command("start", (ctx) => ctx.reply("Hoş geldiňiz! /kömek basyň."));
‎bot.command("salam", (ctx) => ctx.reply(jogaplar.salam));
‎bot.command("baha", (ctx) => ctx.reply(jogaplar.bahasy));
‎bot.command("wagt", (ctx) => ctx.reply(jogaplar.wagt));
‎bot.command("kömek", (ctx) => ctx.reply(jogaplar.kömek));
‎
‎bot.on("message:text", (ctx) => {
‎  const t = ctx.message.text.toLowerCase();
‎  for (const [k, j] of Object.entries(jogaplar)) {
‎    if (t.includes(k)) return ctx.reply(j);
‎  }
‎  ctx.reply("Düşünmedim. /kömek basyň.");
‎});
‎
‎bot.start();
‎console.log("Bot işleýär!");
