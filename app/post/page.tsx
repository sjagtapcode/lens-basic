'use client'

import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import {
  useExplorePublications, PublicationSortCriteria, PublicationTypes, PublicationMainFocus
} from '@lens-protocol/react-web'

import { Publication } from '@lens-protocol/widgets-react'
import { useRouter } from 'next/navigation'

export default function Search() {
  const { data: publications, loading, hasMore, next } = useExplorePublications({
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    publicationTypes: [PublicationTypes.Post],
    metadataFilter: {
      restrictPublicationMainFocusTo: [PublicationMainFocus.Image]
    },
    limit: 5
  })
  const { push } = useRouter()

  const handleRedirect = (publicationId: string) => {
    push(`/post/${publicationId}`);
  }

  return (
    <div className="px-10 py-14 flex flex-col items-center">
      {
        publications?.map(({ id }) => (
          <div key={id} className='m-4'>
            <Publication
              publicationId={id}
              key={id}
              onClick={() => handleRedirect(id)}
            />
          </div>
        ))
      }
      {loading ? <Loader /> : ''}
      {!loading && hasMore ? <Button onClick={next}>Load More</Button> : ''}
    </div>
  )
}