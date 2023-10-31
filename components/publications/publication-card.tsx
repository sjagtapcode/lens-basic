
import { Post, Profile } from "@lens-protocol/react-web";
import Link from "next/link";
import { useState } from "react";
import MediaDetails from "../media";
import PastTime from "../ui/pastTime";
import { imageValidator } from "@/lib/utils";

const getProfileImage = (profile?: Profile): string => {
  if(profile?.picture?.__typename === 'MediaSet') {
    return imageValidator(profile?.picture?.optimized?.url || profile?.picture?.original?.url || '/thumbnail/nft')
  }
  if(profile?.picture?.__typename === 'NftImage') {
    return imageValidator(profile?.picture?.uri || '/thumbnail/nft')
  }
  return '/thumbnail/nft'
}

export default function PublicationCard({
  id,
  profile,
  metadata,
  stats,
  createdAt,
}: Partial<Post>) {
  const [showFull, setShowFull] = useState(false)
  const handleToggleShowFull = () => {
    setShowFull((prev) => !prev)
  }

  return (
    <div className="max-w-md container bg-white rounded-xl shadow-[#BBB] shadow-lg transform transition duration-500 hover:scale-105">
      <div>
        <Link className="flex items-center space-x-2 cursor-pointer" href={`/@${profile?.handle}`}>
          <>
            <img className="w-10 rounded-full" src={getProfileImage(profile)} alt="sara" />
            <div>
              <h2 className="text-gray-800 font-bold hover:underline pt-[20px] leading-[10px] pb-[0px]">{profile?.name}</h2>
              <span className="text-gray-400 text-[13px]"><PastTime time={createdAt || ''} /></span>
            </div>
          </>
        </Link>
      </div>

      <Link href={`/post/${id}`}>
        <>
          <p className="ml-4 mt-1 mb-2 text-gray-700 overflow-hidden break-words">
            {showFull ? metadata?.content : metadata?.content?.slice(0, 300)}
            {!showFull && ((metadata?.content?.length || 0) > 300) ? '...' : ''}
            {(metadata?.content?.length || 0) > 300 ?
              <button
                onClick={handleToggleShowFull}
                className="block hover:underline cursor-pointer"
              >
                {showFull ? 'Show Less' : 'Show More'}
              </button> : ''}
          </p>
          <MediaDetails key={metadata?.media?.[0]?.original?.url} data={metadata?.media?.[0]?.original} />
        </>
      </Link>
      <div className="flex p-4 justify-between">

        <div className="flex space-x-2 text-gray-800">
          <div className="flex space-x-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            <span>{stats?.commentsCount}</span>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 48 48" width="24px" height="24px"><path d="M 35.484375 5.984375 A 1.50015 1.50015 0 0 0 34.439453 8.5605469 L 36.878906 11 L 35.5 11 C 23.64339 11 14 20.64339 14 32.5 A 1.50015 1.50015 0 1 0 17 32.5 C 17 22.26461 25.26461 14 35.5 14 L 36.878906 14 L 34.439453 16.439453 A 1.50015 1.50015 0 1 0 36.560547 18.560547 L 41.431641 13.689453 A 1.50015 1.50015 0 0 0 41.423828 11.302734 L 36.560547 6.4394531 A 1.50015 1.50015 0 0 0 35.484375 5.984375 z M 12.5 6 C 8.9280619 6 6 8.9280619 6 12.5 L 6 35.5 C 6 39.071938 8.9280619 42 12.5 42 L 35.5 42 C 39.071938 42 42 39.071938 42 35.5 L 42 27.5 A 1.50015 1.50015 0 1 0 39 27.5 L 39 35.5 C 39 37.450062 37.450062 39 35.5 39 L 12.5 39 C 10.549938 39 9 37.450062 9 35.5 L 9 12.5 C 9 10.549938 10.549938 9 12.5 9 L 20.5 9 A 1.50015 1.50015 0 1 0 20.5 6 L 12.5 6 z"/></svg>
            </span>
            <span>{stats?.totalAmountOfMirrors}</span>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </span>
            <span>{stats?.totalUpvotes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
