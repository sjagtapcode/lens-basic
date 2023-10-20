import { PublicationTypes, usePublications } from "@lens-protocol/react-web";
import { Publication } from "@lens-protocol/widgets-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

type PublicationType = "Comment" | "Post"

export default function UserPublications({ profileId }) {
  const { data: publications, loading, hasMore, next } = usePublications({
    profileId,
    publicationTypes: [PublicationTypes.Post, PublicationTypes.Mirror],
    limit: 10,
  });
  const publicationData = useMemo(() => (
    publications?.map((publication) => {
      if (publication.__typename === "Mirror") {
        return publication.mirrorOf;
      } else {
        return publication;
      }
    })
  ), [publications])

  const { push } = useRouter();

  const handleRedirect = (id: string, type: PublicationType) => {
    if(type === "Post")
    push(`/post/${id}`);
  }

  return (
    <div className="relative top-[-50px] sm:top-[-100px] flex flex-col gap-8 p-8 max-w-[100%]">
      {publicationData?.map(({ id, __typename }) => (
        <div key={id}>
          <Publication key={id} publicationId={id} onClick={() => handleRedirect(id, __typename)} />
        </div>
      ))}
      {loading ? <Loader /> : ''}
      {!loading && hasMore ? <Button onClick={next}>Load More</Button> : ''}
    </div>
  )
}