const { Telegraf, Markup } = require('telegraf');

// BOT TOKEN - öz tokeniňi goý
const bot = new Telegraf('8836556532:AAEggdrCWkRfskzg-sPg8T9Xhdey44LPy9s');

// UC bahalary
const ucPrices = {
    '60 UC': '23 TMT',
    '120 UC': '46 TMT',
    '325 UC': '105 TMT',
    '385 UC': '128 TMT',
    '660 UC': '210 TMT',
    '720 UC': '256 TMT',
    '1320 UC': '420 TMT',
    '1800 UC': '520 TMT',
    '3850 UC': '1390 TMT',
    '8100 UC': '2000 TMT'
};

// VPN bahalary
const vpnPrices = {
    '1 aý': '50 TMT',
    '3 aý': '130 TMT',
    '6 aý': '240 TMT',
    '12 aý': '450 TMT'
};

// Esasy menýu — butonlar aşakda
const mainMenu = Markup.keyboard([
    ['💎 UC satyn al', '🔒 VPN satyn al'],
    ['🛒 Sargyt', '👤 Şahsy otag'],
    ['📞 Habarlaş', '💰 Bal topla']
]).resize();

// Yza menýusy
const backMenu = Markup.keyboard([
    ['⬅️ Yza']
]).resize();

// Esasy menýu + Yza
const menuWithBack = Markup.keyboard([
    ['💎 UC satyn al', '🔒 VPN satyn al'],
    ['🛒 Sargyt', '👤 Şahsy otag'],
    ['📞 Habarlaş', '💰 Bal topla'],
    ['⬅️ Yza']
]).resize();

// UC bahalary menýusy
const ucMenu = Markup.keyboard([
    ['60 UC — 23 TMT', '120 UC — 46 TMT'],
    ['325 UC — 105 TMT', '385 UC — 128 TMT'],
    ['660 UC — 210 TMT', '720 UC — 256 TMT'],
    ['1320 UC — 420 TMT', '1800 UC — 520 TMT'],
    ['3850 UC — 1390 TMT', '8100 UC — 2000 TMT'],
    ['⬅️ Yza']
]).resize();

// VPN bahalary menýusy
const vpnMenu = Markup.keyboard([
    ['1 aý — 50 TMT', '3 aý — 130 TMT'],
    ['6 aý — 240 TMT', '12 aý — 450 TMT'],
    ['⬅️ Yza']
]).resize();

// Sargyt menýusy
const orderMenu = Markup.keyboard([
    ['📱 Habarlaş', '⬅️ Yza']
]).resize();

// Habarlaş menýusy
const contactMenu = Markup.keyboard([
    ['📱 Telegram', '⬅️ Menu']
]).resize();

// ==================== START / SALAM ====================
bot.start((ctx) => {
    sendWelcome(ctx);
});

bot.command('salam', (ctx) => {
    sendWelcome(ctx);
});

function sendWelcome(ctx) {
    const text = `👋 Salam! Kema Hyzmatlara hoş geldiniz!\n\nNeme satyn almak isleýärsiňiz?`;
    ctx.reply(text, mainMenu);
}

// ==================== UC SATYN AL ====================
bot.hears('💎 UC satyn al', (ctx) => {
    let text = '💎 UC Bahalary:\n\n';
    for (const [uc, price] of Object.entries(ucPrices)) {
        text += `• ${uc} — ${price}\n`;
    }
    text += '\n🛒 Sargyt etmek üçin UC saýlaň:';
    ctx.reply(text, ucMenu);
});

// UC saýlanynda
bot.hears(/^(\d+) UC — (.+) TMT$/, (ctx) => {
    const uc = ctx.match[1];
    const price = ctx.match[2];
    ctx.reply(
        `✅ Saýladynyz: ${uc} UC — ${price} TMT\n\n` +
        `🛒 Sargyt etmek üçin "📱 Habarlaş" düwmesine basyň.`,
        orderMenu
    );
});

// ==================== VPN SATYN AL ====================
bot.hears('🔒 VPN satyn al', (ctx) => {
    let text = '🔒 VPN Bahalary:\n\n';
    for (const [period, price] of Object.entries(vpnPrices)) {
        text += `• ${period} — ${price}\n`;
    }
    text += '\n🛒 Sargyt etmek üçin dowam edip bilen habarlaşyň:';
    ctx.reply(text, vpnMenu);
});

// VPN saýlanynda
bot.hears(/^(\d+) aý — (.+) TMT$/, (ctx) => {
    const period = ctx.match[1];
    const price = ctx.match[2];
    ctx.reply(
        `✅ Saýladynyz: ${period} aý VPN — ${price} TMT\n\n` +
        `🛒 Sargyt etmek üçin "📱 Habarlaş" düwmesine basyň.`,
        orderMenu
    );
});

// ==================== SARGYT ====================
bot.hears('🛒 Sargyt', (ctx) => {
    const text = 
        '🛒 Sargyt etmek\n\n' +
        'Sargyt etmek üçin aşakdaky maglumatlary iberiň:\n\n' +
        '1️⃣ Harydyn ady (UC / VPN)\n' +
        '2️⃣ Mocberi\n' +
        '3️⃣ Telefon belgiňiz\n\n' +
        '✉️ ýa-da @MrMakeout bilen habarlaşyň';
    ctx.reply(text, orderMenu);
});

// ==================== ŞAHSY OTAG ====================
bot.hears('👤 Şahsy otag', (ctx) => {
    const userId = ctx.from.id;
    const username = ctx.from.username || 'Ýok';
    const firstName = ctx.from.first_name || 'Ulanyjy';
    
    // Bu ýerde database-den okamaly
    const orders = 0; // Database-den okan zat
    const balance = 0; // Database-den okan zat
    
    const text = 
        '👤 Şahsy otag\n\n' +
        `🆔 ID: ${userId}\n` +
        `👤 Adyňyz: ${firstName}\n` +
        `📊 Sargytlaryňyz: ${orders}\n` +
        `💰 Bal: ${balance}`;
    
    ctx.reply(text, menuWithBack);
});

// ==================== HABARLAŞ ====================
bot.hears('📞 Habarlaş', (ctx) => {
    const text = 
        '📞 Habarlaş\n\n' +
        '📱 Telegram: @MrMakeout\n' +
        '📍 Aşgabat şäheri';
    ctx.reply(text, contactMenu);
});

bot.hears('📱 Telegram', (ctx) => {
    ctx.reply(
        '🔗 Telegram kanala geçmek üçin aşakdaky baglanyşyga basyň:\n\nhttps://t.me/MrMakeout',
        Markup.inlineKeyboard([
            Markup.button.url('📱 Telegram', 'https://t.me/MrMakeout'),
            Markup.button.callback('⬅️ Yza', 'back_to_menu')
        ])
    );
});

// ==================== BAL TOPLA ====================
bot.hears('💰 Bal topla', (ctx) => {
    const text = 
        '💰 Bal topla gazan\n\n' +
        '🎁 Her sargyt üçin bal gazanyň!\n\n' +
        '• 100 TMT sargyt — 5 bal\n' +
        '• 500 TMT sargyt — 30 bal\n' +
        '• 1000 TMT sargyt — 70 bal\n\n' +
        '🏆 Bal ygnap, arzanlyklar gazanyň!';
    ctx.reply(text, menuWithBack);
});

// ==================== YZA / MENU ====================
bot.hears('⬅️ Yza', (ctx) => {
    sendWelcome(ctx);
});

bot.hears('⬅️ Menu', (ctx) => {
    sendWelcome(ctx);
});

bot.action('back_to_menu', (ctx) => {
    ctx.deleteMessage();
    sendWelcome(ctx);
});

// ==================== WAGT ====================
bot.command('wagt', (ctx) => {
    const now = new Date();
    const date = now.toLocaleDateString('tr-TR');
    const time = now.toLocaleTimeString('tr-TR');
    ctx.reply(`🕐 Aşgabat wagty: ${date}, ${time}`);
});

// ==================== BAHA ====================
bot.command('baha', (ctx) => {
    ctx.reply('💰 Bahalar 50 manatdan başlaýar.\n\nEsasy menýudan görüp bilersiňiz.', mainMenu);
});

// ==================== INLINE CALLBACKS ====================
bot.action('uc_buy', (ctx) => {
    ctx.deleteMessage();
    let text = '💎 UC Bahalary:\n\n';
    for (const [uc, price] of Object.entries(ucPrices)) {
        text += `• ${uc} — ${price}\n`;
    }
    text += '\n🛒 Sargyt etmek üçin UC saýlaň:';
    ctx.reply(text, ucMenu);
});

// ==================== ERROR HANDLING ====================
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
    ctx.reply('❌ Ýalňyşlyk ýüze çykdy. Täzeden synanyşyň.', mainMenu);
});

// ==================== LAUNCH ====================
bot.launch();

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log('✅ Bot işe başlady!');
