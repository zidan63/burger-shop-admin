import { HttpRequest } from "@utils/HttpRequest";
import { CreateUser, UpdateUser, User } from "./types";
import { UserFilter } from "@store/user/types";
import { ResultPaginationBookmark } from "@types";

class UserService {
  async getByWorkUnitId(id: string) {
    return HttpRequest.get<User[]>(`/users/work-unit/${id}`);
  }

  async search(userFilter?: UserFilter) {
    return HttpRequest.get<User[]>(`/users/search`, userFilter);
  }

  async searchBookmark(userFilter?: UserFilter) {
    return HttpRequest.get<ResultPaginationBookmark<User>>(`/users/search-bookmark`, userFilter);
  }

  async searchWithoutWorkUnitIdBookmark(workUnitId: string, userFilter?: UserFilter) {
    return HttpRequest.get<ResultPaginationBookmark<User>>(
      `/users/without-work-unit/search-bookmark/${workUnitId}`,
      userFilter
    );
  }

  async count(userFilter?: UserFilter) {
    return HttpRequest.get<{ count: number }>(`/users/count`, userFilter);
  }

  async create(user: CreateUser) {
    return HttpRequest.post<User>("/users", user);
  }

  async update(id: string, user: UpdateUser) {
    return HttpRequest.patch<User>(`/users/${id}`, user);
  }

  async updateStatusActive(id: string, isActive: boolean) {
    return HttpRequest.patch<User>(`/users/${id}/status`, { isActive });
  }

  async updateWorkUnitId(oldWorkUnitIds: string[], newWorkUnitId: string, userIds: string[]) {
    return HttpRequest.patch<User[]>(`/users/work-unit`, {
      oldWorkUnitIds,
      newWorkUnitId,
      userIds,
    });
  }

  async delete(id: string) {
    return HttpRequest.delete(`/users/${id}`);
  }
}

const userService = new UserService();
export { userService };
