import UserPublications from '@/components/publications/user-publications'
import { getProfileByHandle } from '@/lib/queries/getProfileByHandle'

const URL = process?.env?.NEXT_PUBLIC_URL || 'https://lens-basic.vercel.app'

export default async function ProfileByHandle({ params }: { params: { handle: string } }) {
  const { profile, error } = await getProfileByHandle(params?.handle)
  const metaImage = `${URL}/api/og/profile?handle=${profile?.handle}&profilePicture=${profile?.picture?.__typename === "MediaSet" ? profile?.picture?.original?.url : ''}&coverPicture=${profile?.coverPicture?.__typename === "MediaSet" ? profile?.coverPicture?.original?.url : ''}&bio=${profile?.bio}`
  if(error) return <div>{error}</div>
  if (!profile) return <div>Profile Data Not Found!</div>
  return (
    <div className=" flex flex-col items-center">
      {profile?.coverPicture?.__typename === "MediaSet" && (
          <img
            width="100%"
            height="200"
            alt={profile.handle}
            className="rounded-xl"
            src={profile.coverPicture.original.url}
          />
        )}
      <div className='relative top-[-50px] sm:top-[-100px] grid place-items-center'>
        {profile?.picture?.__typename === "MediaSet" && (
            <img
              width="200"
              height="200"
              alt={profile.handle}
              className="rounded-[50%] border-[4px] w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]"
              src={profile.picture.original.url}
            />
          )}
          <div className='text-center mx-3'>
            <h1 className="text-3xl my-3">{profile?.name}</h1>
            <h1 className="text-3xl my-3">@{profile?.handle}</h1>
            <h3 className="text-xl mb-4 text-center">{profile?.bio}</h3>
          </div>
      </div>
      {/* Facebook meta tags */}
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={`${URL}/${params?.handle}`} />
      <meta property="og:title" content={profile?.name || `${params?.handle} Profile`} />
      <meta property="og:description" content={profile?.bio || 'Profile Info description'} />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:image"  content={metaImage} />
      <meta property="twitter:domain" content={URL} />
      <meta property="twitter:url" content={`${URL}/${params?.handle}`} />
      <meta property="twitter:title" content={profile?.name || `${params?.handle} Profile`} />
      <meta property="twitter:description" content={profile?.bio || 'Profile Info description'} />

      <UserPublications profileId={profile?.id} />
    </div>
  )
}
