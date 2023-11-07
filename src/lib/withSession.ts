import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";

const sessionOptions = {
  cookieName: "myapp_cookiename",
  password: {
    2: "another_password_at_least_32_characters_long",
    1: "complex_password_at_least_32_characters_long",
  },

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 24 * 60 * 60,
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module "iron-session" {
  interface IronSessionData {
    accessToken?: string;
  }
}
