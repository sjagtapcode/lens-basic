import { lensClient } from "../client";

export async function getPublicationById(publicationId: string) {
  try {
    const data = await lensClient.publication.fetch({
      publicationId,
    })
    if(data?.__typename === 'Mirror') {
      return {
        data: data?.mirrorOf
      }
    }
    return {
      data
    }
  } catch (e) {
    return {
      error: e?.toString()
    }
  }
}
