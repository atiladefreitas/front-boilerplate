import { User } from "@/types/user";
import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "auth_token";
const USER_STORAGE_KEY = "user_data";

// Mock users database
export const MOCK_USERS = [
	{
		id: "1",
		email: "test@ex.com",
		password: "123456", // In real app, this would be hashed
		username: "Test User",
		role: "admin",
	},
	{
		id: "2",
		email: "user@example.com",
		password: "123456",
		username: "Regular User",
		role: "user",
	},
];

export const getStoredToken = () => Cookies.get(TOKEN_COOKIE_NAME);

export const getStoredUser = (): User | null => {
	const userData = localStorage.getItem(USER_STORAGE_KEY);
	if (userData) {
		try {
			return JSON.parse(userData);
		} catch (error) {
			return null;
		}
	}
	return null;
};

export const storeAuthData = (token: string, user: User) => {
	Cookies.set(TOKEN_COOKIE_NAME, token, {
		expires: 7,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
	});
	localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

export const clearAuthData = () => {
	Cookies.remove(TOKEN_COOKIE_NAME);
	localStorage.removeItem(USER_STORAGE_KEY);
};

export const validateEmail = (email: string) => {
	return String(email)
		.toLowerCase()
		.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};
