"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RoleInfoHeader from "../RoleInfoHeader";
import moment from "moment";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATH } from "@/utils/apiPaths";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "../Cards/QuestionCard";
import Drawer from "../Drawer";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "../AIResponsePreview";
import SkeletonLoader from "../Loader/SkeletonLoader";
import { toast } from "react-toastify";
import SpinnerLoader from "../Loader/SpinnerLoader";

const InterviewPrep = () => {
    const { id } = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation, setExplanation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateLoader, setIsUpdateLoader] = useState(false)

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
                setSessionData(response.data);
            } else {
                setErrorMsg("Session not found");
            }
        } catch (error) {
            setErrorMsg("Error fetching session details");
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateConceptExplanation = async (question) => {
        console.log("Generating explanation for question:", question);
        try {
            setErrorMsg("");
            setExplanation(null);
            setIsLoading(true);
            setOpenLearnMoreDrawer(true);
            console.log("Drawer opened, isLoading:", true);

            const response = await axiosInstance.post(API_PATH.AI.GENERATE_EXPLANATION, {
                question,
            });
            console.log("API Response:", response.data);

            if (response.data?.explanation) {
                setExplanation(response.data);
            } else {
                setErrorMsg("No explanation returned from API");
            }
        } catch (error) {
            setExplanation(null);
            setErrorMsg("Failed to generate explanation. Try again later.");
            console.error("Error generating explanation:", error);
        } finally {
            setIsLoading(false);
            console.log("Loading finished, isLoading:", false);
        }
    };

    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(API_PATH.QUESTION.PIN(questionId));
            console.log("Pin Response:", response.data);
            if (response.data?.question) {
                fetchSessionDetailsById();
            }
        } catch (error) {
            console.error("Pin error:", error);
        }
    };


    const uploadMoreQuestions = async () => {
        try {
            setIsUpdateLoader(true);

            const aiResponse = await axiosInstance.post(API_PATH.AI.GENERATE_QUESTION, {
                role: sessionData?.role,
                experience: sessionData?.experience,
                topicsToFocus: sessionData?.topicsToFocus,
                numberOfQuestions: 10,
            });
            console.log("Generated Questions Response:", aiResponse.data);

            const generateQuestions = aiResponse.data;

            const response = await axiosInstance.post(API_PATH.QUESTION.ADD_TO_SESSION, {
                sessionId: id, 
                questions: generateQuestions,
            });
            console.log("Add Questions Response:", response.data);

            if (response.data) {
                toast.success("Added More Q&A");
                await fetchSessionDetailsById();
                console.log("Updated sessionData:", sessionData);
            } else {
                setErrorMsg("Failed to add questions to session");
            }
        } catch (error) {
            console.error("Error in uploadMoreQuestions:", error);
            if (error.response && error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Something went wrong while adding questions.");
            }
        } finally {
            setIsUpdateLoader(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSessionDetailsById();
        }
    }, [id]);

    if (errorMsg && !sessionData) {
        return <div>{errorMsg}</div>;
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

            <div className="container mx-auto py-4 px-3 md:px-4">
                <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>

                <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                    <div
                        className={`col-span-12 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}
                    >
                        <AnimatePresence>
                            {sessionData?.questions?.map((data, index) => (
                                <motion.div
                                    key={data?._id || index}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
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
                                    <>
                                        <QuestionCard
                                            question={data.question}
                                            answer={data.answer}
                                            onLearnMore={() => generateConceptExplanation(data.question)}
                                            isPinned={data.isPinned}
                                            onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                                        />


                                        {!isLoading &&
                                            sessionData?.questions?.length == index + 1 && (
                                                <div className="flex items-center justify-center mt-5">
                                                    <button
                                                        className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-0 rounded text-nowrap cursor-pointer"
                                                        onClick={uploadMoreQuestions}
                                                        disabled={isLoading || isUpdateLoader}>
                                                        {isUpdateLoader ? (
                                                            <SpinnerLoader />
                                                        ) : (
                                                            <LuListCollapse className="text-lg" />
                                                        )}
                                                        Load More
                                                    </button>
                                                </div>
                                            )}
                                    </>

                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <Drawer
                    isOpen={openLearnMoreDrawer}
                    onClose={() => setOpenLearnMoreDrawer(false)}
                    title={isLoading ? "Loading..." : explanation?.title || "Explanation"}
                >
                    {errorMsg && (
                        <p className="flex items-center gap-2 text-amber-600 font-medium">
                            <LuCircleAlert /> {errorMsg}
                        </p>
                    )}
                    {isLoading && <SkeletonLoader />}
                    {!isLoading && explanation && (
                        <AIResponsePreview content={explanation?.explanation || ""} />
                    )}
                </Drawer>
            </div>
        </div>
    );
};

export default InterviewPrep;