import Sidebar from '@/components/Sidebar'
import React from 'react'
import OfferingsPage from './_Components/OfferingsPage'

type Props = {}

const Features = (props: Props) => {
  return (
    <div className="flex min-h-screen bg-background w-full">
      <aside className="w-18 md:w-24 lg:w-72 shrink-0 border-r border-zinc-200 z-40">
        <Sidebar />
      </aside>
      <main className="-px-4 md:px-40">
        <OfferingsPage />
      </main>
    </div>
  )
}

export default Features
