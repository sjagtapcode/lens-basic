"use client"

import { imageValidator } from "@/lib/utils";
import { MediaFragment } from "@lens-protocol/client";
import { Media as MediaType } from "@lens-protocol/react-web";
import { Publication } from "@lens-protocol/widgets-react";
import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function MediaDetails({ data }: { data?: MediaFragment | MediaType }) {
  const ref = useRef(null);
  const url = imageValidator(data?.url);
  const coverUrl = imageValidator(data?.cover);
  switch(true) {
    case data?.mimeType?.startsWith('image'):
      return (
        <img width="auto" height={480} src={url} alt={data?.altTag || ''} className="max-h-[480px] object-contain" />
      )
    case data?.mimeType?.startsWith('video'):
      return (
        <ReactHlsPlayer
          src={url || ''}
          controls
          width="auto"
          height={480}
          playerRef={ref}
          className="max-h-[480px] m-auto"
        />
      )
    case data?.mimeType?.startsWith('audio'):
      return (
        <div className="flex flex-col">
          {coverUrl ? <img width="auto" height={480} src={coverUrl} alt={data?.altTag || ''} className="max-h-[480px] object-contain" /> : ''}
          <video src={url} controls className="h-[100px]" />
        </div>
      )
    default:
      return (
        <Publication />
      )
  }
}
