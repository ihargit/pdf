var express = require('express');
const { getFormDataMW } = require('./upload');
const { makePdf, modifyPdf } = require('./pdf');
const path = './tmp/uploads';
const upload = getFormDataMW(); // might be used with path
const app = express();

app.use(express.urlencoded());
app.post('/', upload.single('file'), async (req, res) => {
  // makePdf(req.body.text);
  const resultPdfBinary = await modifyPdf({ text, file: buffer });
  // const base64Result = Buffer.from(resultPdfBinary).toString('base64');
  res.send('123');
});

app.listen('3000');
