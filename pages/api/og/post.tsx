import { getPublicationById } from '@/lib/queries/getPublicationById';
import { ImageResponse } from 'next/server';
 
export const runtime = 'edge';
 
async function GET(searchParams) {
  const postId = searchParams.get('postId');
  const { data, error } = await getPublicationById(postId)
  if (error || !data) {
    return ''
  }  

  const { name, content, media, profile } = {
    name: data?.profile?.name,
    content: data?.metadata?.content,
    media: data?.metadata?.media,
    profile: data?.profile,
  }
  const mediaUrl = media?.[0]?.original?.url
  const mediaType = media?.[0]?.original?.mimeType
  const mediaCover = media?.[0]?.original?.cover
  const profileHandle = profile?.handle

  const image = mediaType?.startsWith('image') ? mediaUrl : mediaCover;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {image ? (
          <img
            src={image}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              border: '5px solid black'
            }}
          />
        ) : (
          <div
            style={{
              width: '400px',
              height: '400px',
              background: '#BBB',
            }}
          />
        )}
        <div style={{
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 24,
          margin: '0 10px 5px 10px',
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
          }}>
            {name}
            <span style={{
              fontSize: 18,
              color: '#94A3B8',
            }}>
              @{profileHandle}
            </span>
          </div>
          <span
            style={{
              fontSize: 18,
              color: '#BBB',
              maxWidth: '700px',
              maxHeight: '50px',
              overflow: 'hidden',
            }}
          >
            {content}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

export default async function handler(req) {
  if(req?.method === 'GET') {
    return await GET(req?.nextUrl?.searchParams)
  }
}
