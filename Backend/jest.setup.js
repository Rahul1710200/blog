import mongoose from "mongoose";

// Connect to your actual MongoDB instance
beforeAll(async () => {
  const uri = process.env.MONGO_URI; // Use your MongoDB connection string
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();
});
