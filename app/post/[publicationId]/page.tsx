import PostDetails from "@/components/publications/post-details";
import { getPublicationById } from "@/lib/queries/getPublicationById";

const URL = process?.env?.NEXT_PUBLIC_URL || 'https://lens-basic.vercel.app'

export default async function PublicationDetails({ params }: { params: { publicationId: string } }) {
  const { data, error } = await getPublicationById(params?.publicationId)

  const { name, content, media, id, profile, stats, createdAt } = {
    id: data?.id,
    name: data?.profile?.name,
    content: data?.metadata?.content,
    media: data?.metadata?.media,
    profile: data?.profile,
    stats: data?.stats,
    createdAt: data?.createdAt,
  }
  const metaImage = `${URL}/api/og/post?postId=${data?.id}`
  if(error) return <div>{error}</div>
  if(!data) return <div>Post Data not found!</div>
  return (
    <div className="m-4 flex gap-8 flex-col content-center">
      {/* Facebook meta tags */}
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={`${URL}/post/${params?.publicationId}`} />
      <meta property="og:title" content={name || ''} />
      <meta property="og:description" content={content || ''} />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={metaImage} />
      <meta property="twitter:domain" content={URL} />
      <meta property="twitter:url" content={`${URL}/post/${params?.publicationId}`} />
      <meta name="twitter:title" content={name || ''} />
      <meta name="twitter:description" content={content || ''} />

      <PostDetails media={media} name={name || ''} content={content || ''} postId={id} profile={profile} stats={stats} createdAt={createdAt} />
    </div>
  )
}
