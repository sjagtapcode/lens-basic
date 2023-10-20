'use client';

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useSearchProfiles } from "@lens-protocol/react-web";
import { Profile } from "@lens-protocol/widgets-react";
import { useRouter } from "next/navigation";

export default function ProfilesList() {
  const { data, loading, error, next, hasMore } = useSearchProfiles({
    query: 'nader',
    limit: 10,
  })
  const { push } = useRouter();
  const handleRedirect = (handle: string) => {
    push(`/@${handle}`)
  }
  if(loading) return <Loader />
  if(error) return <div>{error.message}</div>
  return (
    <div className="flex flex-col place-items-center gap-8 m-8">
      {data?.map((profile) => (
        <div key={profile.id} className="w-fit">
          <Profile
            profileId={profile.id}
            key={profile.id}
            onClick={() => handleRedirect(profile.handle)}
          />
        </div>
      ))}
      {loading ? <Loader /> : ''}
      {!loading && hasMore ? <Button onClick={next}>Load More</Button> : ''}
    </div>
  )
}