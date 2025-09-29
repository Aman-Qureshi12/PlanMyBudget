import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const password = process.env.MONGODB_PASSWORD;
    await mongoose.connect(
      `mongodb+srv://amaanq08:${password}@budgetplanner.gvwe3z8.mongodb.net/?retryWrites=true&w=majority&appName=BudgetPlanner`
    );
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log("There was an error connecting to the database ", error);
  }
};

// kUrpPlxK56RkRXBE  -- password

// amaanq08
