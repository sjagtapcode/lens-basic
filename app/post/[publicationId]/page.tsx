"use client"
import Media from "@/components/media";
import Loader from "@/components/ui/loader";
import { Post, PublicationId, usePublication } from "@lens-protocol/react-web";
import { useMemo } from "react";

export default function PublicationDetails({ params }: { params: { publicationId: string } }) {
  const { data, error, loading } = usePublication({
    publicationId: params?.publicationId as PublicationId,
  })

  const { name, content, media } = useMemo(() => {
    const postData = data as Post
    return {
      name: postData?.profile?.name,
      content: postData?.metadata?.content,
      media: postData?.metadata?.media,
    }
  }, [data])

  return (
    <div className="m-4 flex gap-8 flex-wrap justify-center">
      {loading ? <Loader /> : 
        error ? <div>{error.message}</div> : (
        <>
          <div>
            {media?.map(({ original }) => (
              <Media key={original?.url} data={original} />
            ))}
          </div>
          <div>
            <h1 className="text-2xl">{name}</h1>
            <p>{content}</p>
          </div>
        </>
      )}
    </div>
  )
}
