import { lensClient } from "../client";

export async function getProfileByHandle(queryParam: string) {
  try {
    if(!queryParam?.startsWith('%40')) {
      return {
        error: 'Please check the URL, handle should start with an @',
      }
    }
    const handle = queryParam?.slice(3);
    const profile = await lensClient.profile.fetch({
      handle,
    })
    return {
      profile
    }
  } catch (e) {
    return {
      error: e?.toString()
    }
  }
}
