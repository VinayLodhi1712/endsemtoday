import React from 'react'
import Layout from '../components/layout/layout'
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <Layout>
    <div className='notfound'>
      <h1 style={{fontSize:"5rem",fontWeight:"700"}}>404</h1>
      <h2>Opps ! Page not found </h2>
      <NavLink to="/"><button className='goback'>Go Back</button></NavLink>
    </div>
    </Layout>
  
  )
}

export default PageNotFound