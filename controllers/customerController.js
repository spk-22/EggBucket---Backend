import { getFirestore } from "firebase-admin/firestore"

const mainCollection = "Customer"

const newUser = async (req, res) => {

  try{
  const { name, phone, email, addresses, timeOfCreation, age, gender } = req.body;

  // Assuming `addresses` is an array of objects each containing the address and coordinates
  // Example: addresses = [{ fullAddress: '123 St', coordinates: { lat: 12.34, long: 56.78 } }]
  
  const db = getFirestore();
  await db.collection(mainCollection).doc(name.split(' ')[0]+"_"+phone).set({
    name,
    phone,
    email,
    age, // New field
    gender, // New field
    totalExpenditure: 0, // Initialize as 0 and update this with each new order
    addresses, // Array of address objects with full address and coordinates (lat, long)
    timeOfCreation
  });

  res.status(200).json({ message: "User created with age, gender, totalExpenditure, and geospatial addresses" });
} 
catch (err){
  res.status(400).json({
    message:"failed to create user"
  })
}

}

export { newUser };
