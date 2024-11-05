import { getFirestore } from "firebase-admin/firestore";
import { sendNotification } from "./outletController.js";

const mainCollection = "Order";

const newOrder = async (req, res) => {
  const {
    location, // Contains address and coordinates
    amount, // Total amount of the order
    products, // Object containing quantities of products
    createdAt, // Timestamp for order creation
    updatedAt, // Timestamp for order update
    outletId, // ID of the outlet
    customerName, // Name of the customer
    customerId, // ID of the customer
    deliveryPartnerId // ID of the delivery partner
  } = req.body;

  // Generate a unique ID for the order
  const id = `${customerName.split(' ')[0]}-${createdAt}`;

  const db = getFirestore();
  try {
    await db.collection(mainCollection).doc(id).set({
      location, // Address and coordinates
      amount, // Total amount of the order
      products, // Object with product quantities (E6, E12, E30)
      createdAt, // Timestamp for order creation
      updatedAt, // Timestamp for order update
      outletId, // ID of the outlet
      customerName, // Name of the customer
      customerId, // ID of the customer
      deliveryPartnerId // ID of the delivery partner
    });

    res.status(200).json({ message: "Order created" });

    // Sending notifications
    // sendNotification(outletId, location.address, id);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export { newOrder }
