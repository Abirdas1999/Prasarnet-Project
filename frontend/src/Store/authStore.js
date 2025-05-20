import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Make sure this matches your backend route

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isCheckingAuth: false, 
	message: null,

	signup: async ({ name, email, phone, address }) => {
		set({ error: null });

		try {
			const response = await axios.post(`${API_URL}/signup`, {
				name,
				email,
				phone,
				address,
			});

			// Adjust according to what the backend returns — assuming "user"
			set({
				user: response.data.user || null,
				isAuthenticated: true,
			});

			return response.data;
		} catch (error) {
			set({
				error:
					error?.response?.data?.message ||
					error.message ||
					"Error signing up",
			});
			throw error;
		}
	},

	verifyOtp: async (code) => {
		set({ error: null });

		try {
			const response = await axios.post(`${API_URL}/verification`, { code });

			set({
				user: response.data.user || null,
				isAuthenticated: true,
			});

			return response.data;
		} catch (error) {
			set({
				error:
					error?.response?.data?.message ||
					error.message ||
					"Error verifying OTP",
			});
			throw error;
		}
	},
}));
