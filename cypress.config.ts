import { defineConfig } from "cypress";
import { seedUser, deleteUser } from "./cypress/tests/utils/userUtils";
import { User } from './src/models/User'
import connectDB from "./src/db/connect";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      const apiBaseUrl = "http://localhost:9000/api/v1"
      const dbUrl = process.env.MONGO_URL || "mongodb+srv://karpenkostas:monDB1307@cluster0.mqu1iex.mongodb.net/jobs-api?retryWrites=true&w=majority";

      // implement node event listeners here
      on("task", {
        async seedUser(userData) {
          const data = await seedUser(userData, apiBaseUrl);
          return data;
        },
        async deleteTestingUser(userId) {
          return await deleteUser (userId); // Use the deleteUser utility
        },

        async connectToDb() {
          try {
            await connectDB(dbUrl);
            console.log("Connected to the database");
            return null; // Tasks must return something, even if it's null
          } catch (error) {
            console.error("Error connecting to the database:", error);
            throw error;
          }
        },
        async findUserByEmail(email) {
          try {
            const user = await User.findOne({ email });
            return user || null;
          } catch (error) {
            console.error("Error finding user:", error);
            throw error;
          }
        },

      });
    },
    baseUrl: "http://localhost:9000/api/v1",
    specPattern: "cypress/tests/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.ts",
  },
});
