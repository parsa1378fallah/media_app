const multer = require("multer");
const path = require('path')
let profileName = ""
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/users");
  },
  filename: function (req, file, cb) {
    profileName = req.user.userName + path.extname(file.originalname)
    cb(null, profileName);
  },
});


const uploadImage = multer({ storage: storage }).single("image");

function uploadProfile(req, res, next) {
  uploadImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err });
    }
    req.profileName = profileName ;
    next();
  });
}

module.exports = {
  uploadProfile,
};
