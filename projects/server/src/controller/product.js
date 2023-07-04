const { Product } = require("../../models");

//body sudah masuk sesuai inputan,
// bikin file upload (multer utk upload photo product, nnt di enhance lg bisa nge crop supaya square)

const editProduct = async (req, res) => {
  //   const user_id = req.user.userId;
  //   console.log(user_id);
  const { name_item, category_id, product_description, price, status } =
    req.body;
  console.log("item", name_item);
  console.log("cat", category_id);
  console.log("desc", product_description);
  console.log("price", price);
  console.log("status", status);
  try {
    // const postProduct = await Product.create({});
  } catch (error) {}
};

module.exports = { editProduct };
