export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    role: string;
    registeredDate: string;
    lastLoginDate: string | null;
    status: 'Active' | 'Inactive'; // hoặc string nếu API còn nhiều trạng thái
}
