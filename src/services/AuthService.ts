import User from '../models/User';
import { PasswordUtil } from '../utils/PasswordUtil';
import { JWTUtil } from '../utils/JWTUtil';

export class AuthService {
    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ where: { email } });
        if (!user || !await PasswordUtil.comparePassword(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        if (!user.isVerified) {
            throw new Error('Email not verified');
        }

        return JWTUtil.generateToken({ userId: user.id });
    }

    logout(response: any): void {
        response.clearCookie('token');
    }
}
