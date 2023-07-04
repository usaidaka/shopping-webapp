const { Product } = require("../../models");

//body sudah masuk sesuai inputan,
// bikin file upload (multer utk upload photo product, nnt di enhance lg bisa nge crop supaya square)

const editProduct = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  console.log(user_id);
  const data = JSON.parse(req.body.data);
  const imageURL = req.file.filename;
  console.log(data);
  console.log(imageURL);
  console.log(id);

  try {
    // const postProduct = await Product.create({});
  } catch (error) {}
};

module.exports = { editProduct };
