"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Input from '../inputs/Input'
import SpinnerLoader from '../Loader/SpinnerLoader'
import axiosInstance from '@/utils/axiosInstance'
import { API_PATH } from '@/utils/apiPaths'

const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        description: "",
        experience: "",
        topicsToFocus: ""
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }))
    }


    const handleCreateSession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields..")
            return;
        }

        setError("");
        setIsLoading(true)
        try {
            const aiResponse = await axiosInstance.post(
                API_PATH.AI.GENERATE_QUESTION, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10
            }
            )

            const generateQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATH.SESSION.CREATE, {
                ...formData,
                questions: generateQuestions
            })

            if (response.data?.session?._id) {
                router.push(`/interview-prep/${response.data?.session?._id}`)
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError("Something went wrong. Please try again")
            }
        } finally {
            setIsLoading(false)
        }
    }
    return <div className="fixed inset-0 w-full h-screen bg-[#000000]/50 z-50 flex justify-center items-center">
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center bg-white rounded-xl'>
            <h2 className='text-lg font-semibold text-black'>
                Start a New Interview Journey
            </h2>
            <p className='text-xs text-slate-700 mt-[5px] mb-3'>
                Fill out a few quick details and unlock your personalized set of interview questions
            </p>
            <form onSubmit={handleCreateSession} className='flex flex-col gap-3'>
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g Frontend Developer, UI/UX Designer, etc...)"
                    type="text"
                />
                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="(e.g 1 year, 3 years, 5+ years)"
                    type="number"
                />
                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics To Focus On"
                    placeholder="(Comma-Seperated, e.g., React, MongoDb, Next.js..)"
                    type="text"
                />
                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any specific goals or notes for this session)"
                    type="text"
                />

                {error && <div className='text-red-500 text-xs pb-2.5'>{error}</div>}


                <button
                    type='submit'
                    className='w-full btn-primary mt-2'
                    disabled={isLoading}>
                    {isLoading && <SpinnerLoader />} Create session
                </button>
            </form>
        </div>
    </div>

}

export default CreateSessionForm