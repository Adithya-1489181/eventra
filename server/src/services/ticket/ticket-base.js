const PDFDocument = require('pdfkit');
const qrcode = require('./qrcode-genrator');

function generateTicket(ticketData) {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A6', margin: 20 }); // Small ticket size
            const chunks = [];

            // Collect PDF data in memory
            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Ticket Header
            doc.fontSize(18).text(ticketData.eventName, { align: 'center', underline: true });
            doc.moveDown();

            // Ticket Details
            doc.fontSize(12).text(`Date: ${ticketData.date}`);
            doc.text(`Venue: ${ticketData.venue}`);
            doc.text(`Ticket Id: ${ticketData.ticketId}`);
            doc.text(`Holder: ${ticketData.holderName}`);
            doc.moveDown();

            const ticketQR = await qrcode.generateQRCode(ticketData.ticketId);
            doc.image(ticketQR, { fit: [150, 150], align: 'center' });

            doc.fontSize(10).text('Please present this ticket at the entrance.', { align: 'center' });

            // Finalize PDF
            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {generateTicket};
