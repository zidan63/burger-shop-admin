import { HttpRequest } from "@utils/HttpRequest";

class AuthService {
  async login(user: { username: string; password: string }) {
    try {
      return HttpRequest.post("/auth/login", user);
    } catch (err) {}
  }

  async getUser() {
    return HttpRequest.get("/information");
  }

  async logout() {
    try {
      return HttpRequest.post("/auth/logout", {});
    } catch (err) {}
  }
}

const authService = new AuthService();
export { authService };
