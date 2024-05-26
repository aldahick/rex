import { injectable } from "@athenajs/core";
import { OAuth2Client } from "google-auth-library";
import { RexConfig } from "../../config.js";

export interface GoogleTokenPayload {
  domain: string;
  email: string;
  userId: string;
}

@injectable()
export class GoogleAuthService {
  constructor(private readonly config: RexConfig) {}

  async getIdTokenPayload(
    idToken: string,
    clientIdKey: keyof RexConfig["google"]["oauth"],
  ): Promise<GoogleTokenPayload | undefined> {
    const { clientId, clientSecret } = this.config.google.oauth[clientIdKey];
    if (!(clientId && clientSecret)) {
      throw new Error(`Missing Google credentials for client ${clientIdKey}`);
    }
    const ticket = await new OAuth2Client({
      clientId,
      clientSecret,
    }).verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const userId = ticket.getUserId();
    if (userId === null || payload?.email === undefined) {
      return undefined;
    }
    return {
      domain: payload.hd ?? "gmail.com",
      email: payload.email,
      userId,
    };
  }
}
