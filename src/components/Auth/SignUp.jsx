"use client"
import React from 'react'
import Input from '../inputs/Input';
import ProfilePhotoSelector from '../inputs/ProfilePhotoSelector';
import { validateEmail } from '@/utils/helper';

const SignUp = () => {
    const [profilePic, setProfilePic] = React.useState(null);
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');


    const handleSignUp = (e) => {
        e.preventDefault();

        let profileImageUrl = '';

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if(password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if(!password){
            setError('Password is required.');
            return;
        }
        if(!fullName){
            setError('Full name is required.');
            return;
        }


        setError('');

        try {
            
        } catch (error) {
           if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            } 
        }
    }
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#FFFCEF]'>
            <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
                <h2 className='text-lg font-semibold text-black'>Create an account</h2>
                <p className='text-slate-700 mt-[5px] mb-6 text-xs'>
                    Join us today! Please fill in the details to create your account.
                </p>
                <form action="">
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email Address"
                        type="text"
                        placeholder="Enter your email"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    {error && <p className='text-red-500 text-xs'>{error}</p>}
                    <button className='btn-primary'>
                        SIGN UP
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account? <span className='text-primary font-medium underline cursor-pointer'>Login</span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp