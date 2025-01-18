export interface User {
	id: string;
	email: string;
	username: string;
	role?: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}
