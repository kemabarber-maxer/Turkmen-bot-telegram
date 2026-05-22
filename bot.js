import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");
const ADMIN_ID = "kemabest77";

const ucPrices = [
  { uc: 60, tmt: 23 },
  { uc: 120, tmt: 46 },
  { uc: 325, tmt: 105 },
  { uc: 385, tmt: 128 },
  { uc: 660, tmt: 210 },
  { uc: 720, tmt: 256 },
  { uc: 1320, tmt: 420 },
  { uc: 1800, tmt: 520 },
  { uc: 3850, tmt: 1390 },
  { uc: 8100, tmt: 2000 },
];

const vpnTypes = [
  { name: "Happ", icon: "📱" },
  { name: "Shadowsocks", icon: "🌐" },
  { name: "Outline", icon: "🔐" },
];

const mainMenu = new InlineKeyboard()
  .text("💎 UC satyn al", "uc_menu").row()
  .text("🔒 VPN satyn al", "vpn_menu").row()
  .text("🛒 Sargyt et", "order").row()
  .text("👤 Sahsy otag", "personal").row()
  .text("📞 Habarlas", "contact").row()
  .text("💰 Bal topla", "balance").row()
  .text("⬇️ Menyu", "menu");

function ucMenu() {
  const keyboard = new InlineKeyboard();
  ucPrices.forEach((item, index) => {
    keyboard.text(
      `${item.uc} UC — ${item.tmt} TMT`,
      `uc_${item.uc}_${item.tmt}`
    );
    if ((index + 1) % 2 === 0) keyboard.row();
  });
  keyboard.row().text("⬇️ Yza", "back");
  return keyboard;
}

function vpnMenu() {
  const keyboard = new InlineKeyboard();
  vpnTypes.forEach((type) => {
    keyboard.text(`${type.icon} ${type.name}`, `vpn_${type.name}`).row();
  });
  keyboard.text("⬇️ Yza", "back");
  return keyboard;
}

function vpnPaymentMenu(type) {
  return new InlineKeyboard()
    .text("📅 Aylyk — 80 TMT", `vpn_${type}_monthly`).row()
    .text("📆 Hepde — 30 TMT", `vpn_${type}_weekly`).row()
    .text("⬇️ Yza", "vpn_menu");
}

bot.command("start", async (ctx) => {
  const user = ctx.from;
  await ctx.reply(
    "🎉 *Kema Hyzmatlar*\\n\\n" +
    "Hos geldiniz! Neme satyn almak isleyarsiniz?\\n\\n" +
    `👤 *ID-niz:* ${user.id}\\n` +
    `💰 *Elyeter:* 0.0 TMT\\n` +
    `🧊 *Dondurulan:* 0.0 TMT`,
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenu
    }
  );
});

bot.command("uc", async (ctx) => {
  let text = "💎 *UC Bahalary:*\\n\\n";
  ucPrices.forEach(item => {
    text += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
  });
  text += "\\n🛒 Sargyt etmek ucin UC saylan:";
  
  await ctx.reply(text, { 
    parse_mode: "Markdown",
    reply_markup: ucMenu()
  });
});

bot.command("vpn", async (ctx) => {
  await ctx.reply(
    "🔒 *VPN Hyzmatlary:*\\n\\n" +
    "Hyzmat saylan:",
    { 
      parse_mode: "Markdown",
      reply_markup: vpnMenu()
    }
  );
});

async function sendAdminOrder(ctx, product, price, details = "") {
  const user = ctx.from;
  const now = new Date().toLocaleString("tk-TM", {
    timeZone: "Asia/Ashgabat",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short"
  });
  
  const adminMessage = 
    `📦 *Taze sargyt!*\\n\\n` +
    `👤 *Musteri:* ${user.first_name || "Belli dal"}\\n` +
    `🆔 *ID:* ${user.id}\\n` +
    `📱 *Telefon:* +993XXXXXXXX\\n` +
    `👤 *Username:* @${user.username || "Yok"}\\n\\n` +
    `📦 *Haryt:* ${product}\\n` +
    `💰 *Baha:* ${price} TMT\\n` +
    `${details ? `📝 *Maglumat:* ${details}\\n` : ""}` +
    `⏰ *Wagt:* ${now}`;
  
  try {
    await bot.api.sendMessage(ADMIN_ID, adminMessage, { parse_mode: "Markdown" });
  } catch (e) {
    console.log("Admin SMS yollanmady:", e.message);
  }
}

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const user = ctx.from;
  
  switch(data) {
    case "uc_menu":
      let ucText = "💎 *UC Bahalary:*\\n\\n";
      ucPrices.forEach(item => {
        ucText += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
      });
      ucText += "\\n🛒 Sargyt etmek ucin UC saylan:";
      
      await ctx.editMessageText(ucText, { 
        parse_mode: "Markdown",
        reply_markup: ucMenu()
      });
      break;
      
    case "vpn_menu":
      await ctx.editMessageText(
        "🔒 *VPN Hyzmatlary:*\\n\\n" +
        "Hyzmat saylan:",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnMenu()
        }
      );
      break;
      
    case "order":
      await ctx.editMessageText(
        "🛒 *Sargyt etmek*\\n\\n" +
        "Sargyt etmek ucin asakdaky maglumatlary iberin:\\n\\n" +
        "1️⃣ Harydyn ady (UC / VPN)\\n" +
        "2️⃣ Mocberi\\n" +
        "3️⃣ Telefon belginiz",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .text("💎 UC sayla", "uc_menu").row()
            .text("🔒 VPN sayla", "vpn_menu").row()
            .text("⬇️ Menyu", "menu")
        }
      );
      break;
      
    case "personal":
      const refLink = `https://t.me/${ctx.me.username}?start=${user.id}`;
      await ctx.editMessageText(
        "👤 *Sahsy otag*\\n\\n" +
        `🆔 ID-niz: ${user.id}\\n` +
        `👤 Adynyz: ${user.first_name || "Belli dal"}\\n\\n` +
        "💰 *Elyeter hasap:* 0.0 TMT\\n" +
        "🧊 *Dondurulan:* 0.0 TMT\\n" +
        "🔒 *Gorag parol:* ✅\\n" +
        "📱 *TMCELL parol:* ❌\\n\\n" +
        `👥 *Referal ssylka:*\\n${refLink}\\n\\n` +
        "Sizde 0 referal bar.\\n" +
        "Referal hasap: 0.0 TMT",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .text("✏️ Gorag parol uytgetmek", "change_pass").row()
            .text("🔐 TMCELL parol duzmek", "tmcell_pass").row()
            .text("💰 Referal hasapdan cykarmak", "withdraw_ref").row()
            .text("⬇️ Menyu", "menu")
        }
      );
      break;
      
    case "contact":
      await ctx.editMessageText(
        "📞 *Habarlas*\\n\\n" +
        "📱 Telegram: @kemabest77\\n" +
        "📍 Asgabat saheri",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .url("📱 Admina yaz", "https://t.me/kemabest77")
            .text("⬇️ Menyu", "menu")
        }
      );
      break;
      
    case "balance":
      await ctx.editMessageText(
        "💰 *Bal topla gazan*\\n\\n" +
        "🎁 Her sargyt ucin bal gazanyn!\\n\\n" +
        "• 100 TMT sargyt — 5 bal\\n" +
        "• 500 TMT sargyt — 30 bal\\n" +
        "• 1000 TMT sargyt — 70 bal\\n\\n" +
        "🏆 Bal ygnap, arzanlyklar gazanyn!",
        { 
          parse_mode: "Markdown",
          reply_markup: mainMenu
        }
      );
      break;
      
    case "menu":
    case "back":
      await ctx.editMessageText(
        "🎉 *Kema Hyzmatlar*\\n\\n" +
        "Hos geldiniz! Neme satyn almak isleyarsiniz?\\n\\n" +
        `👤 *ID-niz:* ${user.id}\\n` +
        `💰 *Elyeter:* 0.0 TMT\\n` +
        `🧊 *Dondurulan:* 0.0 TMT`,
        { 
          parse_mode: "Markdown",
          reply_markup: mainMenu
        }
      );
      break;
      
    case "vpn_Happ":
      await ctx.editMessageText(
        "📱 *Happ VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("Happ")
        }
      );
      break;
      
    case "vpn_Shadowsocks":
      await ctx.editMessageText(
        "🌐 *Shadowsocks VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("Shadowsocks")
        }
      );
      break;
      
    case "vpn_Outline":
      await ctx.editMessageText(
        "🔐 *Outline VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("Outline")
        }
      );
      break;
      
    default:
      if (data.startsWith("uc_")) {
        const parts = data.split("_");
        const uc = parts[1];
        const tmt = parts[2];
        
        await sendAdminOrder(ctx, `${uc} UC`, tmt, `UC sargyt: ${uc} UC`);
        
        await ctx.editMessageText(
          `✅ *Sargyt kabul edildi!*\\n\\n` +
          `💎 ${uc} UC\\n` +
          `💰 ${tmt} TMT\\n\\n` +
          `📩 Admina iberildi: @kemabest77\\n\\n` +
          `📱 Admina yazmak ucin asakdaky butona basin:`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Admina yaz", "https://t.me/kemabest77").row()
              .text("⬇️ Menyu", "menu")
          }
        );
      }
      else if (data.startsWith("vpn_") && data.includes("_monthly")) {
        const type = data.split("_")[1];
        
        await sendAdminOrder(ctx, `${type} VPN`, "80", `VPN: ${type} (Aylyk)`);
        
        await ctx.editMessageText(
          `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
          `🔒 ${type} VPN\\n` +
          `📅 Aylyk\\n` +
          `💰 80 TMT\\n\\n` +
          `📩 Admina iberildi: @kemabest77\\n\\n` +
          `📱 Admina yazmak ucin asakdaky butona basin:`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Admina yaz", "https://t.me/kemabest77").row()
              .text("⬇️ Menyu", "menu")
          }
        );
      }
      else if (data.startsWith("vpn_") && data.includes("_weekly")) {
        const type = data.split("_")[1];
        
        await sendAdminOrder(ctx, `${type} VPN`, "30", `VPN: ${type} (Hepde)`);
        
        await ctx.editMessageText(
          `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
          `🔒 ${type} VPN\\n` +
          `📆 Hepde\\n` +
          `💰 30 TMT\\n\\n` +
          `📩 Admina iberildi: @kemabest77\\n\\n` +
          `📱 Admina yazmak ucin asakdaky butona basin:`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Admina yaz", "https://t.me/kemabest77").row()
              .text("⬇️ Menyu", "menu")
          }
        );
      }
      else {
        await ctx.answerCallbackQuery("Dusunmedim");
      }
  }
  
  await ctx.answerCallbackQuery();
});

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  
  if (text.includes("uc") || text.includes("pubg")) {
    let ucText = "💎 *UC Bahalary:*\\n\\n";
    ucPrices.forEach(item => {
      ucText += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
    });
    return await ctx.reply(ucText, { 
      parse_mode: "Markdown",
      reply_markup: ucMenu()
    });
  }
  
  if (text.includes("vpn") || text.includes("internet")) {
    return await ctx.reply(
      "🔒 *VPN Hyzmatlary:*\\n\\n" +
      "📱 Happ\\n" +
      "🌐 Shadowsocks\\n" +
      "🔐 Outline\\n\\n" +
      "📅 Aylyk — *80 TMT*\\n" +
      "📆 Hepde — *30 TMT*",
      { 
        parse_mode: "Markdown",
        reply_markup: vpnMenu()
      }
    );
  }
  
  if (text.includes("salam") || text.includes("hello")) {
    return await ctx.reply(
      "👋 *Salam!* Kema Hyzmatlara hos geldiniz!\\n\\n" +
      "Neme satyn almak isleyarsiniz?",
      { 
        parse_mode: "Markdown",
        reply_markup: mainMenu
      }
    );
  }
  
  await ctx.reply(
    "🤔 Dusunmedim.\\n\\n" +
    "📋 /start basyp, komandary gorup bilersiniz.",
    { reply_markup: mainMenu }
  );
});

bot.start();
console.log("✅ Kema Hyzmatlar BOT isleyar!");
console.log(`📱 Admin: @kemabest77`);
