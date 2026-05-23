import { Bot, Keyboard } from "grammy";

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

// ===== ASAKDAKI MENYULAR (Reply Keyboard) =====

function mainMenuKeyboard() {
  return new Keyboard()
    .text("💎 UC satyn al").text("🔒 VPN satyn al").row()
    .text("🛒 Sargyt et").text("👤 Şahsy otag").row()
    .text("📞 Habarlaş").text("💰 Bal topla").row()
    .text("⬇️ Menýu")
    .resized();
}

function ucMenuKeyboard() {
  const keyboard = new Keyboard().resized();
  ucPrices.forEach((item, index) => {
    keyboard.text(`💎 ${item.uc} UC — ${item.tmt} TMT`);
    if ((index + 1) % 2 === 0) keyboard.row();
  });
  keyboard.row().text("⬇️ Yza");
  return keyboard;
}

function vpnMenuKeyboard() {
  const keyboard = new Keyboard().resized();
  vpnTypes.forEach((type) => {
    keyboard.text(`${type.icon} ${type.name}`).row();
  });
  keyboard.text("⬇️ Yza");
  return keyboard;
}

function vpnPaymentKeyboard(type) {
  return new Keyboard()
    .text(`📅 ${type} — Aýlyk (80 TMT)`).row()
    .text(`📆 ${type} — Hepde (30 TMT)`).row()
    .text("⬇️ Yza")
    .resized();
}

function orderMenuKeyboard() {
  return new Keyboard()
    .text("💎 UC sayla").text("🔒 VPN sayla").row()
    .text("⬇️ Menýu")
    .resized();
}

function personalMenuKeyboard() {
  return new Keyboard()
    .text("✏️ Parol üýtget").text("🔐 TMCELL parol").row()
    .text("💰 Çykarmak").text("⬇️ Menýu").row()
    .resized();
}

// ===== ADMINA HABAR BERMEK =====

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
    `📦 Täze sargyt!\n\n` +
    `👤 Müşderi: ${user.first_name || "Belli däl"}\n` +
    `🆔 ID: ${user.id}\n` +
    `👤 Username: @${user.username || "Ýok"}\n\n` +
    `📦 Haryt: ${product}\n` +
    `💰 Bahasy: ${price} TMT\n` +
    `${details ? `📝 Maglumat: ${details}\n` : ""}` +
    `⏰ Wagt: ${now}`;
  
  try {
    await bot.api.sendMessage(ADMIN_ID, adminMessage, { parse_mode: "Markdown" });
  } catch (e) {
    console.log("Admina SMS ugradylmady:", e.message);
  }
}

// ===== START KOMANDASY =====

bot.command("start", async (ctx) => {
  const user = ctx.from;
  await ctx.reply(
    "🎉 Kema Hyzmatlar\n\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?\n\n" +
    `👤 ID-ňiz: ${user.id}\n` +
    `💰 Elýeter: 0.0 TMT\n` +
    `🧊 Dondurulan: 0.0 TMT`,
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard()
    }
  );
});

// ===== UC MENYUSY =====

bot.hears("💎 UC satyn al", async (ctx) => {
  let text = "💎 UC Bahalary:\n\n";
  ucPrices.forEach(item => {
    text += `• ${item.uc} UC — ${item.tmt} TMT\n`;
  });
  text += "\n🛒 Sargyt etmek üçin UC saýlaň:";
  
  await ctx.reply(text, { 
    parse_mode: "Markdown",
    reply_markup: ucMenuKeyboard()
  });
});

// UC bahalary basylanda
ucPrices.forEach(item => {
  bot.hears(`💎 ${item.uc} UC — ${item.tmt} TMT`, async (ctx) => {
    await sendAdminOrder(ctx, `${item.uc} UC`, item.tmt, `UC sargyt: ${item.uc} UC`);
    
    await ctx.reply(
      `✅ Sargyt kabul edildi!\n\n` +
      `💎 ${item.uc} UC\n` +
      `💰 ${item.tmt} TMT\n\n` +
      `📩 Admina iberildi: @kemabest77\n\n` +
      `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
      { 
        parse_mode: "Markdown",
        reply_markup: new Keyboard()
          .url("📱 Admina ýaz", "https://t.me/kemabest77").row()
          .text("⬇️ Menýu")
          .resized()
      }
    );
  });
});

// ===== VPN MENYUSY =====

bot.hears("🔒 VPN satyn al", async (ctx) => {
  await ctx.reply(
    "🔒 VPN Hyzmatlary:\n\n" +
    "Hyzmat saýlaň:",
    { 
      parse_mode: "Markdown",
      reply_markup: vpnMenuKeyboard()
    }
  );
});

// VPN tipleri basylanda
vpnTypes.forEach(type => {
  bot.hears(`${type.icon} ${type.name}`, async (ctx) => {
    await ctx.reply(
      `${type.icon} ${type.name} VPN\n\n` +
      `📅 Aýlyk — 80 TMT\n` +
      `📆 Hepde — 30 TMT`,
      { 
        parse_mode: "Markdown",
        reply_markup: vpnPaymentKeyboard(type.name)
      }
    );
  });
});

// VPN tölegleri basylanda
vpnTypes.forEach(type => {
  // Aýlyk
  bot.hears(`📅 ${type.name} — Aýlyk (80 TMT)`, async (ctx) => {
    await sendAdminOrder(ctx, `${type.name} VPN`, "80", `VPN: ${type.name} (Aýlyk)`);
    
    await ctx.reply(
      `✅ VPN Sargyt kabul edildi!\n\n` +
      `🔒 ${type.name} VPN\n` +
      `📅 Aýlyk\n` +
      `💰 80 TMT\n\n` +
      `📩 Admina iberildi: @kemabest77\n\n` +
      `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
      { 
        parse_mode: "Markdown",
        reply_markup: new Keyboard()
          .url("📱 Admina ýaz", "https://t.me/kemabest77").row()
          .text("⬇️ Menýu")
          .resized()
      }
    );
  });
  
  // Hepde
  bot.hears(`📆 ${type.name} — Hepde (30 TMT)`, async (ctx) => {
    await sendAdminOrder(ctx, `${type.name} VPN`, "30", `VPN: ${type.name} (Hepde)`);
    
    await ctx.reply(
      `✅ VPN Sargyt kabul edildi!\n\n` +
      `🔒 ${type.name} VPN\n` +
      `📆 Hepde\n` +
      `💰 30 TMT\n\n` +
      `📩 Admina iberildi: @kemabest77\n\n` +
      `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
      { 
        parse_mode: "Markdown",
        reply_markup: new Keyboard()
          .url("📱 Admina ýaz", "https://t.me/kemabest77").row()
          .text("⬇️ Menýu")
          .resized()
      }
    );
  });
});

// ===== SARGYT ET =====

bot.hears("🛒 Sargyt et", async (ctx) => {
  await ctx.reply(
    "🛒 Sargyt etmek\n\n" +
    "Sargyt etmek üçin aşakdaky maglumatlary iberiň:\n\n" +
    "1️⃣ Harydyň ady (UC / VPN)\n" +
    "2️⃣ Möçberi\n" +
    "3️⃣ Telefon belgiňiz",
    { 
      parse_mode: "Markdown",
      reply_markup: orderMenuKeyboard()
    }
  );
});

bot.hears("💎 UC sayla", async (ctx) => {
  let text = "💎 UC Bahalary:\n\n";
  ucPrices.forEach(item => {
    text += `• ${item.uc} UC — ${item.tmt} TMT\n`;
  });
  text += "\n🛒 Sargyt etmek üçin UC saýlaň:";
  
  await ctx.reply(text, { 
    parse_mode: "Markdown",
    reply_markup: ucMenuKeyboard()
  });
});

bot.hears("🔒 VPN sayla", async (ctx) => {
  await ctx.reply(
    "🔒 VPN Hyzmatlary:\n\n" +
    "Hyzmat saýlaň:",
    { 
      parse_mode: "Markdown",
      reply_markup: vpnMenuKeyboard()
    }
  );
});

// ===== ŞAHSY OTAG =====

bot.hears("👤 Şahsy otag", async (ctx) => {
  const user = ctx.from;
  const refLink = `https://t.me/${ctx.me.username}?start=${user.id}`;
  
  await ctx.reply(
    "👤 Şahsy otag\n\n" +
    `🆔 ID-ňiz: ${user.id}\n` +
    `👤 Adyňyz: ${user.first_name || "Belli däl"}\n\n` +
    "💰 Elýeter hasap: 0.0 TMT\n" +
    "🧊 Dondurulan: 0.0 TMT\n" +
    "🔒 Gorag parol: ✅\n" +
    "📱 TMCELL parol: ❌\n\n" +
    `👥 Referal ssylka:\n${refLink}\n\n` +
    "Sizde 0 referal bar.\n" +
    "Referal hasap: 0.0 TMT",
    { 
      parse_mode: "Markdown",
      reply_markup: personalMenuKeyboard()
    }
  );
});

// ===== HABARLAŞ =====

bot.hears("📞 Habarlaş", async (ctx) => {
  await ctx.reply(
    "📞 Habarlaş\n\n" +
    "📱 Telegram: @kemabest77\n" +
    "📍 Aşgabat şäheri",
    { 
      parse_mode: "Markdown",
      reply_markup: new Keyboard()
        .url("📱 Admina ýaz", "https://t.me/kemabest77").row()
        .text("⬇️ Menýu")
        .resized()
    }
  );
});

// ===== BAL TOPLA =====

bot.hears("💰 Bal topla", async (ctx) => {
  await ctx.reply(
    "💰 Bal topla / Gazan\n\n" +
    "🎁 Her sargyt üçin bal gazanyň!\n\n" +
    "• 100 TMT sargyt — 5 bal\n" +
    "• 500 TMT sargyt — 30 bal\n" +
    "• 1000 TMT sargyt — 70 bal\n\n" +
    "🏆 Bal ýygnap, arzanlyklar gazanyň!",
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard()
    }
  );
});

// ===== MENÝU WE YZA =====

bot.hears("⬇️ Menýu", async (ctx) => {
  const user = ctx.from;
  await ctx.reply(
    "🎉 Kema Hyzmatlar\n\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?\n\n" +
    `👤 ID-ňiz: ${user.id}\n` +
    `💰 Elýeter: 0.0 TMT\n` +
    `🧊 Dondurulan: 0.0 TMT`,
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard()
    }
  );
});

bot.hears("⬇️ Yza", async (ctx) => {
  const user = ctx.from;
  await ctx.reply(
    "🎉 Kema Hyzmatlar\n\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?\n\n" +
    `👤 ID-ňiz: ${user.id}\n` +
    `💰 Elýeter: 0.0 TMT\n` +
    `🧊 Dondurulan: 0.0 TMT`,
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard()
    }
  );
});

// ===== ADYNA ÝAZMAK (URL düwmesi üçin) =====

bot.hears("📱 Admina ýaz", async (ctx) => {
  await ctx.reply(
    "📱 Admina ýazmak üçin:\n@kemabest77",
    { 
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard()
    }
  );
});

// ===== ADYNA ÝAZ (URL düwmesi basylanda) =====

bot.hears("📱 Admina ýaz", async (ctx) => {
  await ctx.reply(
    "📱 Admin bilen habarlaşmak üçin:\n@kemabest77",
    { 
      reply_markup: mainMenuKeyboard()
    }
  );
});

// ===== ADYNA ÝAZ (URL düwme) - täzeden =====

bot.hears("📱 Admina ýaz", async (ctx) => {
  await ctx.reply(
    "📱 Admin bilen habarlaşmak üçin @kemabest77 ýazaýyň.",
    { reply_markup: mainMenuKeyboard() }
  );
});

// ===== TÄZE ÜSTÜNE GOŞULAN DÜWMELER =====

bot.hears("✏️ Parol üýtget", async (ctx) => {
  await ctx.reply(
    "✏️ Gorag paroly üýtgetmek\n\n" +
    "Täze paroly ýazyň:",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

bot.hears("🔐 TMCELL parol", async (ctx) => {
  await ctx.reply(
    "🔐 TMCELL parol düzmek\n\n" +
    "TMCELL parolyňyzy ýazyň:",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

bot.hears("💰 Çykarmak", async (ctx) => {
  await ctx.reply(
    "💰 Referal hasapdan çykarmak\n\n" +
    "Çykarmak isleýän mukdary ýazyň:",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

// ===== TEKST HABARLAR (düşünmedim) =====

bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.toLowerCase();
  
  if (text.includes("salam") || text.includes("hello")) {
    return await ctx.reply(
      "👋 Salam! Kema Hyzmatlara hoş geldiňiz!\n\n" +
      "Näme satyn almak isleýärsiňiz?",
      { 
        parse_mode: "Markdown",
        reply_markup: mainMenuKeyboard()
      }
    );
  }
  
  // Başga tekstler üçin menýu görkez
  await ctx.reply(
    "🤔 Düşünmedim.\n\n" +
    "📋 /start basyp, komandany görüp bilersiňiz.",
    { reply_markup: mainMenuKeyboard() }
  );
});

// ===== BOTY BAŞLATMAK =====

bot.start();
console.log("✅ Kema Hyzmatlar BOT işleýär!");
console.log(`📱 Admin: @kemabest77`);
    
