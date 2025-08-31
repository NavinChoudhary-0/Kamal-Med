const router = require("express").Router();
const {
  User,
  OrderStatus,
  Product,
  OrderDetail,
  Address,
} = require("../models");

const attributes = ["id", "firstName", "lastName", "email", "contact"];

const getAddress = async (userId) => {
  try {
    const address = await Address.findAll({ where: { userId: userId } });
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
    return [];
  }
};

const getOrderDetails = async (userId) => {
  const allOrderDetails = await OrderDetail.findAll({
    where: { userId: userId }
  });
  const orderProductMapping = {};

  if (allOrderDetails.length > 0) {
    console.log("Orders = ",orders);
    let orders = allOrderDetails.map((u) => u.toJSON());
    let listOfProducts = [];
    orders.forEach((order) => {
      listOfProducts.push(order.productId);
    });
    products = await Product.findAll({
      where: { id: listOfProducts },
    });

    orders.forEach((order) => {
      const product = products.find(
        (product) => product.id === order.productId
      );
      if (!orderProductMapping[order.id]) {
        const orderStatus = OrderStatus.find(
          (status) => status.orderId === order.orderId
        );
        orderProductMapping[order.id] = {};
        orderProductMapping[order.id].id = order.id;
        orderProductMapping[order.id].total = order.cost;
        orderProductMapping[order.id].product = [
          {
            name: product.name,
            image: product.image,
            price: order.cost / order.quantity,
            quantity: order.quantity,
            description: product.description,
          },
        ];
        orderProductMapping[order.id].status = orderStatus.status;
        orderProductMapping[order.id].date = order.createdAt;
        orderProductMapping[order.id].shippingAddress = order.shippingAddress;
        orderProductMapping[order.id].trackingNumber = order.trackingNumber;
      } else {
        orderProductMapping[order.id].total += order.cost;
        orderProductMapping[order.id].product.push({
          name: product.name,
          image: product.image,
          price: order.cost / order.quantity,
          description: product.description,
        });
      }
    });
  }
  return Object.values(orderProductMapping);
};
const formatUserResponse = (user, address) => {
  const { id, firstName, lastName, email, contact } = user;
  return { id, firstName, lastName, email, contact, address };
};
router.post("/addUser", async (req, res) => {
  try {
    if (req.body.sub) {
      const existingUser = await User.findOne({
        where: { sub: req.body.sub },
        attributes: attributes,
      });
      console.log(existingUser);
      if (existingUser) {
        const address = await getAddress(existingUser.id);
        const orders = await getOrderDetails(existingUser.id);
        return res.status(200).json({
          message: "Successfully logged in with Google",
          user: formatUserResponse(existingUser, address),
          orders: orders,
        });
      } else {
        const newUserAdded = await User.create(req.body);
        return res.status(201).json({
          message: "New user created",
          user: formatUserResponse(newUserAdded, []),
        });
      }
    } else {
      if (!req.body.email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const existingEmail = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingEmail) {
        return res.status(409).json({ error: "Email already in use" });
      } else {
        const newUserAdded = await User.create(req.body);
        return res.status(201).json({
          message: "New user created",
          user: newUserAdded,
        });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/checkUserCred", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findAll({ where: { email: email } });
    let user = users.map((u) => u.toJSON());
    if (user.length === 0) {
      return res.status(404).json({ message: "Email not present" });
    }
    user = user[0];
    if (!user.password && user.sub) {
      return res.status(400).json({
        message:
          "This account is linked with Google. Please login using Google, or set up a password to continue.",
      });
    }
    if (user.password === password) {
      const address = await getAddress(user.id);
      const orders = await getOrderDetails(user.id);
      return res.status(200).json({
        message: "Logged in successfully",
        user: formatUserResponse(user, address),
        orders: orders,
      });
    }
    return res.status(401).json({ message: "Password is incorrect" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
