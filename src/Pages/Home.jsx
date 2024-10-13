import React from 'react'
import { Companies, Navbar, TrendingExperience } from '../components'

export default function Home() {
  return (
    <div className='overflow-x-clip'>
      <Navbar/>
      <Companies/>
      <TrendingExperience/>
    </div>
  )
}
