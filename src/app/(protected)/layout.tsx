// 'use client';

// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';
// import React from 'react';

// type Props = {
//   children: React.ReactNode;
// };

// const layout = ({ children }: Props) => {
//   return (
//     <div>
//       {/* Fixed navbar */}
//       <div className="mb-20">
//         <Navbar />
//       </div>

//       {/* Sidebar fixed on left, content takes rest */}
//       <div className="flex">
//         {/* Sidebar (fixed) */}
//         <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 z-40">
//           <Sidebar />
//         </div>

//         {/* Main content with left margin matching sidebar width */}
//         <main className="ml-64 w-[calc(100%-16rem)] px-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default layout;

"use client"
import Navbar from '@/components/Navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div>
       <div className='mb-20'>
        <Navbar/>
       </div>
        <div className='flex flex-col items-center justify-center'>
        {children}
        </div>
    </div>
  )
}

export default layout


/*
'use client'; 

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <main className=" flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
*/