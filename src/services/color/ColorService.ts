import { HttpRequest } from "@utils/HttpRequest";
import { CreateColor, Color } from "./types";
import { ColorFilter } from "@store/color/types";
import { SearchResult } from "@types";

class ColorService {
  async search(colorFilter?: ColorFilter) {
    return HttpRequest.get<SearchResult<Color>>(`/colors`, colorFilter);
  }

  async create(color: CreateColor) {
    return HttpRequest.post<Color>("/colors", color);
  }

  async update(color: Color) {
    return HttpRequest.put<Color>(`/colors`, color);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/colors?id=${id}`);
  }
}

const colorService = new ColorService();
export { colorService };
