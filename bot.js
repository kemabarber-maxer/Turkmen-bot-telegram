
code = '''import { Bot, Keyboard } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot("8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s");
const ADMIN_ID = 8375820047; // San ID (mysal: "123456789")

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

// ===== ULANYJY MAGLUMATLARY (WAGTLAPÇA MEMORY) =====
const userStates = new Map();
const userPasswords = new Map();
const userTmcell = new Map();

function getUserState(userId) {
  if (!userStates.has(userId)) {
    userStates.set(userId, { menu: "main" });
  }
  return userStates.get(userId);
}

function setUserState(userId, state) {
  userStates.set(userId, state);
}

// ===== KÖNE MENÝUNY AÝYRMAK =====
function removeKeyboard() {
  return { remove_keyboard: true };
}

// ===== ESASY MENÝU =====
function mainMenuKeyboard() {
  return new Keyboard()
    .text("💎 UC satyn al").text("🔒 VPN satyn al").row()
    .text("🛒 Sargyt et").text("👤 Şahsy otag").row()
    .text("📞 Habarlaş").text("💰 Bal topla").row()
    .text("⬇️ Esasy menýu")
    .resized();
}

// ===== UC MENYUSY =====
function ucMenuKeyboard() {
  const keyboard = new Keyboard().resized();
  ucPrices.forEach((item, index) => {
    keyboard.text(`${item.uc} UC — ${item.tmt} TMT`);
    if ((index + 1) % 2 === 0) keyboard.row();
  });
  keyboard.row().text("⬇️ Yza");
  return keyboard;
}

// ===== VPN MENYUSY =====
function vpnMenuKeyboard() {
  const keyboard = new Keyboard().resized();
  vpnTypes.forEach((type) => {
    keyboard.text(`${type.icon} ${type.name}`).row();
  });
  keyboard.text("⬇️ Yza");
  return keyboard;
}

// ===== VPN TÖLEG MENYUSY =====
function vpnPaymentKeyboard(type) {
  return new Keyboard()
    .text(`📅 ${type} — Aýlyk (80 TMT)`).row()
    .text(`📆 ${type} — Hepde (30 TMT)`).row()
    .text("⬇️ Yza")
    .resized();
}

// ===== SARGYT MENYUSY =====
function orderMenuKeyboard() {
  return new Keyboard()
    .text("💎 UC sayla").text("🔒 VPN sayla").row()
    .text("⬇️ Esasy menýu")
    .resized();
}

// ===== ŞAHSY OTAG MENYUSY =====
function personalMenuKeyboard() {
  return new Keyboard()
    .text("✏️ Parol üýtget").text("🔐 TMCELL parol").row()
    .text("💰 Çykarmak").row()
    .text("⬇️ Yza")
    .resized();
}

// ===== TÖLEG GÖRNÜŞI MENYUSY =====
function paymentTypeKeyboard() {
  return new Keyboard()
    .text("💰 Nagt").row()
    .text("📞 Telefona").row()
    .text("⬇️ Yza")
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
    month: "short",
    year: "numeric",
  });

  const adminMessage =
    `📦 *Täze sargyt!*\\n\\n` +
    `👤 *Müşderi:* ${user.first_name || "Belli däl"}\\n` +
    `🆔 *ID:* ${user.id}\\n` +
    `👤 *Username:* @${user.username || "Ýok"}\\n\\n` +
    `📦 *Haryt:* ${product}\\n` +
    `💰 *Bahasy:* ${price} TMT\\n` +
    `${details ? `📝 *Maglumat:* ${details}\\n` : ""}` +
    `⏰ *Wagt:* ${now}`;

  try {
    await bot.api.sendMessage(ADMIN_ID, adminMessage, { parse_mode: "MarkdownV2" });
    return true;
  } catch (e) {
    console.error("Admina SMS ugradylmady:", e.message);
    await ctx.reply(
      "⚠️ Sargyt kabul edildi, ýöne admina habar bermekde kynçylyk çykdy.\\n" +
      "📱 Haýyş, özüňiz @kemabest77 bilen habarlaşyň."
    );
    return false;
  }
}

// ===== ESASY MENÝU JOGAPY =====
async function sendMainMenu(ctx) {
  const user = ctx.from;
  await ctx.reply(
    "🎉 *Kema Hyzmatlar*\\n\\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?\\n\\n" +
    `👤 ID-ňiz: ${user.id}`,
    {
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard(),
    }
  );
}

// ===== START KOMANDASY =====
bot.command("start", async (ctx) => {
  setUserState(ctx.from.id, { menu: "main" });
  await sendMainMenu(ctx);
});

// ===== UC SATYN AL =====
bot.hears("💎 UC satyn al", async (ctx) => {
  setUserState(ctx.from.id, { menu: "uc_payment_type" });

  await ctx.reply(
    "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\\n\\n" +
    "💰 Nagat\\n" +
    "📞 Telefona",
    {
      parse_mode: "Markdown",
      reply_markup: paymentTypeKeyboard(),
    }
  );
});

bot.hears("💰 Nagt", async (ctx) => {
  const state = getUserState(ctx.from.id);
  if (state.menu !== "uc_payment_type") return;

  setUserState(ctx.from.id, { menu: "uc_list", paymentType: "nagt" });

  let text = "💎 *UC Bahalary:*\\n\\n";
  ucPrices.forEach((item) => {
    text += `• ${item.uc} UC — ${item.tmt} TMT\\n`;
  });
  text += "\\n🛒 Sargyt etmek üçin UC saýlaň:";

  await ctx.reply(text, {
    parse_mode: "Markdown",
    reply_markup: ucMenuKeyboard(),
  });
});

bot.hears("📞 Telefona", async (ctx) => {
  const state = getUserState(ctx.from.id);
  if (state.menu !== "uc_payment_type") return;

  setUserState(ctx.from.id, { menu: "uc_list", paymentType: "telefon" });

  let text = "💎 *UC Bahalary:*\\n\\n";
  ucPrices.forEach((item) => {
    text += `• ${item.uc} UC — ${item.tmt} TMT\\n`;
  });
  text += "\\n🛒 Sargyt etmek üçin UC saýlaň:";

  await ctx.reply(text, {
    parse_mode: "Markdown",
    reply_markup: ucMenuKeyboard(),
  });
});

// UC bahalary basylanda
ucPrices.forEach((item) => {
  bot.hears(`${item.uc} UC — ${item.tmt} TMT`, async (ctx) => {
    const state = getUserState(ctx.from.id);
    if (state.menu !== "uc_list") return;

    const paymentType = state.paymentType === "telefon" ? "Telefona" : "Nagt";
    const sent = await sendAdminOrder(
      ctx,
      `${item.uc} UC`,
      item.tmt,
      `UC sargyt: ${item.uc} UC | Töleg: ${paymentType}`
    );

    if (sent) {
      await ctx.reply(
        `✅ *Sargyt kabul edildi!*\\n\\n` +
        `💎 ${item.uc} UC\\n` +
        `💰 ${item.tmt} TMT\\n` +
        `💳 Töleg görnüşi: ${paymentType}\\n\\n` +
        `📩 Admina iberildi\\n\\n` +
        `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
        {
          parse_mode: "Markdown",
          reply_markup: new Keyboard()
            .text("📱 Admina ýaz").row()
            .text("⬇️ Yza")
            .resized(),
        }
      );
    }
    setUserState(ctx.from.id, { menu: "uc_order_done" });
  });
});

// ===== VPN SATYN AL =====
bot.hears("🔒 VPN satyn al", async (ctx) => {
  setUserState(ctx.from.id, { menu: "vpn_list" });

  await ctx.reply(
    "🔒 *VPN Hyzmatlary:*\\n\\n" + "Hyzmat saýlaň:",
    {
      parse_mode: "Markdown",
      reply_markup: vpnMenuKeyboard(),
    }
  );
});

// VPN tipleri basylanda
vpnTypes.forEach((type) => {
  bot.hears(`${type.icon} ${type.name}`, async (ctx) => {
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_list") return;

    setUserState(ctx.from.id, { menu: "vpn_payment", vpnType: type.name });

    await ctx.reply(
      `${type.icon} *${type.name} VPN*\\n\\n` +
      `📅 Aýlyk — 80 TMT\\n` +
      `📆 Hepde — 30 TMT`,
      {
        parse_mode: "Markdown",
        reply_markup: vpnPaymentKeyboard(type.name),
      }
    );
  });
});

// VPN tölegleri basylanda
vpnTypes.forEach((type) => {
  bot.hears(`📅 ${type.name} — Aýlyk (80 TMT)`, async (ctx) => {
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_payment" || state.vpnType !== type.name) return;

    const sent = await sendAdminOrder(
      ctx,
      `${type.name} VPN`,
      "80",
      `VPN: ${type.name} (Aýlyk)`
    );

    if (sent) {
      await ctx.reply(
        `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
        `🔒 ${type.name} VPN\\n` +
        `📅 Aýlyk\\n` +
        `💰 80 TMT\\n\\n` +
        `📩 Admina iberildi\\n\\n` +
        `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
        {
          parse_mode: "Markdown",
          reply_markup: new Keyboard()
            .text("📱 Admina ýaz").row()
            .text("⬇️ Yza")
            .resized(),
        }
      );
    }
    setUserState(ctx.from.id, { menu: "vpn_order_done" });
  });

  bot.hears(`📆 ${type.name} — Hepde (30 TMT)`, async (ctx) => {
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_payment" || state.vpnType !== type.name) return;

    const sent = await sendAdminOrder(
      ctx,
      `${type.name} VPN`,
      "30",
      `VPN: ${type.name} (Hepde)`
    );

    if (sent) {
      await ctx.reply(
        `✅ *VPN Sargyt kabul edildi!*\\n\\n` +
        `🔒 ${type.name} VPN\\n` +
        `📆 Hepde\\n` +
        `💰 30 TMT\\n\\n` +
        `📩 Admina iberildi\\n\\n` +
        `📱 Admina ýazmak üçin aşakdaky düwme basyň:`,
        {
          parse_mode: "Markdown",
          reply_markup: new Keyboard()
            .text("📱 Admina ýaz").row()
            .text("⬇️ Yza")
            .resized(),
        }
      );
    }
    setUserState(ctx.from.id, { menu: "vpn_order_done" });
  });
});

// ===== SARGYT ET =====
bot.hears("🛒 Sargyt et", async (ctx) => {
  setUserState(ctx.from.id, { menu: "order" });

  await ctx.reply(
    "🛒 *Sargyt etmek*\\n\\n" +
    "Sargyt etmek üçin aşakdaky maglumatlary iberiň:\\n\\n" +
    "1️⃣ Harydyň ady (UC / VPN)\\n" +
    "2️⃣ Möçberi\\n" +
    "3️⃣ Telefon belgiňiz",
    {
      parse_mode: "Markdown",
      reply_markup: orderMenuKeyboard(),
    }
  );
});

bot.hears("💎 UC sayla", async (ctx) => {
  const state = getUserState(ctx.from.id);
  if (state.menu !== "order") return;

  setUserState(ctx.from.id, { menu: "uc_payment_type" });

  await ctx.reply(
    "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\\n\\n" +
    "💰 Nagt\\n" +
    "📞 Telefona",
    {
      parse_mode: "Markdown",
      reply_markup: paymentTypeKeyboard(),
    }
  );
});

bot.hears("🔒 VPN sayla", async (ctx) => {
  const state = getUserState(ctx.from.id);
  if (state.menu !== "order") return;

  setUserState(ctx.from.id, { menu: "vpn_list" });

  await ctx.reply(
    "🔒 *VPN Hyzmatlary:*\\n\\n" + "Hyzmat saýlaň:",
    {
      parse_mode: "Markdown",
      reply_markup: vpnMenuKeyboard(),
    }
  );
});

// ===== ŞAHSY OTAG =====
bot.hears("👤 Şahsy otag", async (ctx) => {
  setUserState(ctx.from.id, { menu: "personal" });

  const user = ctx.from;
  const refLink = `https://t.me/${ctx.me.username}?start=${user.id}`;
  const hasPassword = userPasswords.has(user.id) ? "✅" : "❌";
  const hasTmcell = userTmcell.has(user.id) ? "✅" : "❌";

  await ctx.reply(
    "👤 *Şahsy otag*\\n\\n" +
    `🆔 ID-ňiz: ${user.id}\\n` +
    `👤 Adyňyz: ${user.first_name || "Belli däl"}\\n\\n` +
    `🔒 Gorag parol: ${hasPassword}\\n` +
    `📱 TMCELL parol: ${hasTmcell}\\n\\n` +
    `👥 Referal ssylka:\\n${refLink}\\n\\n` +
    "Sizde 0 referal bar.",
    {
      parse_mode: "Markdown",
      reply_markup: personalMenuKeyboard(),
    }
  );
});

// ===== HABARLAŞ =====
bot.hears("📞 Habarlaş", async (ctx) => {
  setUserState(ctx.from.id, { menu: "contact" });

  await ctx.reply(
    "📞 *Habarlaş*\\n\\n" +
    "📱 Telegram: @kemabest77\\n" +
    "📍 Aşgabat şäheri",
    {
      parse_mode: "Markdown",
      reply_markup: new Keyboard()
        .text("📱 Admina ýaz").row()
        .text("⬇️ Yza")
        .resized(),
    }
  );
});

// ===== BAL TOPLA =====
bot.hears("💰 Bal topla", async (ctx) => {
  setUserState(ctx.from.id, { menu: "balance" });

  await ctx.reply(
    "💰 *Bal topla / Gazan*\\n\\n" +
    "🎁 Her sargyt üçin bal gazanyň!\\n\\n" +
    "• 100 TMT sargyt — 5 bal\\n" +
    "• 500 TMT sargyt — 30 bal\\n" +
    "• 1000 TMT sargyt — 70 bal\\n\\n" +
    "🏆 Bal ýygnap, arzanlyklar gazanyň!",
    {
      parse_mode: "Markdown",
      reply_markup: new Keyboard()
        .text("⬇️ Yza")
        .resized(),
    }
  );
});

// ===== ESASY MENÝU =====
bot.hears("⬇️ Esasy menýu", async (ctx) => {
  setUserState(ctx.from.id, { menu: "main" });
  await sendMainMenu(ctx);
});

// ===== YZA (Yzygiderli) =====
bot.hears("⬇️ Yza", async (ctx) => {
  const state = getUserState(ctx.from.id);

  switch (state.menu) {
    case "uc_list":
    case "uc_order_done":
      setUserState(ctx.from.id, { menu: "uc_payment_type" });
      await ctx.reply(
        "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\\n\\n" +
        "💰 Nagt\\n" +
        "📞 Telefona",
        {
          parse_mode: "Markdown",
          reply_markup: paymentTypeKeyboard(),
        }
      );
      break;

    case "uc_payment_type":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    case "vpn_payment":
    case "vpn_order_done":
      setUserState(ctx.from.id, { menu: "vpn_list" });
      await ctx.reply(
        "🔒 *VPN Hyzmatlary:*\\n\\n" + "Hyzmat saýlaň:",
        {
          parse_mode: "Markdown",
          reply_markup: vpnMenuKeyboard(),
        }
      );
      break;

    case "vpn_list":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    case "order":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    case "personal":
    case "password_change":
    case "tmcell_set":
    case "withdraw":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    case "contact":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    case "balance":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;

    default:
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
  }
});

// ===== ADYNA ÝAZMAK =====
bot.hears("📱 Admina ýaz", async (ctx) => {
  await ctx.reply(
    "📱 Admin bilen habarlaşmak üçin @kemabest77 ýazaýyň.",
    { reply_markup: mainMenuKeyboard() }
  );
  setUserState(ctx.from.id, { menu: "main" });
});

// ===== ŞAHSY OTAG DÜWMELERI =====
bot.hears("✏️ Parol üýtget", async (ctx) => {
  setUserState(ctx.from.id, { menu: "password_change", step: "waiting" });

  await ctx.reply(
    "✏️ *Gorag paroly üýtgetmek*\\n\\n" +
    "Täze paroly ýazyň (4-8 san):",
    {
      parse_mode: "Markdown",
      reply_markup: new Keyboard().text("⬇️ Yza").resized(),
    }
  );
});

bot.hears("🔐 TMCELL parol", async (ctx) => {
  setUserState(ctx.from.id, { menu: "tmcell_set", step: "waiting" });

  await ctx.reply(
    "🔐 *TMCELL parol düzmek*\\n\\n" +
    "TMCELL parolyňyzy ýazyň:",
    {
      parse_mode: "Markdown",
      reply_markup: new Keyboard().text("⬇️ Yza").resized(),
    }
  );
});

bot.hears("💰 Çykarmak", async (ctx) => {
  setUserState(ctx.from.id, { menu: "withdraw", step: "waiting" });

  await ctx.reply(
    "💰 *Referal hasapdan çykarmak*\\n\\n" +
    "Çykarmak isleýän mukdary ýazyň:",
    {
      parse_mode: "Markdown",
      reply_markup: new Keyboard().text("⬇️ Yza").resized(),
    }
  );
});

// ===== TEKST HABARLAR (STATE GÖRE) =====
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text;
  const state = getUserState(ctx.from.id);

  // Parol üýtgetmek
  if (state.menu === "password_change" && state.step === "waiting") {
    if (text.length >= 4 && text.length <= 8 && /^\\d+$/.test(text)) {
      userPasswords.set(ctx.from.id, text);
      await ctx.reply(
        "✅ *Parol üýtgedildi!*\\n\\n" +
        "Gorag parolyňyz üstünlikli üýtgedildi.",
        { parse_mode: "Markdown", reply_markup: personalMenuKeyboard() }
      );
      setUserState(ctx.from.id, { menu: "personal" });
    } else {
      await ctx.reply(
        "⚠️ Parol 4-8 san aralygynda bolmaly.\\n" +
        "Täzeden ýazyň:"
      );
    }
    return;
  }

  // TMCELL parol
  if (state.menu === "tmcell_set" && state.step === "waiting") {
    userTmcell.set(ctx.from.id, text);
    await ctx.reply(
      "✅ *TMCELL parol ýatda saklandy!*",
      { parse_mode: "Markdown", reply_markup: personalMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "personal" });
    return;
  }

  // Çykarmak
  if (state.menu === "withdraw" && state.step === "waiting") {
    const amount = parseFloat(text);
    if (isNaN(amount) || amount <= 0) {
      await ctx.reply(
        "⚠️ Dogry mukdar ýazyň.\\n" +
        "Täzeden ýazyň:"
      );
      return;
    }
    await sendAdminOrder(ctx, "Çykarmak", amount.toString(), `Referal hasapdan çykarmak: ${amount} TMT`);
    await ctx.reply(
      "✅ *Çykarmak talaby iberildi!*\\n" +
      "Admin tassyklamagy garaşylýar.",
      { parse_mode: "Markdown", reply_markup: personalMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "personal" });
    return;
  }

  // Sargyt et — tekst kabul etmek
  if (state.menu === "order") {
    await sendAdminOrder(ctx, "El sargyt", "Belli däl", `Ulanyjy sargyt: ${text}`);
    await ctx.reply(
      "✅ *Sargyt kabul edildi!*\\n\\n" +
      "Admin size habarlaşar.",
      { parse_mode: "Markdown", reply_markup: mainMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "main" });
    return;
  }

  // Salam
  const lowerText = text.toLowerCase();
  if (lowerText.includes("salam") || lowerText.includes("hello")) {
    return await ctx.reply(
      "👋 Salam! Kema Hyzmatlara hoş geldiňiz!\\n\\n" +
      "Näme satyn almak isleýärsiňiz?",
      {
        parse_mode: "Markdown",
        reply_markup: mainMenuKeyboard(),
      }
    );
  }

  // Düşünmedim
  await ctx.reply(
    "🤔 Düşünmedim.\\n\\n" +
    "📋 /start basyp, komandany görüp bilersiňiz.",
    { reply_markup: mainMenuKeyboard() }
  );
});

// ===== BOTY BAŞLATMAK =====
bot.start();
console.log("✅ Kema Hyzmatlar BOT işleýär!");
console.log(`📱 Admin: @kemabest77`);
'''

with open("/mnt/agents/output/bot.js", "w", encoding="utf-8") as f:
    f.write(code)

print("✅ bot.js ýazdy!")
print(f"📏 Uzynlygy: {len(code)} harp")
