export type Role = 'admin' | 'manager' | 'locum' | 'clinic';

export interface User {
    uid: string;
    displayName: string;
    role: Role;
    email: string;
    creationTime: string;
    lastSignInTime: string;

}