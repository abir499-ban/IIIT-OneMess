import React from 'react'

const page = ({params}:any) => {
    const id = params.id;
  return (
    <div>Welcome, {id} to your profile</div>
  )
}

export default page