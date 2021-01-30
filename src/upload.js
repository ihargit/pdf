const multer = require('multer');

const getFormDataMW = (path) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    },
  });
  return multer(path && { storage: storage });
};

module.exports = { getFormDataMW };
