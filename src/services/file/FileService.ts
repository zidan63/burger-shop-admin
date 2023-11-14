import { HttpRequest } from "@utils/HttpRequest";

class FileService {
  async uploadFile(formData: FormData) {
    return HttpRequest.post<{ imageName: string }>(`/file/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

const fileService = new FileService();
export { fileService };
