
import React from 'react'
import { getMedicalAdvice } from '../actions'
const page = async () => {
  const advice = await getMedicalAdvice()
  return (
    <div>
      <p>{advice}</p>
    </div>
  )
}

export default page
