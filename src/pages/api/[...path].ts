import { withSessionRoute } from "@lib/withSession";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!process.env.URL_SERVER_API) throw Error("URL_SERVER_API environment variable is required");

  const accessToken = req.session.accessToken;
  req.url = process.env.URL_SERVER_API + req.url;
  req.headers.cookie = "";

  try {
    const response = await axios.request({
      url: req.url,
      method: req.method,
      data: req.body,
      headers: {
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...req.headers,
      },
    });

    res.status(response?.status).json(response?.data);
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
