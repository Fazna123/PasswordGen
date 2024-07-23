import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "../redux/user/userSlice";

function Header() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const handleSignout = async (e) => {
        try {
            console.log("url", import.meta.env.VITE_BASE_URL)
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/signout`)
            dispatch(signOut())

        } catch (error) {
            console.log(error)
            swal('Failed to Logout')
        }
    }

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    return (
        <div className='bg-teal-400 sticky top-0 z-50'>
            <div className='flex justify-between items-center mx-auto py-4 px-10'>
                <Link to={'/'}>
                    <h3 className='text-teal-900 p-3 rounded-lg font-bold text-xl'>Password Generator</h3>
                </Link>

                <button
                    className={`block lg:hidden p-3 text-white`}
                    onClick={toggleMenu}
                >
                    {/* Icon or text for menu toggle */}
                    <span className="text-2xl">☰</span>
                </button>
                {/* <div className={`flex ${isMenuOpen ? 'sm:flex-col lg:flex-row' : 'sm:hidden lg:flex lg:flex-row'}`}>
                    <ul className={`flex flex-col lg:flex-row gap-7 ${isMenuOpen ? 'sm:flex sm:flex-col lg:flex' : 'flex flex-row'}`}> */}
                <div className='hidden lg:flex lg:items-center lg:space-x-7'>
                    <ul className='flex flex-row gap-7'>
                        <Link to={'/'}>
                            <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Home</li>
                        </Link>
                        {currentUser ? (
                            <>
                                <Link to={'/saved-passwords'}>
                                    <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Saved Passwords</li>
                                </Link>
                                <Link to={'/create-password'}>
                                    <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Create Password</li>
                                </Link>
                                <button onClick={handleSignout} className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to={'/sign-up'}>
                                    <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Register</li>
                                </Link>
                                <Link to={'/sign-in'}>
                                    <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Login</li>
                                </Link>
                            </>
                        )}
                    </ul>
                </div>



            </div>
            <div className={`lg:hidden absolute top-16 right-0 bg-teal-400 w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
                <ul className='flex flex-col gap-4 p-4'>
                    <Link to={'/'}>
                        <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Home</li>
                    </Link>
                    {currentUser ? (
                        <>
                            <Link to={'/saved-passwords'}>
                                <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Saved Passwords</li>
                            </Link>
                            <Link to={'/create-password'}>
                                <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Create Password</li>
                            </Link>
                            <Link to={''}>
                                <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Logout</li>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to={'/sign-up'}>
                                <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Register</li>
                            </Link>
                            <Link to={'/sign-in'}>
                                <li className="text-black p-3 rounded-lg hover:text-white hover:bg-teal-700">Login</li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Header