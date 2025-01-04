const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust the path if needed

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://gir:1@cluster0.ajxxi2q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  })
  .then(() => {
    console.log("Connected to MongoDB");
    runTests();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Function to run tests
async function runTests() {
  try {
    // Create a test user
    const newUser = new User({
      name: "John Doe",
      id: "U12345",
      branch: "Computer Science",
      uniMailId: "johndoe@university.edu",
      password: "securepassword",
      role: "student",
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    // Test password hashing
    console.log("Stored hashed password:", savedUser.password);
    console.log(
      "Password hashing test:",
      savedUser.password !== "securepassword"
        ? "Pass"
        : "Fail (password not hashed)"
    );

    // Test password verification
    const isPasswordValid = await savedUser.verifyPassword("securepassword");
    console.log("Password verification test:", isPasswordValid ? "Pass" : "Fail");

    // Test invalid password
    const isPasswordInvalid = await savedUser.verifyPassword("wrongpassword");
    console.log(
      "Invalid password test:",
      !isPasswordInvalid ? "Pass" : "Fail (password validation incorrect)"
    );

    // Cleanup: Remove the test user from the database
    await User.deleteOne({ _id: savedUser._id });
    console.log("Test user removed successfully.");

    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error during testing:", err);
    mongoose.connection.close();
  }
}
