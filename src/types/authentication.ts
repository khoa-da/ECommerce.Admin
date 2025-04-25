export interface AuthResponse {
    accessToken: string
    accessTokenExpires: string
    refreshToken: string
    refreshTokenExpires: string
    userId: string
    username: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    status: string
    role: string
}
export interface AuthLoginRequest {
    usernameOrEmail: string
    password: string
}