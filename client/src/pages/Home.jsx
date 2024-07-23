import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className='flex flex-col lg:flex-row gap-5 mt-[3%] justify-between mx-5'>
            <div className='flex m-auto p-5 w-full lg:w-1/2'>
                <img src='https://saasifysolutions.com/wp-content/uploads/2021/04/cyber-security-job-roles-1024x705.jpg' alt='' className='max-w-full h-auto' />
            </div>
            <div className='flex w-full lg:w-1/2 flex-col justify-center align-middle gap-4'>
                <p className='text-teal-700 text-[40px]'>
                    Fortify Your Digital Life with Unique, Unbreakable Passwords....
                    Secure Your World Today!
                </p>

                <Link to={'/create-password'}>
                    <button className='p-3 bg-teal-700 rounded-lg text-white font-bold hover:opacity-80'>Generate Password</button>
                </Link>


            </div>

        </div>
    )
}

export default Home