import { withSessionRoute } from "@lib/withSession";

export default withSessionRoute(handler);

async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }

  req.session.destroy();
  res.status(200).json({ message: "Logout success" });
}
