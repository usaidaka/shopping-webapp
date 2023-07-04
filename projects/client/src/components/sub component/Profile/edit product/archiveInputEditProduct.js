// try {
//   const response = await axios.post(`/profile/my-store/create-product`, {
//     name_item: values.name_item,
//     category_id: selectedCategory,
//     product_description: values.product_description,
//     price: price,
//     status: toggleValue,
//   });
//   console.log(selectedCategory);

//   if (response.status === 201) {
//     setStatus({ success: true });
//     setValues({
//       name_item: "",
//       category_id: "select a category",
//       product_description: "",
//       price: "",
//       status: "",
//     });
//     axios
//       .get("/profile/my-store/category")
//       .then((res) => setCategories(res.data.result));
//     setSelectedCategory("select a category");
//     setErrMsg(null);
//   } else {
//     setSelectedCategory("select a category");
//     throw new Error("Change category failed");
//   }
// } catch (error) {
//   console.log(error);
//   setValues({
//     name_item: "",
//     category_id: "select a category",
//     product_description: "",
//     price: "",
//     status: "",
//   });
//   if (!error.response) {
//     setSelectedCategory("select a category");
//     setErrMsg("No Server Response");
//   } else if (
//     error.response?.data?.message === "you have not choose any category yet"
//   ) {
//     setSelectedCategory("select a category");
//     setErrMsg("you have not choose any category yet");
//   } else if (
//     error.response?.data?.message ===
//     "category already exist, please choose one"
//   ) {
//     setSelectedCategory("select a category");
//     setErrMsg("category already exist, please choose one");
//   } else if (
//     error.response?.data?.message === "new category name cannot be empty"
//   ) {
//     setSelectedCategory("select a category");
//     setErrMsg("new category name cannot be empty");
//   } else {
//     setErrMsg("something bad happen");
//   }
// }
