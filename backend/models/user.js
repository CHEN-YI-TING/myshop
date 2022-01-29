const { DataTypes } = require("sequelize");
const sequelize = require("../database/dbconfig");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "請輸入姓名",
        },
        len: [4, 12],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "請輸入你的Email",
        },
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "請輸入你的密碼",
          len: [5, 20],
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  },
  {
    freezeTableName: true,
  }
);

User.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

User.login = async (username, email, password) => {
  try{
    const user = await User.findOne({
      where: { username: username, email: email },
    });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      return new Error("密碼錯誤");
    }
  }catch(err){
    throw new Error("不好意思，您尚未註冊帳號");
  }
};

module.exports = User;
