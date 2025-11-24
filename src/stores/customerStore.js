import { create } from "zustand";

const useCustomerStore = create((set) => ({
  customerInfo: {
    storeName: "",
    location: "",
    customerName: "",
    contactPerson: "",
    deliveryDate: "",
    remarks: "",
    attachment: null, // NEW
  },

  setCustomerInfo: (key, value) =>
    set((state) => ({
      customerInfo: {
        ...state.customerInfo,
        [key]: value,
      },
    })),

  clearCustomerInfo: () =>
    set({
      customerInfo: {
        storeName: "",
        location: "",
        customerName: "",
        contactPerson: "",
        deliveryDate: "",
        remarks: "",
        attachment: null,
      },
    }),
}));

export default useCustomerStore;
