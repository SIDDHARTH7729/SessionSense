import Sidebar from '@/components/Sidebar'
import React from 'react'
import VideoPlayerWithProgress from './_Components/PlayVideo'

type Props = {}

const PostVideo = (props: Props) => {
  return (
    <div className="flex min-h-screen bg-background w-full">
     <aside className="w-12 md:w-20 lg:w-30 shrink-0 border-r border-zinc-200 z-40 ">
      <Sidebar />
    </aside>
    <main className="ml-30 md:px-40 lg:px-72 pt-10 ">
      <VideoPlayerWithProgress/>
    </main>
  </div>
  )
}

export default PostVideo