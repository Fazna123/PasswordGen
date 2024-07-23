import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'

function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const { currentUser, loading, error } = useSelector((state) => state.user)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(signInStart())
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signin`, formData)
            const data = response.data
            if (data.success === true) {
                dispatch(signInSuccess(data.user))
                navigate('/create-password')
            } else {
                dispatch(signInFailure(data.message))
            }
        } catch (error) {
            dispatch(signInFailure(error.response ? error.response.data : 'Something went wrong'))
            if (error.response && error.response.data && error.response.data.message) {
                swal('Error!', error?.response?.data.message,)
            } else {
                swal('Error', 'Something went wrong')
            }
        }


    }
    return (
        <div className='max-w-lg mx-auto p-10'>
            <h1 className='text-3xl text-center font-semibold my-10'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input type="email" placeholder='Enter email...' id='email' className='bg-teal-200 p-3 rounded-lg' onChange={handleChange} required />
                <input type="password" placeholder='Enter password...' id='password' className='bg-teal-200 p-3 rounded-lg' onChange={handleChange} required />
                <button disabled={loading} className='bg-teal-500 text-white font-bold uppercase rounded-lg p-3 hover:opacity-80 disabled:opacity-70'>{loading ? 'Loading...' : "Login"}</button>
            </form>
            <div className='flex gap-2'>
                <p>Don't have an account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-500'>Register</span>
                </Link>
            </div>

        </div>
    )
}

export default SignIn