import { HttpRequest } from "@utils/HttpRequest";
import { CreateUser, User } from "./types";
import { UserFilter } from "@store/user/types";
import { SearchResult } from "@types";

class UserService {
  async search(userFilter?: UserFilter) {
    return HttpRequest.get<SearchResult<User>>(`/users`, userFilter);
  }

  async create(user: CreateUser) {
    return HttpRequest.post<User>("/users", user);
  }

  async update(user: User) {
    return HttpRequest.put<User>(`/users`, user);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/users?id=${id}`);
  }
}

const userService = new UserService();
export { userService };
