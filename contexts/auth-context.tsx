"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, AuthResponse } from "@/types/user";
import {
	MOCK_USERS,
	getStoredToken,
	getStoredUser,
	storeAuthData,
	clearAuthData,
	validateEmail,
} from "@/lib/auth";

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string,
	) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const initializeAuth = () => {
			const token = getStoredToken();
			const storedUser = getStoredUser();

			if (token && storedUser) {
				setUser(storedUser);
			}
			setIsLoading(false);
		};

		initializeAuth();
	}, []);

	const mockAuthRequest = async (
		email: string,
		password: string,
	): Promise<AuthResponse> => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!validateEmail(email)) {
			throw new Error("Invalid email format");
		}

		const mockUser = MOCK_USERS.find(
			(u) => u.email === email && u.password === password,
		);

		if (!mockUser) {
			throw new Error("Invalid credentials");
		}

		const { password: _, ...userWithoutPassword } = mockUser;
		const token = `mock_jwt_token_${Date.now()}`;

		return {
			user: userWithoutPassword,
			token,
		};
	};

	const login = async (email: string, password: string) => {
		try {
			const { user: authUser, token } = await mockAuthRequest(email, password);
			storeAuthData(token, authUser);
			setUser(authUser);
			router.push("/dashboard");
		} catch (error) {
			clearAuthData();
			throw error;
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string,
	) => {
		try {
			if (!validateEmail(email)) {
				throw new Error("Invalid email format");
			}

			await new Promise((resolve) => setTimeout(resolve, 1000));

			if (MOCK_USERS.some((u) => u.email === email)) {
				throw new Error("Email already registered");
			}

			const newUser = {
				id: `${Date.now()}`,
				email,
				username,
				role: "user",
			};

			const token = `mock_jwt_token_${Date.now()}`;
			storeAuthData(token, newUser);
			setUser(newUser);
			router.push("/dashboard");
		} catch (error) {
			clearAuthData();
			throw error;
		}
	};

	const logout = () => {
		clearAuthData();
		setUser(null);
		router.push("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
