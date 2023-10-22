import { PublicationId, useComments } from "@lens-protocol/react-web"
import Loader from "../ui/loader"
import PostDetails from "./post-details"
import { useState } from "react";

export default function Comments({ publicationId, isComment }: { publicationId: PublicationId, isComment?: boolean }) {
  const [showComments, setComments] = useState(!isComment);
  const handleToggle = () => {
    setComments((prev) => !prev)
  }
  const { data, loading, hasMore, next } = useComments({
    commentsOf: publicationId,
    limit: 10,
  })
  return (
    <>
      {!loading && data?.length ? (
        <button className="bg-transparent text-[#999]" onClick={handleToggle}>
          <span className="relative top-[-6px]">___</span> {showComments ? 'Hide' : 'View'} Comments
        </button>
      ) : ''}
      {showComments ? (
        <>
          {data?.map(({ id, metadata, profile, stats, createdAt }) => (
            <PostDetails key={id} isComment media={metadata?.media} name={metadata?.name || ''} content={metadata?.content || ''} postId={id} profile={profile} stats={stats} createdAt={createdAt} />
          ))}
          {loading ? <Loader /> : ''}
          {!loading && hasMore ? (
            <button className="bg-transparent text-[#999] ml-4 mt-2 hover:text-white" onClick={next}>
              View More Comments
            </button>
          ) : ''}
        </>
      ) : ''}
    </>
  )
}