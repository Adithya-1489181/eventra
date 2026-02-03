const QRCode = require('qrcode');

async function generateQRCode(data,outputFile) {
    try {
        if (typeof(data)!=='string'||data.trim() === '') {
            throw new Error("Invalid ticketId");
        }
       // Generate QR code as data URL instead of file
        const qrDataURL = await QRCode.toDataURL(data, {
            color: { dark: '#000000', light: '#ffffff' },
            width: 300
        });
        return qrDataURL;
    } catch (error) {
        console.log('\nError Generating QR Code',error);
    }
}

module.exports = {generateQRCode};