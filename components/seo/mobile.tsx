"use client"

import { usePathname } from "next/navigation"

export default function MobileSeo() {
  const path = usePathname()
  return (
    <head>
      {/* Open In Orb */}
      <meta property="al:ios:app_name" content="Orb Lens Basic" />
      <meta property="al:ios:app_store_id" content="1638461963" />
      <meta property="al:ios:url" content={`orb.ac:/${path}`} />
      <meta property="al:android:url" content={`orb.ac:/${path}`} />
      <meta property="al:android:package" content="app.orb.flutter" />
      <meta property="al:android:app_name" content="Orb Lens Basic" />
      <meta property="al:web:url" content={`https://orb.ac/${path}`} />
    </head>
  )
}
