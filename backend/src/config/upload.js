const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      if (fileExtension == '.pdf') {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads/pdfs'));
      }
      else {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads/images'));
      }
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = path.basename(file.originalname, fileExtension);
      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    }
  })
};