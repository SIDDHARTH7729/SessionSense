import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div>
       <div className='mb-10'>
        <Navbar/>
       </div>
        {children}
    </div>
  )
}

export default layout