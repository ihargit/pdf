const pdf = require('pdfjs');
const fs = require('fs');

async function makePdf({ text, file }) {
  const doc = new pdf.Document({
    font: require('pdfjs/font/Helvetica'),
    padding: 10,
  });
  doc.pipe(fs.createWriteStream(`./tmp/pdfs/${Date.now()}_output.pdf`));

  const header = doc.header();
  header.text(text || 'This is a header');
  doc.text('Hello World');

  await doc.end();
}

module.exports = { makePdf };
