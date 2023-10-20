import { Profile, PublicationId, PublicationMediaSet, PublicationStats } from "@lens-protocol/react-web";
import Media from "../media";
import Comments from "./comments";
import PastTime from "../ui/pastTime";

export default function PostDetails({ media, name, content, postId, createdAt, isComment, profile, stats }: {
  media: PublicationMediaSet[],
  name: string,
  content: string,
  postId: PublicationId,
  createdAt: string,
  profile: Profile
  isComment?: boolean,
  stats: PublicationStats,
}) {
  return (
    <>
      <div className="flex justify-center">
        {media?.map(({ original }) => (
          <Media key={original?.url} data={original} />
        ))}
      </div>
      <div>
        {!isComment ? (
          <>
            <div className="flex flex-wrap gap-2">
              <h1 className="text-2xl">{name}</h1>
              <h1 className="text-lg italic text-slate-400">@{profile?.handle}</h1>
            </div>
            <div className="text-[#999] italic flex">
              <PastTime time={createdAt} />
            </div>
            <p>{content}</p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mt-2">
              <h1 className="text-md italic text-slate-400">@{profile?.handle}</h1>
              <p>{content}</p>
            </div>
            <div className="text-[#999] italic flex">
              <PastTime time={createdAt} />
            </div>
          </>
        )}
      </div>
      {stats?.commentsCount > 0 ? (
        <div className="pl-8 w-[100%]">
          <Comments publicationId={postId} isComment={isComment} />
        </div>
      ) : ''}
    </>
  )
}