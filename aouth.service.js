const userSchema = require("../model/aouth.schema");
const bcrypt = require("bcrypt");

const AuthService = {
  login: async function (name, password) {
    const user = await userSchema.findOne({ name: name });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  },

  updateData: async function (id, topic) {
    try {
      const result = await userSchema
        .findByIdAndUpdate(id, topic, { new: true })
        .exec();
      console.log("data", result);
      return result;
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  },

  deleteData: function (id) {
    const result = userSchema.findByIdAndDelete(id);
    return result;
  },

  updateCollection: async function (id, topic) {
    try {
      let result = await userSchema
        .findByIdAndUpdate(id, topic, { new: true })
        .exec();
      // let resuls = await bcrypt.hash(topic.password, 10);

      console.log("data", result);
      return resul;
      // return a;
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  },
};

module.exports = AuthService;
