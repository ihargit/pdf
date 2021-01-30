const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function modifyPdf({ text, file }) {
  const sourcePath = path.join(
    process.cwd(),
    '/tmp/pdfs/1611996130704_output.pdf'
  );
  const resultPath = path.join(process.cwd(), '/tmp/pdfs/output.pdf');
  const existingPdfBytes = await fs.promises.readFile(sourcePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  // console.log(pages);
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  // Draw a string of text diagonally across the first page
  firstPage.drawText(text, {
    x: 20,
    y: height / 2 + 300,
    size: 40,
    font: helveticaFont,
    maxWidth: 400,
    lineHeight: 60,
    // color: rgb(0.95, 0.1, 0.1),
    // rotate: degrees(-45),
  });

  // Draw image
  const pngImage = await pdfDoc.embedPng(file);
  const pngDims = pngImage.scale(0.9);
  firstPage.drawImage(pngImage, {
    x: 20,
    y: height / 2 + 200 - pngDims.height,
    width: pngDims.width,
    height: pngDims.height,
  })
  // console.log(pngImage);

  const pdfBytes = await pdfDoc.save();
  // return pdfBytes;
  await fs.createWriteStream(resultPath).write(pdfBytes);
}

module.exports = { modifyPdf };
