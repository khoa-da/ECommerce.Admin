export interface RegisterUser {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    agreeTerms: boolean;
}