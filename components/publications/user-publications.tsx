"use client"

import { PublicationTypes, usePublications } from "@lens-protocol/react-web";
import { Publication } from "@lens-protocol/widgets-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import Loader from "../ui/loader";
import PublicationCard from "./publication-card";

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


  return (
    <div className="relative top-[-50px] sm:top-[-100px] flex flex-col gap-8 p-8 max-w-[100%]">
      {publicationData?.map(({ __typename, ...data }) => (
        __typename === 'Post' ? <PublicationCard key={data?.id} {...data} /> : null
      ))}
      {loading ? <Loader /> : ''}
      {!loading && hasMore ? <Button onClick={next}>Load More</Button> : ''}
    </div>
  )
}