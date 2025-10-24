"use client"
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import RoleInfoHeader from '../RoleInfoHeader';
import moment from 'moment';
import axiosInstance from '@/utils/axiosInstance';
import { API_PATH } from '@/utils/apiPaths';
import { AnimatePresence, motion } from 'framer-motion';
import QuestionCard from '../Cards/QuestionCard';
import Drawer from '../Drawer';
import { LuCircleAlert } from 'react-icons/lu';
import AIResponsePreview from '../AIResponsePreview';
import SkeletonLoader from '../Loader/SkeletonLoader';

const InterviewPrep = () => {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);

    const [errorMsg, setErrorMsg] = useState("");
    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false)
    const [explanation, setExplanation] = useState(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isUpdateLoader, setIsUpdateLoader] = useState(false);


    const fetchSessionDetailsById = async () => {
        if (!id) {
            setErrorMsg("No session ID provided");
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const response = await axiosInstance.get(API_PATH.SESSION.GET_ONE(id));
            console.log("API Response:", response.data);
            if (response.data) {
                setSessionData(response.data); // Adjust based on API response structure
            } else {
                setErrorMsg("Session not found");
            }
        } catch (error) {
            setErrorMsg("Error fetching session details");
        } finally {
            setIsLoading(false);
        }
    };

    const generateConceptExplanation = async (question) => {
        try {
            setErrorMsg(" ");
            setExplanation(null)

            setIsLoading(true);
            setOpenLearnMoreDrawer(true)


            const response = await axiosInstance.post(
                API_PATH.AI.GENERATE_EXPLANATION,
                {
                    question
                }
            );

            if(response.data) {
                setExplanation(response.data)
            }
        } catch (error) {
            setExplanation(null)
            setErrorMsg("failed to genarate explanation. Try again later")
            console.log("Error:", error)
        } finally{
            setIsLoading(false)
        }
     }

    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(
                API_PATH.QUESTION.PIN(questionId)
            )

            console.log(response)

            if (response.data && response.data.question) {
                fetchSessionDetailsById();
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }

    const uploadMoreQuestions = async () => { }


    useEffect(() => {
        if (id) {
            fetchSessionDetailsById();
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (errorMsg) {
        return <div>{errorMsg}</div>; // Show error message
    }

    return (
        <div>
            <RoleInfoHeader
                role={sessionData?.role || ""}
                topicsToFocus={sessionData?.topicsToFocus || ""}
                experience={sessionData?.experience || "_"}
                questions={sessionData?.questions?.length || "_"}
                description={sessionData?.description || ""}
                lastUpdated={
                    sessionData?.updatedAt
                        ? moment(sessionData.updatedAt).format("Do MM YYYY")
                        : ""
                }
            />


            <div className='container mx-auto py-4 px-4 md:px-0'>
                <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>

                <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                    <div
                        className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}
                    >
                        {sessionData?.questions?.length > 0 ? (
                            <AnimatePresence>
                                {sessionData.questions.map((data, index) => (
                                    <motion.div
                                        key={data?._id || index}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }} // Fixed: Corrected animate values
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 100,
                                            delay: index * 0.1,
                                            damping: 15,
                                        }}
                                        layout
                                        layoutId={`question-${data?._id || index}`}
                                    >
                                        <QuestionCard
                                            question={data.question}
                                            answer={data.answer}
                                            onLearnMore={() => generateConceptExplanation(data.question)}
                                            isPinned={data.isPinned}
                                            onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div>No questions available</div>
                        )}
                    </div>
                </div>

                <div>
                    <Drawer
                        isOpen={openLearnMoreDrawer}
                        onClose={() => setOpenLearnMoreDrawer(false)}
                        title={!isLoading && explanation?.title}

                    >
                        {errorMsg && (
                            <p className='flex items-center gap-2 text-amber-600 font-medium'>
                                <LuCircleAlert /> {errorMsg}
                            </p>
                        )}
                        {!isLoading && <SkeletonLoader />}
                        {!isLoading &7 && explanation && (
                            <AIResponsePreview content={explanation?.explanation}/>
                        )}
                    </Drawer>
                </div>
            </div>
        </div>
    )
}

export default InterviewPrep