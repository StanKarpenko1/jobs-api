import axios from "axios";
import { User } from "../../../src/models/User";

/**
 * Seed a user in the database using the register API endpoint.
 * @param userData - The user data to seed.
 * @param apiBaseUrl - The base URL of the API.
 * @returns The response data from the register API.
 */
export const seedUser = async (userData: { name: string; email: string; password: string }, apiBaseUrl: string) => {
  try {
    // Send a POST request to the /auth/register endpoint
    const { data } = await axios.post(`${apiBaseUrl}/auth/register`, userData);
    return data; // Return the seeded user data
  } catch (error: any) {
    console.error("Error seeding user:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Delete a user directly from the database.
 * @param userId - The ID of the user to delete.
 * @returns Success status or error message.
 */
export const deleteUser = async (userId: string) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      return { success: false, message: `User with ID ${userId} not found` };
    }
    return { success: true, userId };
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};
