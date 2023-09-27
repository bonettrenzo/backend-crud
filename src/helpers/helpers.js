import { randomBytes } from 'crypto';

export function validateField(field) {
    if (!field || field.length === 0) {
        return false;
    }

    return field;
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.length === 0 || !emailRegex.test(email)) {
        return false;
    }

    return email;
}

export const generateSecretKey = "MYKEY"


export function validateParam(param) {
    if (param === undefined || param === null) {
        return false;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(param)) {
        return false;
    }

    return param;
}