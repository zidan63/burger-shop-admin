// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import formidable from "formidable";
import FormData from "form-data";
import { withSessionRoute } from "@lib/withSession";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.URL_SERVER_API) throw Error("");

  const accessToken = req.session.accessToken;
  req.url = process.env.URL_SERVER_API + req.url;

  let response: any = null;
  const config = {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      ...req.headers,
    },
  };

  try {
    switch (req.method) {
      case "POST":
        const form = formidable();
        const [fields, files] = await form.parse(req);

        if (!files.file) throw Error("Không có file");

        const fileItem = files.file[0] as formidable.File;

        const directory = path.dirname(fileItem.filepath || "");

        const newFilePath = path.join(directory, fileItem.originalFilename || "");

        fs.renameSync(fileItem.filepath, newFilePath);

        const data = fs.createReadStream(newFilePath);

        const formData = new FormData();
        formData.append("file", data);

        response = await axios.post(req.url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        });
        break;
    }
    res.status(response?.status || 200).json(response?.data || "");
  } catch (err) {
    switch (err?.response?.status) {
      case 401: {
        req.session.destroy();
        break;
      }
    }
    res.status(err?.response?.status || 500).json(err?.response?.data || "Server Error!");
  }
}
