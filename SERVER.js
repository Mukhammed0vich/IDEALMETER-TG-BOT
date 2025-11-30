const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const BOT_TOKEN = '8383326704:AAGa2Z3YnJt9dA6LjZBgxZnDF9WiZR70z1E';
const CHAT_ID = '7650861289'; // Yoki admin chat ID

// Buyurtma qabul qilish
app.post('/api/order', async (req, res) => {
    try {
        const { product, name, phone, address, quantity } = req.body;
        
        const message = `📦 YANGI BUYURTMA!\n\n🛒 Mahsulot: ${product}\n👤 Mijoz: ${name}\n📞 Telefon: ${phone}\n📍 Manzil: ${address}\n🔢 Miqdor: ${quantity}`;
        
        // Telegramga xabar yuborish
        await axios.post(`https://api.telegram.org/bot${8383326704:AAGa2Z3YnJt9dA6LjZBgxZnDF9WiZR70z1E}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        });
        
        res.json({ success: true, message: 'Buyurtma qabul qilindi' });
    } catch (error) {
        console.error('Xatolik:', error);
        res.status(500).json({ success: false, message: 'Xatolik yuz berdi' });
    }
});

// Hisoblagich tekshirish
app.post('/api/check-serial', async (req, res) => {
    try {
        const { serialNumber } = req.body;
        
        // Bu yerda haqiqiy ma'lumotlar bazangiz bilan tekshirishingiz kerak
        const isValid = await checkSerialInDatabase(serialNumber);
        
        res.json({ 
            success: true, 
            isOriginal: isValid,
            serialNumber: serialNumber
        });
    } catch (error) {
        console.error('Xatolik:', error);
        res.status(500).json({ success: false, message: 'Xatolik yuz berdi' });
    }
});

async function checkSerialInDatabase(serialNumber) {
    // Bu yerda ma'lumotlar bazangizdan tekshirishingiz kerak
    // Hozircha simulyatsiya qilamiz
    return serialNumber.startsWith('IM');
}

app.listen(3000, () => {
    console.log('Server 3000-portda ishlamoqda');
});