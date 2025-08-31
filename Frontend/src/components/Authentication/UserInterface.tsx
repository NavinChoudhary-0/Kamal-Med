import { useState, useEffect } from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  ShoppingBag,
  Truck,
  CheckCircle,
  Clock,
  X,
  Star,
  Edit3,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useUser } from "../../Provider/UserContext";
import Order from "../../interfaces/Order";
import Product from "../../interfaces/Product";
import AddressInterface from "../AddressInterface";

const UserAccountPage = () => {
  const { user, orders, setUser, loggedIn } = useUser();
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderFilter, setOrderFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    isDefault: false,
    type: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("New Address:", newAddress);
    // TODO: send to backend or update state
    setShowAddressForm(false);
    setNewAddress({
      address: "",
      isDefault: false,
      type: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter((order: Order) => {
    const matchesFilter = orderFilter === "all" || order.status === orderFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const handleReorder = (order: Order) => {
    console.log("Reordering:", order);
    // Implement reorder functionality
  };

  const handleTrackOrder = (order: Order) => {
    console.log("Tracking order:", order.trackingNumber);
    // Implement order tracking
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log("Downloading invoice for:", order.id);
    // Implement invoice download
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Loading your account...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">ShopCart</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>
                <span className="text-gray-700 font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700 p-2">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <div className="mt-4 flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {user.totalOrders}
                    </div>
                    <div className="text-gray-600">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">
                      {user.loyaltyPoints}
                    </div>
                    <div className="text-gray-600">Points</div>
                  </div>
                </div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "orders", label: "Order History", icon: Package },
                  { id: "profile", label: "Profile", icon: User },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  {
                    id: "payments",
                    label: "Payment Methods",
                    icon: CreditCard,
                  },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Order History Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Order History
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Track and manage your orders
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search orders..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={orderFilter}
                        onChange={(e) => setOrderFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Orders</option>
                        <option value="delivered">Delivered</option>
                        <option value="shipped">Shipped</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No orders found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="p-4 bg-gray-50 border-b">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div>
                                  <div className="font-semibold text-gray-900">
                                    {order.id}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Placed on{" "}
                                    {new Date(order.date).toLocaleDateString()}
                                  </div>
                                </div>
                                <div
                                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusIcon(order.status)}
                                  <span className="capitalize">
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">
                                    ${order.total.toFixed(2)}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {order.products.length} items
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    setExpandedOrder(
                                      expandedOrder === order.id
                                        ? null
                                        : order.id
                                    )
                                  }
                                  className="p-1 hover:bg-gray-200 rounded"
                                >
                                  {expandedOrder === order.id ? (
                                    <ChevronDown className="w-4 h-4" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          {expandedOrder === order.id && (
                            <div className="p-4 space-y-4">
                              {/* Order Items */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Order Items
                                </h4>
                                <div className="space-y-3">
                                  {order.products.map((item: Product) => (
                                    <div
                                      key={item.id}
                                      className="flex items-center space-x-3"
                                    >
                                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                        {item.image}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                          {item.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          Qty: {item.quantity}
                                        </div>
                                      </div>
                                      <div className="font-medium text-gray-900">
                                        $
                                        {(
                                          Number(item.price) *
                                          Number(item.quantity)
                                        ).toFixed(2)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Shipping Info */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                  Shipping Address
                                </h4>
                                <p className="text-gray-600">
                                  {order.shippingAddress}
                                </p>
                              </div>

                              {/* Tracking Info */}
                              {order.trackingNumber && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2">
                                    Tracking Information
                                  </h4>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-gray-600">
                                      Tracking Number:
                                    </span>
                                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                      {order.trackingNumber}
                                    </span>
                                  </div>
                                  {order.estimatedDelivery && (
                                    <div className="mt-1 text-sm text-gray-600">
                                      Expected:{" "}
                                      {new Date(
                                        order.estimatedDelivery
                                      ).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex space-x-3 pt-3 border-t">
                                {order.status === "delivered" && (
                                  <>
                                    <button
                                      onClick={() => handleReorder(order)}
                                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                      <ShoppingBag className="w-4 h-4" />
                                      <span>Reorder</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                      <Star className="w-4 h-4" />
                                      <span>Rate Items</span>
                                    </button>
                                  </>
                                )}
                                {order.status === "shipped" && (
                                  <button
                                    onClick={() => handleTrackOrder(order)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    <Truck className="w-4 h-4" />
                                    <span>Track Order</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDownloadInvoice(order)}
                                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <Download className="w-4 h-4" />
                                  <span>Download Invoice</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Profile Information
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Manage your personal details
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>
                      {isEditingProfile ? "Save Changes" : "Edit Profile"}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={user.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUser({ ...user, firstName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.firstName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) =>
                          setUser({ ...user, lastName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.lastName}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="tel"
                        value={user.contact || ""}
                        onChange={(e) =>
                          setUser({ ...user, contact: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        {user.contact}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Account Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {user.totalOrders}
                      </div>
                      <div className="text-gray-600">Total Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${user.totalSpent.toFixed(2)}
                      </div>
                      <div className="text-gray-600">Total Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {user.loyaltyPoints}
                      </div>
                      <div className="text-gray-600">Loyalty Points</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && <AddressInterface/>}

            {/* {activeTab === "payments" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Methods
                </h2>
                <div className="space-y-4">
                  {user.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                          <div>
                            <div className="font-medium text-gray-900">
                              {method.brand} ending in {method.lastFour}
                            </div>
                            <div className="text-gray-600 text-sm">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </div>
                          </div>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {["notifications", "settings"].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {activeTab === "notifications"
                    ? "Notification Settings"
                    : "Account Settings"}
                </h2>
                <p className="text-gray-600">This section is coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
