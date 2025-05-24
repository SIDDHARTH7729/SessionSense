"use client"
import React, { useEffect } from 'react'
import { UserGreeting } from './_Components/UserGreetings'
import {  FocusInsightsPitch } from './_Components/FeaturedContent'
import Sidebar from '@/components/Sidebar'
import { useUser } from '@clerk/nextjs'

type Props = {}

const HomePage = (props: Props) => {

   const { isLoaded, user } = useUser(); 
    const userID = user?.id;
    useEffect(() => {
      const chekcUserStatus = async () => {
        if (isLoaded && userID) { 
          const res = await fetch("/api/checkUserExists", {
            method: "POST",
            body: JSON.stringify({ clerkId:userID }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data);
        } else if (isLoaded && !userID) {
          console.log("user is not signed in")
        }
      };
      chekcUserStatus();
    }, [isLoaded, userID]);
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