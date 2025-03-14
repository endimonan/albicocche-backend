import bcrypt from 'bcrypt';

export class PasswordUtil {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
