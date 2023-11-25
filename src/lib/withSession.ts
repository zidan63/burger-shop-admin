import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

import { User } from "@services/user";

const sessionOptions = {
  cookieName: "myapp_cookiename",
  password: {
    2: "another_password_at_least_32_characters_long",
    1: "complex_password_at_least_32_characters_long",
  },

  cookieOptions: {
    secure: false,
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
    userCurrentRoleCode?: string;
  }
}
