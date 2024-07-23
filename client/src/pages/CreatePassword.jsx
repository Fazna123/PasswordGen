import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import swal from 'sweetalert'


function CreatePassword() {
    const { currentUser } = useSelector((state) => state.user)


    const [password, setPassword] = useState("")
    const [length, setLength] = useState(4)
    const [checkboxData, setCheckboxData] = useState([
        { title: "Include Uppercase Letters", state: false },
        { title: "Include Lowercase Letters", state: false },
        { title: "Include Numbers", state: false },
        { title: "Include Symbols", state: false },
    ])
    const [copied, setCopied] = useState(false)

    const handleChange = (i) => {
        const updatedCheckboxData = [...checkboxData]
        updatedCheckboxData[i].state = !updatedCheckboxData[i].state
        setCheckboxData(updatedCheckboxData)
    }

    const generatePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/password/generate`, { checkboxData, length })
            if (response.status === 200) {
                setPassword(response.data.password)
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error.message)
            swal(error?.response.data.message)
        }
    }

    const handleCopy = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const handleSavePassword = async (e) => {
        e.preventDefault()
        const email = currentUser.email
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/password/save`, { email, password })
            if (response.status == 201) {
                swal(response?.data?.message)
            }
        } catch (error) {
            console.log(error.message)
            swal(error?.response?.data?.message)
        }
    }
    return (
        <div className='max-w-3xl mx-auto p-10 bg-teal-100 mt-[5%]'>
            <h1 className='text-3xl text-center font-semibold my-10 text-teal-900'>Generate Unique Password!</h1>
            <div className='flex gap-1'>
                <p className='bg-white border-teal-700 border p-3 rounded-full flex w-full'>{password}</p>
                <button onClick={handleCopy} className='bg-teal-700 hover:opacity-80 cursor-pointer text-white font-bold py-3 px-5 rounded-full'>{copied ? 'Copied' : 'Copy'}</button>
            </div>
            <div>
                <div className='grid grid-cols-2 px-5 gap-5 bg-white my-5 py-5 rounded-lg'>
                    {
                        checkboxData.map((item, index) => {
                            return <div key={index} className='flex gap-5'>
                                <input type='checkbox' checked={item.state} onChange={() => handleChange(index)} />
                                <label className='text-teal-900 font-medium'>{item.title}</label>
                            </div>
                        })
                    }
                </div>
                <div className='flex flex-col gap-4 bg-white my-5 p-5 rounded-lg'>
                    <span>
                        <label className='text-teal-900 font-medium'>Character Length:</label>
                    </span>

                    <div className='flex flex-row gap-5 rounded-lg'>
                        <span className='bg-teal-500 p-4 text-white font-bold rounded-lg'>{length}</span>
                        <div className='bg-white border border-teal-700 rounded-full pt-5 py-3 px-5 w-full'>
                            <input className='bg-white border border-teal-700 w-full' type='range' min='4' max='20' value={length} onChange={(e) => setLength(e.target.value)} />
                        </div>

                    </div>


                </div>
                <div className='flex gap-2 justify-center'>
                    <button onClick={generatePassword} className='bg-teal-700 cursor-pointer hover:opacity-80  text-white font-bold py-3 px-7 rounded-full'>Generate</button>
                    <button onClick={handleSavePassword} className='bg-teal-700 cursor-pointer hover:opacity-80  text-white font-bold py-3 px-7 rounded-full'>Save</button>
                </div>


            </div>



        </div>
    )
}

export default CreatePassword