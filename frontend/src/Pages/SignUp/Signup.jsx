import { useState } from 'react';
import {useNavigate } from "react-router-dom"
import { useAuthStore } from '../../Store/authStore';
import Input from '../../Components/Input';


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const Navigate = useNavigate();
    const { signup, error} = useAuthStore();



    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await signup(signupInfo.email, signupInfo.phone, signupInfo.name, signupInfo.address);
            Navigate("/verification");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div>

                <h1>signup</h1>
                <form onSubmit={handleSignup}>
                    <Input
                        type='text'
                        placeholder='Full Name'
                        value={signupInfo.name}
                        name='name'
                        onChange={handleChange}
                        autoFocus
                    />
                    <Input
                        type='email'
                        placeholder='Email Address'
                        value={signupInfo.email}
                        name='email'
                        onChange={handleChange}
                        autoFocus
                    />
                    <Input
                        type='number'
                        placeholder='Phone'
                        value={signupInfo.phone}
                        name='phone'
                        onChange={handleChange}
                    />
                    <Input
                        type='text'
                        placeholder='Address'
                        value={signupInfo.address}
                        name='address'
                        onChange={handleChange}
                    />
                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        
                    >
                        Sign Up
                    </button>
                </form>
            </div>

        </>

    )
}

export default Signup