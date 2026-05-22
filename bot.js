import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");

// UC prices
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

// Main menu
const mainMenu = new InlineKeyboard()
  .text("💎 UC satyn al", "uc_menu").row()
  .text("🔒 VPN satyn al", "vpn_menu").row()
  .text("🛒 Sargyt", "order").row()
  .text("👤 Sahsy otag", "personal").row()
  .text("📞 Habarlas", "contact").row()
  .text("💰 Bal topla", "balance");

// UC menu
function ucMenu() {
  const keyboard = new InlineKeyboard();
  ucPrices.forEach((item, index) => {
    keyboard.text(
      `${item.uc} UC — ${item.tmt} TMT`,
      `uc_${item.uc}_${item.tmt}`
    );
    if ((index + 1) % 2 === 0) keyboard.row();
  });
  keyboard.text("⬅️ Yza", "back");
  return keyboard;
}

// VPN menu
const vpnMenu = new InlineKeyboard()
  .text("📱 Happ", "vpn_happ").row()
  .text("🌐 Shadowsocks", "vpn_shadowsocks").row()
  .text("🔐 Outline", "vpn_outline").row()
  .text("⬅️ Yza", "back");

// VPN payment menu
function vpnPaymentMenu(type) {
  return new InlineKeyboard()
    .text("📅 Aylyk — 80 TMT", `vpn_${type}_monthly`).row()
    .text("📆 Hepde — 30 TMT", `vpn_${type}_weekly`).row()
    .text("⬅️ Yza", "vpn_menu");
}

// Commands
bot.command("start", async (ctx) => {
  await ctx.reply(
    "🎉 *Kema Hyzmatlar*\\n\\n" +
    "Hos geldiniz! Neme satyn almak isleýarsiniz?",
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
    "📱 Happ\\n" +
    "🌐 Shadowsocks\\n" +
    "🔐 Outline\\n\\n" +
    "📅 Aylyk — *80 TMT*\\n" +
    "📆 Hepde — *30 TMT*",
    { 
      parse_mode: "Markdown",
      reply_markup: vpnMenu
    }
  );
});

// Callback handler
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  
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
          reply_markup: vpnMenu
        }
      );
      break;
      
    case "order":
      await ctx.editMessageText(
        "🛒 *Sargyt etmek*\\n\\n" +
        "Sargyt etmek ucin asakdaky maglumatlary iberin:\\n\\n" +
        "1️⃣ Harydyn ady (UC / VPN)\\n" +
        "2️⃣ Mocberi\\n" +
        "3️⃣ Telefon belginiz\\n\\n" +
        "📩 ya-da @MrMakeout bilen habarlasyň",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .url("📱 Habarlas", "https://t.me/MrMakeout")
            .text("⬅️ Menu", "menu")
        }
      );
      break;
      
    case "personal":
      await ctx.editMessageText(
        "👤 *Sahsy otag*\\n\\n" +
        "🆔 ID: " + ctx.from.id + "\\n" +
        "👤 Adynyz: " + (ctx.from.first_name || "Belli dal") + "\\n\\n" +
        "📊 Sargytlaryňyz: 0\\n" +
        "💰 Bal: 0",
        { 
          parse_mode: "Markdown",
          reply_markup: mainMenu
        }
      );
      break;
      
    case "contact":
      await ctx.editMessageText(
        "📞 *Habarlas*\\n\\n" +
        "📱 Telegram: @MrMakeout\\n" +
        "📍 Asgabat saheri",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .url("📱 Telegram", "https://t.me/MrMakeout")
            .text("⬅️ Menu", "menu")
        }
      );
      break;
      
    case "balance":
      await ctx.editMessageText(
        "💰 *Bal topla gazan*\\n\\n" +
        "🎁 Her sargyt ucin bal gazanyň!\\n\\n" +
        "• 100 TMT sargyt — 5 bal\\n" +
        "• 500 TMT sargyt — 30 bal\\n" +
        "• 1000 TMT sargyt — 70 bal\\n\\n" +
        "🏆 Bal ygnap, arzanlyklar gazanyň!",
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
        "Hos geldiniz! Neme satyn almak isleýarsiniz?",
        { 
          parse_mode: "Markdown",
          reply_markup: mainMenu
        }
      );
      break;
      
    case "vpn_happ":
      await ctx.editMessageText(
        "📱 *Happ VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("happ")
        }
      );
      break;
      
    case "vpn_shadowsocks":
      await ctx.editMessageText(
        "🌐 *Shadowsocks VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("shadowsocks")
        }
      );
      break;
      
    case "vpn_outline":
      await ctx.editMessageText(
        "🔐 *Outline VPN*\\n\\n" +
        "📅 Aylyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnPaymentMenu("outline")
        }
      );
      break;
      
    default:
      // UC order
      if (data.startsWith("uc_")) {
        const parts = data.split("_");
        const uc = parts[1];
        const tmt = parts[2];
        await ctx.editMessageText(
          `💎 *Sargyt*\\n\\n` +
          `${uc} UC — ${tmt} TMT\\n\\n` +
          `✅ Sargyt etmek isleýarsinizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `confirm_${uc}_${tmt}`).row()
              .text("❌ Yatyr", "uc_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      // VPN order
      else if (data.startsWith("vpn_") && data.includes("_monthly")) {
        const type = data.split("_")[1];
        await ctx.editMessageText(
          `🔒 *VPN Sargyt*\\n\\n` +
          `${type.toUpperCase()} VPN\\n` +
          `📅 Aylyk — 80 TMT\\n\\n` +
          `✅ Sargyt etmek isleýarsinizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `vpn_confirm_${type}_monthly`).row()
              .text("❌ Yatyr", "vpn_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      else if (data.startsWith("vpn_") && data.includes("_weekly")) {
        const type = data.split("_")[1];
        await ctx.editMessageText(
          `🔒 *VPN Sargyt*\\n\\n` +
          `${type.toUpperCase()} VPN\\n` +
          `📆 Hepde — 30 TMT\\n\\n` +
          `✅ Sargyt etmek isleýarsinizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `vpn_confirm_${type}_weekly`).row()
              .text("❌ Yatyr", "vpn_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      // Confirm UC
      else if (data.startsWith("confirm_")) {
        const parts = data.split("_");
        const uc = parts[1];
        const tmt = parts[2];
        await ctx.editMessageText(
          `✅ *Sargyt kabul edildi!*\\n\\n` +
          `💎 ${uc} UC\\n` +
          `💰 ${tmt} TMT\\n\\n` +
          `📩 Sargyt tassyklanmak ucin @MrMakeout bilen habarlasyň.`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Habarlas", "https://t.me/MrMakeout")
              .text("⬅️ Menu", "menu")
          }
        );
      }
      // Confirm VPN
      else if (data.startsWith("vpn_confirm_")) {
        const parts = data.split("_");
        const type = parts[2];
        const mode = parts[3];
        const price = mode === "monthly" ? 80 : 30;
        await ctx.editMessageText(
          `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
          `🔒 ${type.toUpperCase()} VPN\\n` +
          `📅 ${mode === "monthly" ? "Aylyk" : "Hepde"}\\n` +
          `💰 ${price} TMT\\n\\n` +
          `📩 Sargyt tassyklanmak ucin @MrMakeout bilen habarlasyň.`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Habarlas", "https://t.me/MrMakeout")
              .text("⬅️ Menu", "menu")
          }
        );
      }
      else {
        await ctx.answerCallbackQuery("Dusunmedim");
      }
  }
  
  await ctx.answerCallbackQuery();
});

// Text handler
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  
  // UC
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
  
  // VPN
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
        reply_markup: vpnMenu
      }
    );
  }
  
  // Salam
  if (text.includes("salam") || text.includes("hello")) {
    return await ctx.reply(
      "👋 *Salam!* Kema Hyzmatlara hos geldiniz!\\n\\n" +
      "Neme satyn almak isleýarsiniz?",
      { 
        parse_mode: "Markdown",
        reply_markup: mainMenu
      }
    );
  }
  
  // Baha
  if (text.includes("baha") || text.includes("nace")) {
    return await ctx.reply(
      "💰 *Bahalar:*\\n\\n" +
      "💎 UC — /uc basin\\n" +
      "🔒 VPN — /vpn basin",
      { 
        parse_mode: "Markdown",
        reply_markup: mainMenu
      }
    );
  }
  
  // Default
  await ctx.reply(
    "🤔 Dusunmedim.\\n\\n" +
    "📋 /start basyp, komandary gorup bilersiniz.",
    { reply_markup: mainMenu }
  );
});

bot.start();
console.log("✅ Kema Hyzmatlar BOT isleyar!");
