const {
  OrderStatus,
  Product,
  OrderDetail,
  Address,
} = require("../models");

const getAddress = async (userId) => {
  try {
    const address = await Address.findAll({ where: { userId: userId } });
    console.log(address)
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

module.exports = { getAddress, getOrderDetails, formatUserResponse };