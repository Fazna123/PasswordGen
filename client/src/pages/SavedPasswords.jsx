import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'



function SavedPasswords() {

    const { currentUser } = useSelector((state) => state.user)
    const [passwordList, setPasswordList] = useState([])
    const [copied, setCopied] = useState(false)

    const getPasswords = async () => {
        const email = currentUser.email
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/password/get-list`, { params: { email } })
            if (response.status === 200) {
                setPasswordList([...response.data.passwords])
            } else {
                console.log(response?.data?.message)
            }

        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const deletePassword = async (passwordId) => {

        try {
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/password/delete/${passwordId}`);
            if (response.data.success) {
                setPasswordList(passwordList.filter((item) => item._id !== passwordId));
            } else {
                console.log(response?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleCopy = (password) => (
        navigator.clipboard.writeText(password),
        setCopied(true),
        setTimeout(() => setCopied(false), 1000)
    )

    return (
        <div className="max-w-3xl mx-auto p-10 bg-teal-100 mt-[5%]">
            <h1 className="text-3xl text-center font-semibold my-10 text-teal-900">
                Saved Passwords
            </h1>
            {copied && <span className="text-blue-500 ml-2">Copied!</span>}

            <div>
                <div className="flex flex-col px-5 gap-5 bg-white my-5 py-5 rounded-lg">
                    {passwordList.length > 0 ? (
                        passwordList.map((item, index) => (
                            <div key={item._id} className="flex gap-5 items-center">
                                <p className="text-teal-900 font-medium">{index + 1}.</p>
                                <p className="text-teal-900 font-medium">{item.password}</p>
                                <button
                                    onClick={() => handleCopy(item.password)}
                                    aria-label="Copy Password"
                                    className="focus:outline-none cursor-pointer ml-10"
                                >
                                    <CopyIcon />

                                </button>
                                <button
                                    onClick={() => deletePassword(item._id)}
                                    aria-label="Delete Password"
                                    className="focus:outline-none cursor-pointer"
                                >
                                    <TrashCanIcon />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-teal-700">No saved passwords found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}


const TrashCanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>

);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
    </svg>

)

export default SavedPasswords