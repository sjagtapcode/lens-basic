import { addAmp } from '@/lib/utils';
import { ImageResponse } from 'next/server';
 
export const runtime = 'edge';
 
async function GET(searchParams) {
  const name = addAmp(searchParams.get('name'));
  const mediaUrl = addAmp(searchParams.get('mediaUrl') || searchParams.get('amp;mediaUrl'));
  const mediaType = addAmp(searchParams.get('mediaType') || searchParams.get('amp;mediaType'));
  const mediaCover = addAmp(searchParams.get('mediaCover') || searchParams.get('amp;mediaCover'));
  const content = addAmp(searchParams.get('content') || searchParams.get('amp;content'));
  const profileHandle = addAmp(searchParams.get('profileHandle') || searchParams.get('amp;profileHandle'));

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
              objectFit: 'contain',
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
