export type Role = 'admin' | 'locum' | 'clinic';

export interface User {
    uid: string;
    displayName: string;
    role: Role;
    email: string;
    creationTime: string;
    lastSignInTime: string;
    phoneNumber: string;
    homeAddress: string;
}