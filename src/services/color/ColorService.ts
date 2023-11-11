import { HttpRequest } from "@utils/HttpRequest";
import { CreateColor, UpdateColor, Color } from "./types";
import { ResultPaginationBookmark } from "@types";
import { ColorFilter } from "@store/color/types";

class ColorService {
  async search(colorFilter?: ColorFilter) {
    return HttpRequest.get<Color[]>(`/colors/search`, colorFilter);
  }

  async searchBookmark(colorFilter?: ColorFilter) {
    return HttpRequest.get<ResultPaginationBookmark<Color>>(`/colors/search-bookmark`, colorFilter);
  }

  async count(colorFilter?: ColorFilter) {
    return HttpRequest.get<{ count: number }>(`/colors/count`, colorFilter);
  }

  async create(color: CreateColor) {
    return HttpRequest.post<Color>("/colors", color);
  }

  async update(id: string, color: UpdateColor) {
    return HttpRequest.patch<Color>(`/colors/${id}`, color);
  }

  async delete(id: string) {
    return HttpRequest.delete(`/colors/${id}`);
  }
}

const colorService = new ColorService();
export { colorService };
