import { Bot, Keyboard, InlineKeyboard } from "grammy";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot("8803704262:AAFlmxw40IWOBrD-Yoo1JT9QAbbWy1dtI_Q");
const ADMIN_ID = "8375820047";
const ADMIN_USERNAME = "kema_uc";

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

const userStates = new Map();
const userPasswords = new Map();
const userTmcell = new Map();
const userPhones = new Map();
const userLastBotMsg = new Map();
const userLastUserMsg = new Map();

function getUserState(userId) {
  if (!userStates.has(userId)) {
    userStates.set(userId, { menu: "main" });
  }
  return userStates.get(userId);
}

function setUserState(userId, state) {
  userStates.set(userId, state);
}

async function deleteLastMessages(ctx) {
  const botMsgId = userLastBotMsg.get(ctx.from.id);
  const userMsgId = userLastUserMsg.get(ctx.from.id);
  if (botMsgId) {
    try { await ctx.api.deleteMessage(ctx.chat.id, botMsgId); } catch (e) {}
  }
  if (userMsgId) {
    try { await ctx.api.deleteMessage(ctx.chat.id, userMsgId); } catch (e) {}
  }
}

async function sendAndTrack(ctx, text, options = {}) {
  await deleteLastMessages(ctx);
  const msg = await ctx.reply(text, options);
  userLastBotMsg.set(ctx.from.id, msg.message_id);
  return msg;
}

function trackUserMessage(ctx) {
  if (ctx.message) {
    userLastUserMsg.set(ctx.from.id, ctx.message.message_id);
  }
}

function removeKeyboard() {
  return { remove_keyboard: true };
}

function mainMenuKeyboard() {
  return new Keyboard()
    .text("💎 UC satyn al").text("🔒 VPN satyn al").row()
    .text("🛒 Sargyt et").text("👤 Şahsy otag").row()
    .text("📞 Habarlaş").text("💰 Bal topla").row()
    .text("⬇️ Esasy menýu")
    .resized();
}

function ucMenuKeyboard() {
  const keyboard = new Keyboard().resized();
  ucPrices.forEach((item, index) => {
    keyboard.text(`${item.uc} UC — ${item.tmt} TMT`);
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
    .text("⬇️ Esasy menýu")
    .resized();
}

function personalMenuKeyboard() {
  return new Keyboard()
    .text("✏️ Parol üýtget").text("🔐 TMCELL parol").row()
    .text("💰 Çykarmak").row()
    .text("⬇️ Yza")
    .resized();
}

function paymentTypeKeyboard() {
  return new Keyboard()
    .text("💰 Nagt").row()
    .text("📞 Telefona").row()
    .text("⬇️ Yza")
    .resized();
}

function adminInlineKeyboard() {
  return new InlineKeyboard().url("📱 Admina ýaz", `https://t.me/${ADMIN_USERNAME}`);
}

function copyOrderText(user, product, price, phone, details, time) {
  return `📦 Täze sargyt!\n\n` +
    `👤 Müşderi: ${user.first_name || "Belli däl"}\n` +
    `🆔 ID: ${user.id}\n` +
    `👤 Username: @${user.username || "Ýok"}\n` +
    `📱 Telefon: ${phone}\n\n` +
    `📦 Haryt: ${product}\n` +
    `💰 Bahasy: ${price} TMT\n` +
    `📝 Maglumat: ${details}\n` +
    `⏰ Wagt: ${time}`;
}

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

  const phone = userPhones.get(user.id) || "Ýok";

  const adminMessage = copyOrderText(user, product, price, phone, details, now);

  try {
    await bot.api.sendMessage(ADMIN_ID, adminMessage);
    return { success: true, time: now, phone };
  } catch (e) {
    console.error("Admina SMS ugradylmady:", e.message);
    return { success: false, time: now, phone };
  }
}

async function sendMainMenu(ctx) {
  const user = ctx.from;
  await sendAndTrack(
    ctx,
    "🎉 Kema Hyzmatlar\n\n" +
    "Hoş geldiňiz! Näme satyn almak isleýärsiňiz?\n\n" +
    `👤 ID-ňiz: ${user.id}`,
    { reply_markup: mainMenuKeyboard() }
  );
}

bot.command("start", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "main" });
  await sendMainMenu(ctx);
});

bot.hears("💎 UC satyn al", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "uc_payment_type" });
  await sendAndTrack(
    ctx,
    "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\n\n" +
    "💰 Nagt\n" +
    "📞 Telefona",
    { reply_markup: paymentTypeKeyboard() }
  );
});

bot.hears("💰 Nagt", async (ctx) => {
  trackUserMessage(ctx);
  const state = getUserState(ctx.from.id);
  if (state.menu !== "uc_payment_type") return;
  setUserState(ctx.from.id, { menu: "uc_list", paymentType: "nagt" });
  await sendAndTrack(
    ctx,
    "🛒 Sargyt etmek üçin UC saýlaň:",
    { reply_markup: ucMenuKeyboard() }
  );
});

bot.hears("📞 Telefona", async (ctx) => {
  trackUserMessage(ctx);
  const state = getUserState(ctx.from.id);
  if (state.menu !== "uc_payment_type") return;
  setUserState(ctx.from.id, { menu: "uc_list", paymentType: "telefon" });
  await sendAndTrack(
    ctx,
    "🛒 Sargyt etmek üçin UC saýlaň:",
    { reply_markup: ucMenuKeyboard() }
  );
});

ucPrices.forEach((item) => {
  bot.hears(`${item.uc} UC — ${item.tmt} TMT`, async (ctx) => {
    trackUserMessage(ctx);
    const state = getUserState(ctx.from.id);
    if (state.menu !== "uc_list") return;
    
    setUserState(ctx.from.id, { menu: "uc_phone", uc: item.uc, tmt: item.tmt, paymentType: state.paymentType });
    
    await sendAndTrack(
      ctx,
      `📱 Telefon belgiňizi ýazyň:\n\n` +
      `💎 ${item.uc} UC — ${item.tmt} TMT`,
      { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
    );
  });
});

bot.hears("🔒 VPN satyn al", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "vpn_list" });
  await sendAndTrack(
    ctx,
    "🔒 VPN Hyzmatlary:\n\nHyzmat saýlaň:",
    { reply_markup: vpnMenuKeyboard() }
  );
});

vpnTypes.forEach((type) => {
  bot.hears(`${type.icon} ${type.name}`, async (ctx) => {
    trackUserMessage(ctx);
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_list") return;
    setUserState(ctx.from.id, { menu: "vpn_payment", vpnType: type.name });
    await sendAndTrack(
      ctx,
      `${type.icon} ${type.name} VPN\n\n` +
      `📅 Aýlyk — 80 TMT\n` +
      `📆 Hepde — 30 TMT`,
      { reply_markup: vpnPaymentKeyboard(type.name) }
    );
  });
});

vpnTypes.forEach((type) => {
  bot.hears(`📅 ${type.name} — Aýlyk (80 TMT)`, async (ctx) => {
    trackUserMessage(ctx);
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_payment" || state.vpnType !== type.name) return;
    
    setUserState(ctx.from.id, { menu: "vpn_phone", vpnType: type.name, price: "80", period: "Aýlyk" });
    
    await sendAndTrack(
      ctx,
      `📱 Telefon belgiňizi ýazyň:\n\n` +
      `🔒 ${type.name} VPN — 80 TMT (Aýlyk)`,
      { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
    );
  });

  bot.hears(`📆 ${type.name} — Hepde (30 TMT)`, async (ctx) => {
    trackUserMessage(ctx);
    const state = getUserState(ctx.from.id);
    if (state.menu !== "vpn_payment" || state.vpnType !== type.name) return;
    
    setUserState(ctx.from.id, { menu: "vpn_phone", vpnType: type.name, price: "30", period: "Hepde" });
    
    await sendAndTrack(
      ctx,
      `📱 Telefon belgiňizi ýazyň:\n\n` +
      `🔒 ${type.name} VPN — 30 TMT (Hepde)`,
      { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
    );
  });
});

bot.hears("🛒 Sargyt et", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "order" });
  await sendAndTrack(
    ctx,
    "🛒 Sargyt etmek\n\n" +
    "Sargyt etmek üçin aşakdaky maglumatlary iberiň:\n\n" +
    "1️⃣ Harydyň ady (UC / VPN)\n" +
    "2️⃣ Möçberi\n" +
    "3️⃣ Telefon belgiňiz",
    { reply_markup: orderMenuKeyboard() }
  );
});

bot.hears("💎 UC sayla", async (ctx) => {
  trackUserMessage(ctx);
  const state = getUserState(ctx.from.id);
  if (state.menu !== "order") return;
  setUserState(ctx.from.id, { menu: "uc_payment_type" });
  await sendAndTrack(
    ctx,
    "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\n\n" +
    "💰 Nagt\n" +
    "📞 Telefona",
    { reply_markup: paymentTypeKeyboard() }
  );
});

bot.hears("🔒 VPN sayla", async (ctx) => {
  trackUserMessage(ctx);
  const state = getUserState(ctx.from.id);
  if (state.menu !== "order") return;
  setUserState(ctx.from.id, { menu: "vpn_list" });
  await sendAndTrack(
    ctx,
    "🔒 VPN Hyzmatlary:\n\nHyzmat saýlaň:",
    { reply_markup: vpnMenuKeyboard() }
  );
});

bot.hears("👤 Şahsy otag", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "personal" });
  const user = ctx.from;
  const refLink = `https://t.me/${ctx.me.username}?start=${user.id}`;
  const hasPassword = userPasswords.has(user.id) ? "✅" : "❌";
  const hasTmcell = userTmcell.has(user.id) ? "✅" : "❌";
  await sendAndTrack(
    ctx,
    "👤 Şahsy otag\n\n" +
    `🆔 ID-ňiz: ${user.id}\n` +
    `👤 Adyňyz: ${user.first_name || "Belli däl"}\n\n` +
    `🔒 Gorag parol: ${hasPassword}\n` +
    `📱 TMCELL parol: ${hasTmcell}\n\n` +
    `👥 Referal ssylka:\n${refLink}\n\n` +
    "Sizde 0 referal bar.",
    { reply_markup: personalMenuKeyboard() }
  );
});

bot.hears("📞 Habarlaş", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "contact" });
  await sendAndTrack(
    ctx,
    "📞 Habarlaş\n\n" +
    `📱 Telegram: @${ADMIN_USERNAME}\n` +
    "📍 Aşgabat şäheri",
    {
      reply_markup: adminInlineKeyboard(),
    }
  );
});

bot.hears("💰 Bal topla", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "balance" });
  await sendAndTrack(
    ctx,
    "💰 Bal topla / Gazan\n\n" +
    "🎁 Her sargyt üçin bal gazanyň!\n\n" +
    "• 100 TMT sargyt — 5 bal\n" +
    "• 500 TMT sargyt — 30 bal\n" +
    "• 1000 TMT sargyt — 70 bal\n\n" +
    "🏆 Bal ýygnap, arzanlyklar gazanyň!",
    {
      reply_markup: new Keyboard()
        .text("⬇️ Yza")
        .resized(),
    }
  );
});

bot.hears("⬇️ Esasy menýu", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "main" });
  await sendMainMenu(ctx);
});

bot.hears("⬇️ Yza", async (ctx) => {
  trackUserMessage(ctx);
  const state = getUserState(ctx.from.id);
  switch (state.menu) {
    case "uc_list":
    case "uc_order_done":
      setUserState(ctx.from.id, { menu: "uc_payment_type" });
      await sendAndTrack(
        ctx,
        "🤔 Haýsy görnüş bilen tölegi geçirmek isleýärsiňiz?\n\n" +
        "💰 Nagt\n" +
        "📞 Telefona",
        { reply_markup: paymentTypeKeyboard() }
      );
      break;
    case "uc_payment_type":
    case "uc_phone":
      setUserState(ctx.from.id, { menu: "main" });
      await sendMainMenu(ctx);
      break;
    case "vpn_payment":
    case "vpn_order_done":
    case "vpn_phone":
      setUserState(ctx.from.id, { menu: "vpn_list" });
      await sendAndTrack(
        ctx,
        "🔒 VPN Hyzmatlary:\n\nHyzmat saýlaň:",
        { reply_markup: vpnMenuKeyboard() }
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

bot.hears("📱 Admina ýaz", async (ctx) => {
  trackUserMessage(ctx);
  await sendAndTrack(
    ctx,
    `📱 Admin bilen habarlaşmak üçin @${ADMIN_USERNAME} ýazaýyň.`,
    { reply_markup: mainMenuKeyboard() }
  );
  setUserState(ctx.from.id, { menu: "main" });
});

bot.hears("✏️ Parol üýtget", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "password_change", step: "waiting" });
  await sendAndTrack(
    ctx,
    "✏️ Gorag paroly üýtgetmek\n\n" +
    "Täze paroly ýazyň (4-8 san):",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

bot.hears("🔐 TMCELL parol", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "tmcell_set", step: "waiting" });
  await sendAndTrack(
    ctx,
    "🔐 TMCELL parol düzmek\n\n" +
    "TMCELL parolyňyzy ýazyň:",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

bot.hears("💰 Çykarmak", async (ctx) => {
  trackUserMessage(ctx);
  setUserState(ctx.from.id, { menu: "withdraw", step: "waiting" });
  await sendAndTrack(
    ctx,
    "💰 Referal hasapdan çykarmak\n\n" +
    "Çykarmak isleýän mukdary ýazyň:",
    { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
  );
});

bot.on("message:text", async (ctx) => {
  trackUserMessage(ctx);
  const text = ctx.message.text;
  const state = getUserState(ctx.from.id);

  // UC telefon kabul etmek
  if (state.menu === "uc_phone") {
    userPhones.set(ctx.from.id, text);
    const uc = state.uc;
    const tmt = state.tmt;
    const paymentType = state.paymentType === "telefon" ? "Telefona" : "Nagt";
    
    const result = await sendAdminOrder(
      ctx,
      `${uc} UC`,
      tmt,
      `UC sargyt: ${uc} UC | Töleg: ${paymentType}`
    );

    const orderText = copyOrderText(
      ctx.from,
      `${uc} UC`,
      tmt,
      text,
      `UC sargyt: ${uc} UC | Töleg: ${paymentType}`,
      result.time
    );

    if (result.success) {
      await sendAndTrack(
        ctx,
        `✅ Sargyt kabul edildi!\n\n` +
        `💎 ${uc} UC\n` +
        `💰 ${tmt} TMT\n` +
        `💳 Töleg görnüşi: ${paymentType}\n` +
        `📱 Telefon: ${text}\n\n` +
        `📋 Sargyt maglumatlary:\n` +
        `\`\`\`${orderText}\`\`\`\n\n` +
        `📩 Admina iberildi`,
        {
          reply_markup: new InlineKeyboard()
            .url("📱 Admina ýaz", `https://t.me/${ADMIN_USERNAME}`).row()
            .url("⬇️ Esasy menýu", `https://t.me/${ctx.me.username}?start=${ctx.from.id}`),
          parse_mode: "Markdown",
        }
      );
    } else {
      await sendAndTrack(
        ctx,
        `⚠️ Sargyt kabul edildi, ýöne admina habar bermekde kynçylyk çykdy.\n\n` +
        `📋 Sargyt maglumatlary (kopyalap ugratmak üçin):\n` +
        `\`\`\`${orderText}\`\`\`\n\n` +
        `📱 Haýyş, özüňiz @${ADMIN_USERNAME} bilen habarlaşyň.`,
        {
          reply_markup: new InlineKeyboard()
            .url("📱 Admina ýaz", `https://t.me/${ADMIN_USERNAME}`).row()
            .url("⬇️ Esasy menýu", `https://t.me/${ctx.me.username}?start=${ctx.from.id}`),
          parse_mode: "Markdown",
        }
      );
    }
    setUserState(ctx.from.id, { menu: "uc_order_done" });
    return;
  }

  // VPN telefon kabul etmek
  if (state.menu === "vpn_phone") {
    userPhones.set(ctx.from.id, text);
    const vpnType = state.vpnType;
    const price = state.price;
    const period = state.period;
    
    const result = await sendAdminOrder(
      ctx,
      `${vpnType} VPN`,
      price,
      `VPN: ${vpnType} (${period})`
    );

    const orderText = copyOrderText(
      ctx.from,
      `${vpnType} VPN`,
      price,
      text,
      `VPN: ${vpnType} (${period})`,
      result.time
    );

    if (result.success) {
      await sendAndTrack(
        ctx,
        `✅ VPN Sargyt kabul edildi!\n\n` +
        `🔒 ${vpnType} VPN\n` +
        `📅 ${period}\n` +
        `💰 ${price} TMT\n` +
        `📱 Telefon: ${text}\n\n` +
        `📋 Sargyt maglumatlary:\n` +
        `\`\`\`${orderText}\`\`\`\n\n` +
        `📩 Admina iberildi`,
        {
          reply_markup: new InlineKeyboard()
            .url("📱 Admina ýaz", `https://t.me/${ADMIN_USERNAME}`).row()
            .url("⬇️ Esasy menýu", `https://t.me/${ctx.me.username}?start=${ctx.from.id}`),
          parse_mode: "Markdown",
        }
      );
    } else {
      await sendAndTrack(
        ctx,
        `⚠️ Sargyt kabul edildi, ýöne admina habar bermekde kynçylyk çykdy.\n\n` +
        `📋 Sargyt maglumatlary (kopyalap ugratmak üçin):\n` +
        `\`\`\`${orderText}\`\`\`\n\n` +
        `📱 Haýyş, özüňiz @${ADMIN_USERNAME} bilen habarlaşyň.`,
        {
          reply_markup: new InlineKeyboard()
            .url("📱 Admina ýaz", `https://t.me/${ADMIN_USERNAME}`).row()
            .url("⬇️ Esasy menýu", `https://t.me/${ctx.me.username}?start=${ctx.from.id}`),
          parse_mode: "Markdown",
        }
      );
    }
    setUserState(ctx.from.id, { menu: "vpn_order_done" });
    return;
  }

  if (state.menu === "password_change" && state.step === "waiting") {
    if (text.length >= 4 && text.length <= 8 && /^\d+$/.test(text)) {
      userPasswords.set(ctx.from.id, text);
      await sendAndTrack(
        ctx,
        "✅ Parol üýtgedildi!\n\n" +
        "Gorag parolyňyz üstünlikli üýtgedildi.",
        { reply_markup: personalMenuKeyboard() }
      );
      setUserState(ctx.from.id, { menu: "personal" });
    } else {
      await sendAndTrack(
        ctx,
        "⚠️ Parol 4-8 san aralygynda bolmaly.\n" +
        "Täzeden ýazyň:",
        { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
      );
    }
    return;
  }

  if (state.menu === "tmcell_set" && state.step === "waiting") {
    userTmcell.set(ctx.from.id, text);
    await sendAndTrack(
      ctx,
      "✅ TMCELL parol ýatda saklandy!",
      { reply_markup: personalMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "personal" });
    return;
  }

  if (state.menu === "withdraw" && state.step === "waiting") {
    const amount = parseFloat(text);
    if (isNaN(amount) || amount <= 0) {
      await sendAndTrack(
        ctx,
        "⚠️ Dogry mukdar ýazyň.\n" +
        "Täzeden ýazyň:",
        { reply_markup: new Keyboard().text("⬇️ Yza").resized() }
      );
      return;
    }
    await sendAdminOrder(ctx, "Çykarmak", amount.toString(), `Referal hasapdan çykarmak: ${amount} TMT`);
    await sendAndTrack(
      ctx,
      "✅ Çykarmak talaby iberildi!\n" +
      "Admin tassyklamagy garaşylýar.",
      { reply_markup: personalMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "personal" });
    return;
  }

  if (state.menu === "order") {
    await sendAdminOrder(ctx, "El sargyt", "Belli däl", `Ulanyjy sargyt: ${text}`);
    await sendAndTrack(
      ctx,
      "✅ Sargyt kabul edildi!\n\n" +
      "Admin size habarlaşar.",
      { reply_markup: mainMenuKeyboard() }
    );
    setUserState(ctx.from.id, { menu: "main" });
    return;
  }

  const lowerText = text.toLowerCase();
  if (lowerText.includes("salam") || lowerText.includes("hello")) {
    return await sendAndTrack(
      ctx,
      "👋 Salam! Kema Hyzmatlara hoş geldiňiz!\n\n" +
      "Näme satyn almak isleýärsiňiz?",
      { reply_markup: mainMenuKeyboard() }
    );
  }

  await sendAndTrack(
    ctx,
    "🤔 Düşünmedim.\n\n" +
    "📋 /start basyp, komandany görüp bilersiňiz.",
    { reply_markup: mainMenuKeyboard() }
  );
});

bot.start();
console.log("✅ Kema Hyzmatlar BOT işleýär!");
console.log(`📱 Admin: @${ADMIN_USERNAME}`);
