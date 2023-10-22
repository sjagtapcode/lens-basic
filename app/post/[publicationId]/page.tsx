"use client"
import PostDetails from "@/components/publications/post-details";
import Loader from "@/components/ui/loader";
import { Post, PublicationId, usePublication } from "@lens-protocol/react-web";
import { useMemo } from "react";

const URL = process?.env?.NEXT_PUBLIC_URL || 'https://lens-basic.vercel.app'

export default function PublicationDetails({ params }: { params: { publicationId: string } }) {
  const { data, error, loading } = usePublication({
    publicationId: params?.publicationId as PublicationId,
  })

  const { name, content, media, id, profile, stats, createdAt } = useMemo(() => {
    const postData = data as Post
    return {
      id: postData?.id,
      name: postData?.profile?.name,
      content: postData?.metadata?.content,
      media: postData?.metadata?.media,
      profile: postData?.profile,
      stats: postData?.stats,
      createdAt: postData?.createdAt,
    }
  }, [data])
  const metaImage = `${URL}/api/og/post?name=${name}&mediaUrl=${media?.[0]?.optimized?.url}&mediaType=${media?.[0]?.optimized?.mimeType}&mediaCover=${media?.[0]?.optimized?.cover}&content=${content}&createdAt=${createdAt}&profileHandle=${profile?.handle}`
  return (
    <div className="m-4 flex gap-8 flex-col content-center">
      {loading ? <Loader /> : 
        error ? <div>{error.message}</div> : (
        <PostDetails media={media} name={name || ''} content={content || ''} postId={id} profile={profile} stats={stats} createdAt={createdAt} />
      )}
      {data && <meta property="og:image" content={metaImage} />}
    </div>
  )
}
