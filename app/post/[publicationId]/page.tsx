"use client"
import { PublicationId, usePublication } from "@lens-protocol/react-web";

export default function PublicationDetails({ params }: { params: { publicationId: string } }) {
  const { data, error, loading } = usePublication({
    publicationId: params?.publicationId as PublicationId,
  })
  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  if (data?.hidden) return <div>Publication is not visible!</div>
  return (
    <div>
      <div>
        {params.publicationId}
      </div>
      <div>
      {data?.createdAt}

      </div>
      <div>
      {data?.profile?.name}

      </div>
      <div>
      {data?.id}
      </div>
    </div>
  )
}
