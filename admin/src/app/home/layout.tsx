import Navbar from '@/components/Navbar'
import Protected from '@/components/Protected'
import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>  
    <Protected>
        <Navbar></Navbar>
        {children}
     </Protected>
    </>
  )
}

export default Layout
