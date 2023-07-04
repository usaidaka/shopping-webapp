const { Product, User } = require("../../models");

//body sudah masuk sesuai inputan,
// bikin file upload (multer utk upload photo product, nnt di enhance lg bisa nge crop supaya square)

const editProduct = async (req, res) => {
  const user_id = req.user.userId;
  console.log(user_id);
  const data = JSON.parse(req.body.data);
  const imageURL = req.file.filename;
  console.log(data);
  console.log(imageURL);
  try {
    // const postProduct = await Product.create({});
  } catch (error) {}
};

const createProduct = async (req, res) => {
  try {
      const data = JSON.parse(req.body.data)

      // if(!data) {
      //     return res.status(400).send({
      //         message: "data not found"
      //     })
      // }

      // const userData = await User.findOne({
      //     where: {
      //         username: req.user.username,
      //         email: req.user.email
      //     }
      // })

      // if(!userData){
      //     return res.status(400).send({
      //         message: "user not found"
      //     })
      // }

      //bisa bikin error handling untuk ngecek apakah category yang di input user exist
      const imageURL = req.file.filename
      console.log(imageURL)

      const result = await Product.create({
          // user_id: userData.id,
          category_id: data.category_id,
          name_item: data.name_item,
          product_description: data.product_description,
          image_product: `/static/${imageURL}`,
          price: data.price,
          status: data.status
      })

      res.status(200).send({
          message: "success add a product",
          data: result
      })
  } catch (error) {
      res.status(500).send({
          message: "server error",
          error: error.message
      })
  }
}

const getProducts = async (req, res) => {
  const pagination = {
      page: Number(req.query.page) || 1,
      perPage: 9,
      catId: req.query.category || undefined,
      search: req.query.search || undefined,
      sortBy: req.query.sortBy
  }

  try {
      const where = {}
      if (pagination.search) {
          where.name_item = {
              [db.Sequelize.Op.like]: `%${pagination.search}%`
          }
      }

      if (pagination.catId) {
          where.category_id = {
              [db.Sequelize.Op.like]: pagination.catId
          }
      }

      const order = []
      for (const sort in pagination.sortBy) {
          order.push([sort, pagination.sortBy[sort]])
      }

      const result = await db.Product.findAll({
          include: [
              {
                  model: db.Category,
                  attributes: ["category_name"]
              }
          ],
          where,
          limit: pagination.perPage,
          offset: (pagination.page - 1) * pagination.perPage,
          order
      })

      const totalProduct = await db.Product.count({where})

      res.status(200).send({
          message: "success get products",
          pagination: {
              ...pagination,
              totalData: totalProduct
          },
          data: result
      })
  } catch (error) {
      res.status(500).send({
          message: "server error",
          error: error.message
      })
  }
  
}
module.exports = { editProduct, createProduct, getProducts };
