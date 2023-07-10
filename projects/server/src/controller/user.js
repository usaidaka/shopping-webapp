const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../../models");
const fs = require("fs");
const { User, Product, Cart, OrderLine, ShopOrder } = require("../../models");

const register = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const {
      username,
      email,
      phone,
      store_name,
      image_profile,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({
        ok: false,
        message: "password and confirm password have to match",
      });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const isEmailExist = await User.findOne({ where: { email } });
    const isUsernameExist = await User.findOne({ where: { username } });
    const isPhoneExist = await User.findOne({ where: { phone } });
    const isStoreExist = await User.findOne({ where: { store_name } });

    if (isUsernameExist) {
      await t.rollback();
      return res.status(409).json({
        ok: false,
        message: "username already used",
      });
    }

    if (isEmailExist) {
      await t.rollback();

      return res.status(409).json({
        ok: false,
        message: "email already used",
      });
    }

    if (isPhoneExist) {
      await t.rollback();

      return res.status(409).json({
        ok: false,
        message: "phone already used",
      });
    }

    if (isStoreExist) {
      await t.rollback();

      return res.status(409).json({
        ok: false,
        message: "store name already used",
      });
    }

    await User.create(
      {
        username: username,
        email: email,
        phone: phone,
        store_name: store_name,
        image_profile: image_profile,
        password: hashPassword,
      },
      { transaction: t }
    );

    const data = await User.findOne({
      where: { email: email, username: username },
    });

    if (data) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        message: "account already exist",
      });
    }

    await t.commit();
    res.status(201).json({
      ok: true,
      message: "congrats! register successful",
      data,
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "something bad happen",
    });
  }
};

const login = async (req, res) => {
  try {
    const { user_identification, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: user_identification },
          { phone: user_identification },
          { username: user_identification },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "user unauthorized",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        ok: false,
        message: "wrong password",
      });
    }

    const userId = user.id;
    const username = user.username;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      ok: true,
      message: "welcome to your blog",
      isAccountExist: user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      ok: false,
      message: "Account not found",
    });
  }
};

const getUserInformation = async (req, res) => {
  const user = req.user;
  try {
    const result = await User.findOne({ where: { id: user.userId } });
    res.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

// const closeAccount = async (req, res) => {
//   const user_id = req.user.userId;

//   try {
//     const user = await User.findOne({
//       where: {
//         id: user_id,
//       },
//     });

//     if (!user) {
//       return res.status(403).json({
//         ok: false,
//         message: "User Not Found",
//       });
//     }

//     if (user) {
//       const isUserExist = await User.destroy({
//         where: { id: user_id },
//       });
//       if (!isUserExist) {
//         return res.status(400).json({
//           ok: false,
//           message: "close account failed",
//         });
//       }
//     }

//     if (!user_id) {
//       return res.status(403).json({
//         ok: false,
//         message: "User unauthorized",
//       });
//     }
//     const isProductExist = await Product.findAll({
//       user_id: user_id,
//     });
//     if (isProductExist.length > 0) {
//       for (const product of isProductExist) {
//         const imageURL = product.getDataValue("image_product");
//         if (imageURL) {
//           const imageName = imageURL.split("/")[1];
//           fs.unlinkSync(`${__dirname}/../../Public/product/${imageName}`);
//         }
//       }

//       const destroyProduct = await Product.destroy({
//         where: { user_id: user_id },
//       });
//       if (!destroyProduct) {
//         return res.status(400).json({
//           ok: false,
//           message: "destroy user's product failed",
//         });
//       }
//     }

//     const isCartExist = await Cart.findOne({
//       user_id: user_id,
//     });
//     if (isCartExist) {
//       const destroyCart = await Cart.destroy({
//         where: { user_id: user_id },
//       });
//       await Cart.destroy({
//         include: { model: Product, where: { user_id: user_id } },
//       });
//       if (!destroyCart) {
//         return res.status(400).json({
//           ok: false,
//           message: "destroy user's cart failed",
//         });
//       }
//     }

//     const findUserShopOrder = await ShopOrder.findOne({ user_id: user_id });

//     const order_id = findUserShopOrder.id;
//     console.log("order_id", order_id);

//     const isOrderLineExist = await OrderLine.findOne({
//       where: { order_id: order_id },
//     });
//     console.log("isOrderLineExist", isOrderLineExist);
//     if (isOrderLineExist) {
//       const destroyOrderLineExist = await OrderLine.destroy({
//         where: { order_id: Number(order_id) },
//       });
//       if (!destroyOrderLineExist) {
//         return res.status(400).json({
//           ok: false,
//           message: "destroy user's order line failed",
//         });
//       }
//     }
//     const isShopOrderExist = await ShopOrder.findOne({
//       where: { user_id: user_id },
//     });
//     if (isShopOrderExist) {
//       const destroyShopOrder = await ShopOrder.destroy({
//         where: { user_id: user_id },
//       });
//       if (!destroyShopOrder) {
//         return res.status(400).json({
//           ok: false,
//           message: "destroy user's shop order failed",
//         });
//       }
//     }

//     res.json({
//       ok: true,
//       message: "user successfully deleted",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       message: error.message,
//     });
//   }
// };

module.exports = {
  register,
  login,
  getUserInformation,
  // closeAccount,
};
