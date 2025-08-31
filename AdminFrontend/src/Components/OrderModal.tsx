import { useState, useEffect } from 'react';
import { Package, XCircle, Calendar, DollarSign, User, Phone, Mail, MapPin, Clock } from 'lucide-react';
import {StatusBadge} from '../config/StatusBadge';
import Order from '../interface/Order';

function getUserInfo(userId: number) : User{
    const UserInfo = {
      id: userId,
      name: 'John Doe',
      email: 'navinchoudhary6969@gmail.com',
      phone: '+91-8003935580',
      address: '123 Main St, Anytown, USA',
      orderId: 1,
      role: 'admin'
    }
    return UserInfo;
  }
  
  interface OrderModalProps  {
    order: Order;
    isOpen: boolean;
    onClose: () => void;
    onUpdateStatus: (orderId: string, newStatus: string) => void;
  }

const OrderModal = ({ order, isOpen, onClose, onUpdateStatus }: OrderModalProps) => {
    const [newStatus, setNewStatus] = useState(order?.status || '');
  
    useEffect(() => {
      setNewStatus(order?.status || '');
    }, [order]);
  
    if (!isOpen || !order) return null;
  
    const handleUpdateStatus = () => {
      onUpdateStatus(order.id, newStatus);
      onClose();
    };
    const userData:User = getUserInfo(order.userId);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details - {order.id}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
  
          <div className="p-6 space-y-6">
            {/* Order Status Update */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Update Order Status</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as "pending" | "confirmed" | "shipped" | "delivered" | "cancelled")}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={handleUpdateStatus}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update Status
                </button>
              </div>
            </div>
  
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Order Date:</strong> {order.orderDate}</p>
                  <p><strong>Status:</strong> <StatusBadge status={order.status} /></p>
                  <p><strong>Total Amount:</strong> ${order.total.toFixed(2)}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                </div>
              </div>
  
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Customer Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {userData.email}
                  </p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {userData.phone}
                  </p>
                </div>
              </div>
            </div>
  
            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </h3>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p>{userData.address}</p>
              </div>
            </div>
  
            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Product</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Price</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Quantity</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm">${item}</td>
                        {/* <td className="px-4 py-2 text-sm">{item.name}</td>
                        <td className="px-4 py-2 text-sm">${item.price}</td>
                        <td className="px-4 py-2 text-sm">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm font-medium">${item.totalPrice}</td> */}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-sm font-medium text-right">Total:</td>
                      <td className="px-4 py-2 text-sm font-bold">${order.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default OrderModal;