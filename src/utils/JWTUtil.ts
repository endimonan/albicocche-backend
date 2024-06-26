import jwt, { JwtPayload } from "jsonwebtoken";

export class JWTUtil {
  static generateToken(payload: object): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  }
}
