import { RoleFilter } from "@store/role/types";
import { HttpRequest } from "@utils/HttpRequest";
import { CreateRole, Role, UpdateRole } from "./types";
import { SearchResult } from "@types";

class RoleService {
  async search(roleFilter?: RoleFilter) {
    return HttpRequest.get<SearchResult<Role>>("/roles", roleFilter);
  }

  async create(createRole: CreateRole) {
    return HttpRequest.post("/roles", createRole);
  }

  async update(updateRole: Role) {
    return HttpRequest.put(`/roles`, updateRole);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/roles?id=${id}`);
  }

  async getAllPermision() {
    return HttpRequest.get("/permission?pageSize=1000");
  }
}

const roleService = new RoleService();
export { roleService };
