'use client'

import UserPublications from '@/components/publications/user-publications'
import Loader from '@/components/ui/loader'
import {
  useProfile
} from '@lens-protocol/react-web'

export default function ProfileByHandle({ params }: { params: { handle: string } }) {
  const { data: profile, loading, error } = useProfile({
    handle: params?.handle?.startsWith('%40') ? params?.handle?.slice(3) : '',
  })
  if(!params?.handle?.startsWith('%40')) return <div>Please check the URL, handle should start with an @</div>
  if(loading) return <Loader />
  if(error) return <div>{error.message}</div>
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
      {profile && <UserPublications profileId={profile?.id} />}
    </div>
  )
}