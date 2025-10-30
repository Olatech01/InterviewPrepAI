import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";


const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated
}) => {
    return <div className='bg-white relative'>
        <div className='container mx-auto px-10 md:px-4'>
            <div className='h-[200px] flex flex-col justify-center  relative z-10'>
                <button className='flex items-center justify-between border border-gray-400 rounded-full px-6 gap-2 py-1 w-fit'>
                   <IoIosArrowRoundBack /> Back
                </button>
                <div className='flex items-start'>
                    <div className='flex-grow'>
                        <div className='flex justify-between items-start'>
                            <div>
                                <h2 className='font-medium text-2xl'>
                                    {role}
                                </h2>
                                <p className='text-sm font-medium text-gray-900 mt-1'>
                                    {topicsToFocus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-center gap-3 mt-4'>
                    <div className='text-[10px] font-medium text-white bg-black px-3 py-1 rounded-full'>
                        Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
                    </div>
                    <div className='text-[10px] font-medium text-white bg-black px-3 py-1 rounded-full'>
                        {questions === "_" ? "0" : questions} Q&A
                    </div>
                    <div className='text-[10px] font-medium text-white bg-black px-3 py-1 rounded-full'>
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </div>
            <div className='w-[40vw] md:w-[40vw] h-[200px] flex items-center justify-between bg-white absolute top-0 right-0 overflow-hidden'>
                <div className='h-16 w-16 bg-lime-400 blur-[65px] animate-blob1'></div>
                <div className='h-16 w-16 bg-teal-400 blur-[65px] animate-blob1'></div>
                <div className='h-16 w-16 bg-cyan-400 blur-[65px] animate-blob1'></div>
                <div className='h-16 w-16 bg-fuchsia-400 blur-[65px] animate-blob1'></div>
            </div>
        </div>
    </div>

}

export default RoleInfoHeader