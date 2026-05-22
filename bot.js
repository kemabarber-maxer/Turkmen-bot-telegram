# UC + VPN satýan kämilleşdirilen bot

bot_code = '''import { Bot, InlineKeyboard } from "grammy";

// ═══════════════════════════════════════════════════════════════
// KEMA HYzMATLAR BOT — UC + VPN SATyş
// ═══════════════════════════════════════════════════════════════

const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");

// ═══════════════════════════════════════════════════════════════
// 1. UC BAHALARY
// ═══════════════════════════════════════════════════════════════
const ucBahalar = [
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

// ═══════════════════════════════════════════════════════════════
// 2. VPN BAHALARY
// ═══════════════════════════════════════════════════════════════
const vpnBahalar = {
  happ: { aýlyk: 80, hepde: 30 },
  shadowsocks: { aýlyk: 80, hepde: 30 },
  outline: { aýlyk: 80, hepde: 30 },
};

// ═══════════════════════════════════════════════════════════════
// 3. ESASY MENýU KLAWIATURA
// ═══════════════════════════════════════════════════════════════
const esasyMenu = new InlineKeyboard()
  .text("💎 UC satyn al", "uc_menu").row()
  .text("🔒 VPN satyn al", "vpn_menu").row()
  .text("🛒 Sargyt", "sargyt").row()
  .text("👤 Şahsy otag", "sahsy_otag")
  .text("📞 Habarlaşmak", "habarlas").row()
  .text("💰 Bal topla gazan", "bal_topla").row();

// ═══════════════════════════════════════════════════════════════
// 4. UC MENýU
// ═══════════════════════════════════════════════════════════════
function ucMenu() {
  const keyboard = new InlineKeyboard();
  ucBahalar.forEach((item, index) => {
    keyboard.text(
      `${item.uc} UC — ${item.tmt} TMT`,
      `uc_${item.uc}_${item.tmt}`
    );
    if ((index + 1) % 2 === 0) keyboard.row();
  });
  keyboard.text("⬅️ Yza", "yza");
  return keyboard;
}

// ═══════════════════════════════════════════════════════════════
// 5. VPN MENýU
// ═══════════════════════════════════════════════════════════════
const vpnMenu = new InlineKeyboard()
  .text("📱 Happ", "vpn_happ").row()
  .text("🌐 Shadowsocks", "vpn_shadowsocks").row()
  .text("🔐 Outline", "vpn_outline").row()
  .text("⬅️ Yza", "yza");

// VPN töleg menýu
function vpnTölegMenu(type) {
  return new InlineKeyboard()
    .text(`📅 Aýlyk — ${vpnBahalar[type].aýlyk} TMT`, `vpn_${type}_aylyk`).row()
    .text(`📆 Hepde — ${vpnBahalar[type].hepde} TMT`, `vpn_${type}_hepde`).row()
    .text("⬅️ Yza", "vpn_menu");
}

// ═══════════════════════════════════════════════════════════════
// 6. KOMANDALAR
// ═══════════════════════════════════════════════════════════════

// /start
bot.command("start", async (ctx) => {
  await ctx.reply(
    "🎉 *Kema Hyzmatlar*\\n\\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?",
    { 
      parse_mode: "Markdown",
      reply_markup: esasyMenu
    }
  );
});

// /uc — UC bahalary
bot.command("uc", async (ctx) => {
  let text = "💎 *UC Bahalary:*\\n\\n";
  ucBahalar.forEach(item => {
    text += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
  });
  text += "\\n🛒 Sargyt etmek üçin UC saýlaň:";
  
  await ctx.reply(text, { 
    parse_mode: "Markdown",
    reply_markup: ucMenu()
  });
});

// /vpn — VPN bahalary
bot.command("vpn", async (ctx) => {
  await ctx.reply(
    "🔒 *VPN Hyzmatlary:*\\n\\n" +
    "📱 Happ\\n" +
    "🌐 Shadowsocks\\n" +
    "🔐 Outline\\n\\n" +
    "📅 Aýlyk — *80 TMT*\\n" +
    "📆 Hepde — *30 TMT*",
    { 
      parse_mode: "Markdown",
      reply_markup: vpnMenu
    }
  );
});

// /sargyt — Sargyt maglumaty
bot.command("sargyt", async (ctx) => {
  await ctx.reply(
    "🛒 *Sargyt etmek*\\n\\n" +
    "Sargyt etmek üçin aşakdaky maglumatlary iberiň:\\n\\n" +
    "1️⃣ Harydyň ady (UC / VPN)\\n" +
    "2️⃣ Möçberi\\n" +
    "3️⃣ Telefon belgiňiz\\n\\n" +
    "📩 ýa-da @MrMakeout bilen habarlaşyň",
    { 
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard()
        .url("📱 Habarlaş", "https://t.me/MrMakeout")
        .text("⬅️ Menýu", "menu")
    }
  );
});

// /bal — Bal toplamak
bot.command("bal", async (ctx) => {
  await ctx.reply(
    "💰 *Bal topla gazan*\\n\\n" +
    "🎁 Her sargyt üçin bal gazanyň!\\n\\n" +
    "• 100 TMT sargyt — 5 bal\\n" +
    "• 500 TMT sargyt — 30 bal\\n" +
    "• 1000 TMT sargyt — 70 bal\\n\\n" +
    "🏆 Bal ýygnap, arzanlyklar gazanyň!",
    { 
      parse_mode: "Markdown",
      reply_markup: esasyMenu
    }
  );
});

// /kömek
bot.command("komek", async (ctx) => {
  await ctx.reply(
    "❓ *Kömek*\\n\\n" +
    "📋 Komandalar:\\n" +
    "/start — Başlangyç\\n" +
    "/uc — UC bahalary\\n" +
    "/vpn — VPN hyzmatlary\\n" +
    "/sargyt — Sargyt etmek\\n" +
    "/bal — Bal toplamak\\n" +
    "/komek — Bu menýu",
    { 
      parse_mode: "Markdown",
      reply_markup: esasyMenu
    }
  );
});

// ═══════════════════════════════════════════════════════════════
// 7. INLINE DÜWMELER (Callback)
// ═══════════════════════════════════════════════════════════════

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  
  switch(data) {
    // Esasy menýu
    case "uc_menu":
      let ucText = "💎 *UC Bahalary:*\\n\\n";
      ucBahalar.forEach(item => {
        ucText += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
      });
      ucText += "\\n🛒 Sargyt etmek üçin UC saýlaň:";
      
      await ctx.editMessageText(ucText, { 
        parse_mode: "Markdown",
        reply_markup: ucMenu()
      });
      break;
      
    case "vpn_menu":
      await ctx.editMessageText(
        "🔒 *VPN Hyzmatlary:*\\n\\n" +
        "Hyzmat saýlaň:",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnMenu
        }
      );
      break;
      
    case "sargyt":
      await ctx.editMessageText(
        "🛒 *Sargyt etmek*\\n\\n" +
        "Sargyt etmek üçin aşakdaky maglumatlary iberiň:\\n\\n" +
        "1️⃣ Harydyň ady (UC / VPN)\\n" +
        "2️⃣ Möçberi\\n" +
        "3️⃣ Telefon belgiňiz\\n\\n" +
        "📩 ýa-da @MrMakeout bilen habarlaşyň",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .url("📱 Habarlaş", "https://t.me/MrMakeout")
            .text("⬅️ Menýu", "menu")
        }
      );
      break;
      
    case "sahsy_otag":
      await ctx.editMessageText(
        "👤 *Şahsy otag*\\n\\n" +
        "🆔 ID: " + ctx.from.id + "\\n" +
        "👤 Adyňyz: " + (ctx.from.first_name || "Belli däl") + "\\n\\n" +
        "📊 Sargytlaryňyz: 0\\n" +
        "💰 Bal: 0",
        { 
          parse_mode: "Markdown",
          reply_markup: esasyMenu
        }
      );
      break;
      
    case "habarlas":
      await ctx.editMessageText(
        "📞 *Habarlaşmak*\\n\\n" +
        "📱 Telegram: @MrMakeout\\n" +
        "📍 Aşgabat şäheri",
        { 
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard()
            .url("📱 Telegram", "https://t.me/MrMakeout")
            .text("⬅️ Menýu", "menu")
        }
      );
      break;
      
    case "bal_topla":
      await ctx.editMessageText(
        "💰 *Bal topla gazan*\\n\\n" +
        "🎁 Her sargyt üçin bal gazanyň!\\n\\n" +
        "• 100 TMT sargyt — 5 bal\\n" +
        "• 500 TMT sargyt — 30 bal\\n" +
        "• 1000 TMT sargyt — 70 bal\\n\\n" +
        "🏆 Bal ýygnap, arzanlyklar gazanyň!",
        { 
          parse_mode: "Markdown",
          reply_markup: esasyMenu
        }
      );
      break;
      
    case "menu":
    case "yza":
      await ctx.editMessageText(
        "🎉 *Kema Hyzmatlar*\\n\\n" +
        "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?",
        { 
          parse_mode: "Markdown",
          reply_markup: esasyMenu
        }
      );
      break;
      
    // VPN türleri
    case "vpn_happ":
      await ctx.editMessageText(
        "📱 *Happ VPN*\\n\\n" +
        "📅 Aýlyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnTölegMenu("happ")
        }
      );
      break;
      
    case "vpn_shadowsocks":
      await ctx.editMessageText(
        "🌐 *Shadowsocks VPN*\\n\\n" +
        "📅 Aýlyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnTölegMenu("shadowsocks")
        }
      );
      break;
      
    case "vpn_outline":
      await ctx.editMessageText(
        "🔐 *Outline VPN*\\n\\n" +
        "📅 Aýlyk — *80 TMT*\\n" +
        "📆 Hepde — *30 TMT*",
        { 
          parse_mode: "Markdown",
          reply_markup: vpnTölegMenu("outline")
        }
      );
      break;
      
    default:
      // UC sargyt
      if (data.startsWith("uc_")) {
        const parts = data.split("_");
        const uc = parts[1];
        const tmt = parts[2];
        await ctx.editMessageText(
          `💎 *Sargyt*\\n\\n` +
          `${uc} UC — ${tmt} TMT\\n\\n` +
          `✅ Sargyt etmek isleýärsiňizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `tassykla_${uc}_${tmt}`).row()
              .text("❌ Ýatyr", "uc_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      // VPN sargyt
      else if (data.startsWith("vpn_") && data.includes("_aylyk")) {
        const type = data.split("_")[1];
        await ctx.editMessageText(
          `🔒 *VPN Sargyt*\\n\\n` +
          `${type.toUpperCase()} VPN\\n` +
          `📅 Aýlyk — 80 TMT\\n\\n` +
          `✅ Sargyt etmek isleýärsiňizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `vpn_tassykla_${type}_aylyk`).row()
              .text("❌ Ýatyr", "vpn_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      else if (data.startsWith("vpn_") && data.includes("_hepde")) {
        const type = data.split("_")[1];
        await ctx.editMessageText(
          `🔒 *VPN Sargyt*\\n\\n` +
          `${type.toUpperCase()} VPN\\n` +
          `📆 Hepde — 30 TMT\\n\\n` +
          `✅ Sargyt etmek isleýärsiňizmi?`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .text("✅ Tassykla", `vpn_tassykla_${type}_hepde`).row()
              .text("❌ Ýatyr", "vpn_menu").row()
              .text("⬅️ Yza", "menu")
          }
        );
      }
      // Tassyklama
      else if (data.startsWith("tassykla_")) {
        const parts = data.split("_");
        const uc = parts[1];
        const tmt = parts[2];
        await ctx.editMessageText(
          `✅ *Sargyt kabul edildi!*\\n\\n` +
          `💎 ${uc} UC\\n` +
          `💰 ${tmt} TMT\\n\\n` +
          `📩 Sargyt tassyklanmak üçin @MrMakeout bilen habarlaşyň.`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Habarlaş", "https://t.me/MrMakeout")
              .text("⬅️ Menýu", "menu")
          }
        );
      }
      else if (data.startsWith("vpn_tassykla_")) {
        const parts = data.split("_");
        const type = parts[2];
        const mode = parts[3];
        const price = mode === "aylyk" ? 80 : 30;
        await ctx.editMessageText(
          `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
          `🔒 ${type.toUpperCase()} VPN\\n` +
          `📅 ${mode === "aylyk" ? "Aýlyk" : "Hepde"}\\n` +
          `💰 ${price} TMT\\n\\n` +
          `📩 Sargyt tassyklanmak üçin @MrMakeout bilen habarlaşyň.`,
          { 
            parse_mode: "Markdown",
            reply_markup: new InlineKeyboard()
              .url("📱 Habarlaş", "https://t.me/MrMakeout")
              .text("⬅️ Menýu", "menu")
          }
        );
      }
      else {
        await ctx.answerCallbackQuery("Düşünmedim");
      }
  }
  
  await ctx.answerCallbackQuery();
});

// ═══════════════════════════════════════════════════════════════
// 8. ADY TEKST JOGAPLAR
// ═══════════════════════════════════════════════════════════════
bot.on("message:text", async (ctx) => {
  const tekst = ctx.message.text.toLowerCase();
  
  // UC jogaplar
  if (tekst.includes("uc") || tekst.includes("pubg")) {
    let ucText = "💎 *UC Bahalary:*\\n\\n";
    ucBahalar.forEach(item => {
      ucText += `• ${item.uc} UC — *${item.tmt} TMT*\\n`;
    });
    return await ctx.reply(ucText, { 
      parse_mode: "Markdown",
      reply_markup: ucMenu()
    });
  }
  
  // VPN jogaplar
  if (tekst.includes("vpn") || tekst.includes("internet")) {
    return await ctx.reply(
      "🔒 *VPN Hyzmatlary:*\\n\\n" +
      "📱 Happ\\n" +
      "🌐 Shadowsocks\\n" +
      "🔐 Outline\\n\\n" +
      "📅 Aýlyk — *80 TMT*\\n" +
      "📆 Hepde — *30 TMT*",
      { 
        parse_mode: "Markdown",
        reply_markup: vpnMenu
      }
    );
  }
  
  // Salam
  if (tekst.includes("salam") || tekst.includes("hello")) {
    return await ctx.reply(
      "👋 *Salam!* Kema Hyzmatlara hoş geldiňiz!\\n\\n" +
      "Näme satyn almak isleýärsiňiz?",
      { 
        parse_mode: "Markdown",
        reply_markup: esasyMenu
      }
    );
  }
  
  // Baha
  if (tekst.includes("baha") || tekst.includes("näçe")) {
    return await ctx.reply(
      "💰 *Bahalar:*\\n\\n" +
      "💎 UC — /uc basyň\\n" +
      "🔒 VPN — /vpn basyň",
      { 
        parse_mode: "Markdown",
        reply_markup: esasyMenu
      }
    );
  }
  
  // Tapylmadykda
  await ctx.reply(
    "🤔 Düşünmedim.\\n\\n" +
    "📋 /komek basyp, komandalary görüp bilersiňiz.",
    { reply_markup: esasyMenu }
  );
});

// ═══════════════════════════════════════════════════════════════
// 9. BOTY IŞLEDIŇ
// ═══════════════════════════════════════════════════════════════
bot.start();
console.log("✅ Kema Hyzmatlar BOT işleýär!");
'''

with open('/mnt/agents/output/kema_hyzmatlar_bot.js', 'w', encoding='utf-8') as f:
    f.write(bot_code)

print("✅ Kema Hyzmatlar Bot döredildi!")
print("\nÖzellikler:")
print("- 💎 UC satyn al (60-8100 UC)")
print("- 🔒 VPN satyn al (Happ, Shadowsocks, Outline)")
print("- 🛒 Sargyt sistemi")
print("- 👤 Şahsy otag")
print("- 💰 Bal topla gazan")
print("- 📞 Habarlaşmak")
print("- Inline menýu düwmeleri")
