import { LensClient, development, production } from "@lens-protocol/client";

export const lensClient = new LensClient({
  environment: process.env.NEXT_ENV_IS_TESTNET === 'true' ? development : production,
});
