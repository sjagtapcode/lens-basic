"use client"

import Media from "../media";
import Comments from "./comments";
import PastTime from "../ui/pastTime";
import { ProfileFragment, PublicationMediaSetFragment, SimplePublicationStatsFragment } from "@lens-protocol/client";
import { Profile, PublicationMediaSet } from "@lens-protocol/react-web";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function PostDetails({ media, name, content, postId, createdAt, isComment, profile, stats }: {
  media?: PublicationMediaSetFragment[] | PublicationMediaSet[],
  name: string,
  content: string,
  postId?: string,
  createdAt?: string,
  profile?: Profile | ProfileFragment,
  isComment?: boolean,
  stats?: SimplePublicationStatsFragment,
}) {
  return (
    <>
        {Number(media?.length) > 1 ? (
          <Carousel>
            {media?.map(({ optimized }) => (
              <Media key={optimized?.url} data={optimized} />
            ))}
          </Carousel>
        ) : (
          <Media key={media?.[0]?.original?.url} data={media?.[0]?.original} />
        )}
      <div>
        {!isComment ? (
          <>
            <div className="flex flex-wrap gap-2">
              <h1 className="text-2xl">{name}</h1>
              <h1 className="text-lg italic text-slate-400">@{profile?.handle}</h1>
            </div>
            {createdAt && <div className="text-[#999] italic flex">
              <PastTime time={createdAt} />
            </div>}
            <p>{content}</p>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mt-2">
              <h1 className="text-md italic text-slate-400">@{profile?.handle}</h1>
              <p>{content}</p>
            </div>
            {createdAt && <div className="text-[#999] italic flex">
              <PastTime time={createdAt} />
            </div>}
          </>
        )}
      </div>
      {Number(stats?.totalAmountOfComments) > 0 ? (
        <div className="pl-8 w-[100%]">
          <Comments publicationId={postId} isComment={isComment} />
        </div>
      ) : ''}
    </>
  )
}