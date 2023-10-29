import { addAmp } from '@/lib/utils';
import { ImageResponse } from 'next/server';
 
export const runtime = 'edge';
 
const URL = process?.env?.NEXT_PUBLIC_URL || 'https://lens-basic.vercel.app'

async function GET(searchParams) {
  const handle = addAmp(searchParams.get('handle') || searchParams.get('amp;handle'));
  const profilePicture = addAmp(searchParams.get('profilePicture') || searchParams.get('amp;profilePicture'));
  const coverPicture = addAmp(searchParams.get('coverPicture') || searchParams.get('amp;coverPicture'));
  const bio = addAmp(searchParams.get('bio') || searchParams.get('amp;bio'));

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
        {coverPicture && (
          <img
            src={coverPicture as string}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
            }}
          />
        )}
        <div style={{
          position: 'absolute',
          top: '300px',
          padding: '0 100px',
          display: 'flex',
          flexDirection: 'row',

        }}>
          <img
            src={profilePicture as string || `${URL}/user-icon.svg`}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '5px solid black'
            }}
          />
          <div style={{
            marginTop: '100px',
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span>@{handle}</span>
            <span
              style={{
                fontSize: '20px',
                color: '#BBB',
                maxWidth: '700px',
                maxHeight: '50px',
                overflow: 'hidden',
              }}
            >
              {bio}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 256,
      height: 256,
    },
  );
}

export default async function handler(req) {
  if(req?.method === 'GET') {
    return await GET(req?.nextUrl?.searchParams)
  }
}
