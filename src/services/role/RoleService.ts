import { RoleFilter } from "@store/role/types";
import { HttpRequest } from "@utils/HttpRequest";
import { CreateRole, Role, UpdateRole } from "./types";

class RoleService {
  async getAll() {
    return HttpRequest.get<Role[]>("/roles");
  }

  async search(roleFilter?: RoleFilter) {
    return HttpRequest.get<Role[]>("/roles/search", roleFilter);
  }

  async count(roleFilter?: RoleFilter) {
    return HttpRequest.get<{ count: number }>("/roles/count", roleFilter);
  }

  async create(createRole: CreateRole) {
    return HttpRequest.post("/roles", createRole);
  }

  async update(id: string, updateRole: UpdateRole) {
    return HttpRequest.patch(`/roles/${id}`, updateRole);
  }

  async updateStatusActive(id: string, isActive: boolean) {
    return HttpRequest.patch<Role>(`/roles/${id}/status`, { isActive });
  }

  async delete(id: string) {
    return HttpRequest.delete(`/roles/${id}`);
  }

  async getAllPermision() {
    return HttpRequest.get("/permission");
  }
}

const roleService = new RoleService();
export { roleService };
