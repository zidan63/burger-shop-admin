import { HttpRequest } from "@utils/HttpRequest";

class AuthService {
  async getLoginUrl() {
    return HttpRequest.get<{ invitationUrl: string }>("/agent/get-invitation-login");
  }

  async login(user: { username: string; password: string }) {
    try {
      return HttpRequest.post("/auth/login", user);
    } catch (err) {}
  }

  async loginWithQRCode(timeOut: number) {
    return HttpRequest.post<{ message: string }>(
      "/authen/login-qr-code",
      {},
      { timeout: timeOut * 1000 }
    );
  }

  async getUser() {
    return HttpRequest.get("/auth/get-user");
  }

  async logout() {
    try {
      return HttpRequest.post("/auth/logout", {});
    } catch (err) {}
  }
}

const authService = new AuthService();
export { authService };
