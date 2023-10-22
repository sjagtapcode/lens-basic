"use client"

import { MediaFragment } from "@lens-protocol/client";
import { Media as MediaType } from "@lens-protocol/react-web";
import { Publication } from "@lens-protocol/widgets-react";
import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function MediaDetails({ data }: { data?: MediaFragment | MediaType }) {
  const ref = useRef(null);
  const url = data?.url?.startsWith('ipfs://') ? data?.url?.replace('ipfs://', 'https://ipfs.io/ipfs/') : data?.url;
  const coverUrl = data?.cover?.startsWith('ipfs://') ? data?.cover?.replace('ipfs://', 'https://ipfs.io/ipfs/') : data?.cover;
  switch(true) {
    case data?.mimeType?.startsWith('image'):
      return (
        <img width="auto" height={480} src={url} alt={data?.altTag || ''} className="max-h-[480px] object-contain" />
      )
    case data?.mimeType?.startsWith('video'):
      return (
        <ReactHlsPlayer
          src={url || ''}
          autoPlay
          controls
          width="auto"
          height={480}
          playerRef={ref}
          className="max-h-[480px]"
        />
      )
    case data?.mimeType?.startsWith('audio'):
      return (
        <div className="flex flex-col">
          {coverUrl ? <img width="auto" height={480} src={coverUrl} alt={data?.altTag || ''} className="max-h-[480px] object-contain" /> : ''}
          <video src={url} autoPlay controls className="h-[100px]" />
        </div>
      )
    default:
      return (
        <Publication />
      )
  }
}
