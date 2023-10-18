const controller = require("../controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = new (class extends controller {
  async search(req, res) {
    const key = req.params.key;
    let data = await this.User.find({
     "$or": [
        { firstName: { $regex: key } },
        { lastName: { $regex: key } },
        { userName: { $regex: key } },
      ],
    });
    this.response({ res, message: "searchabr items are here", data: { data } });
  }
})();
