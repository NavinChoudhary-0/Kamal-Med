import React, { useState } from "react";
import { useUser } from "../Provider/UserContext";
import {
  Edit3,
  Plus,
  MapPin,
  X,
  Home,
  Building,
  Trash2,
  MapPinIcon,
} from "lucide-react";
import Address from "../interfaces/Address";

const AddressInterface = () => {
  const { user } = useUser();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Address>({
    id: "",
    address: "",
    type: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false,
  });
  const [address, setAddress] = useState<Address[]>(user.address);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate required fields
    if (
      !newAddress.address ||
      !newAddress.type ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.postalCode
    ) {
      return;
    }

    if (editingAddress) {
      // Update existing address
      const updatedAddresses = address.map((addr) => {
        if (addr.id === editingAddress.id) {
          return { ...newAddress, id: editingAddress.id };
        }
        // If new address is set as default, remove default from others
        return newAddress.isDefault ? { ...addr, isDefault: false } : addr;
      });

      setAddress(updatedAddresses);
      setEditingAddress(null);
    } else {
      const addressToAdd = {
        ...newAddress,
        id: String(Date.now()),
      };

      const updatedAddresses = newAddress.isDefault
        ? address.map((addr) => ({ ...addr, isDefault: false }))
        : address;
      setAddress([...updatedAddresses, addressToAdd]);
    }

    setNewAddress({
      id: "",
      address: "",
      type: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const handleCancel = () => {
    setNewAddress({
      id: "",
      address: "",
      type: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false,
    });
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setNewAddress({
      id: address.id,
      address: address.address,
      type: address.type,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDelete = (addressId: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddress((address) => [
        ...address.filter((addr) => addr.id !== addressId),
      ]);
    }
  };
  const getAddressIcon = (type: String) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "home") return Home;
    if (lowerType === "office" || lowerType === "work") return Building;
    // For any custom types, use MapPinIcon as default
    return MapPinIcon;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-bold text-white">
                  Saved Addresses
                </h2>
              </div>
              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-sm"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Address</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Address List */}
            {!showAddressForm && (
              <div className="space-y-6">
                {address && address.length > 0 ? (
                  address.map((address) => {
                    const IconComponent = getAddressIcon(address.type);
                    return (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-gray-50"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-xl font-semibold text-gray-900">
                                  {address.type}
                                </span>
                                {address.isDefault && (
                                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="text-gray-700 leading-relaxed">
                                <div className="font-medium">
                                  {address.address}
                                </div>
                                <div className="text-gray-600">
                                  {address.city}, {address.state}{" "}
                                  {address.postalCode}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(address)}
                              className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                              title="Edit address"
                            >
                              <Edit3 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(address.id)}
                              className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                              title="Delete address"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No addresses saved yet
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Add your first address to make ordering faster and easier
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Add Address Form Modal */}
            {showAddressForm && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    {editingAddress ? (
                      <Edit3 className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-blue-600" />
                    )}
                    <span>
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </span>
                  </h3>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Address Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Address Type
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Home", "Office"].map((type) => {
                        const IconComponent = getAddressIcon(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() =>
                              setNewAddress((prev) => ({ ...prev, type }))
                            }
                            className={`p-4 border-2 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                              newAddress.type === type
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300 text-gray-700"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />

                            <span className="font-medium">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                    {newAddress.type !== "Home" &&
                      newAddress.type !== "Office" && (
                        <input
                          type="text"
                          name="type"
                          value={newAddress.type}
                          onChange={handleChange}
                          className="mt-3 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Or enter custom type (e.g., Friend's House)"
                        />
                      )}
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newAddress.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your address"
                      required
                    />
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      PinCode *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={newAddress.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter postal code"
                      required
                    />
                  </div>

                  {/* Default Address Checkbox */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <input
                        id="isDefault"
                        type="checkbox"
                        name="isDefault"
                        checked={newAddress.isDefault}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="isDefault"
                        className="ml-3 text-sm font-medium text-gray-700"
                      >
                        Set as default delivery address
                      </label>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 ml-8">
                      This address will be selected automatically for future
                      orders
                    </p>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={
                        !newAddress.address ||
                        !newAddress.type ||
                        !newAddress.city ||
                        !newAddress.state ||
                        !newAddress.postalCode
                      }
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
                    >
                      {editingAddress ? "Update Address" : "Save Address"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInterface;
