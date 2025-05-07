import React from 'react'
import { UserGreeting } from './_Components/UserGreetings'
import {  FocusInsightsPitch } from './_Components/FeaturedContent'
import Sidebar from '@/components/Sidebar'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div className='flex flex-row w-full'>
        <Sidebar/>
        <div className='flex flex-col items-center justify-center w-full'>
        <UserGreeting/>
        <FocusInsightsPitch/>
        </div>
    </div>
  )
}

export default HomePage