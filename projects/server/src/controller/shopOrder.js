const addOrderShop = (req, res) => {
  const user = req.user;
  console.log(user);
  res.json({
    msg: "hello",
  });
};

module.exports = {
  addOrderShop,
};
