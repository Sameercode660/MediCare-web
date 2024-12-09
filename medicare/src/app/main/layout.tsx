import Main from '@/components/Main'
import Protected from '@/components/Protected'
import React from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Protected>
        <Main></Main>
        {children}
      </Protected>
      
    </>
  )
}

export default Layout
