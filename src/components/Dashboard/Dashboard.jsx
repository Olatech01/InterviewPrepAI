"use client"
import { API_PATH } from '@/utils/apiPaths'
import axiosInstance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import SummaryCard from '../Cards/SummaryCard'
import { CARD_BG } from '@/utils/data'
import moment from 'moment'
import CreateSessionForm from './CreateSessionForm'
import DeleteAlertContent from './DeleteAlertContent'
import Modal from '../Modal'
import { toast } from 'react-toastify'
import { LuLoader } from 'react-icons/lu'

const Dashboard = () => {
    const router = useRouter()

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [sessions, setSessions] = useState([])
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        data: null,
        open: false
    })
    const [isLoading, setIsLoading] = useState(true)


    const fetchAllSessions = async () => {
        try {
            const response = await axiosInstance.get(API_PATH.SESSION.GET_ALL)
            setSessions(response.data)
        } catch (error) {
            console.error("Error fetching sessions data:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteSession = async (sessionData) => {
        try {
            await axiosInstance.delete(API_PATH.SESSION.DELETE(sessionData?._id))
            toast.success("Session Deleted Successfully!!")
            window.location.reload();
            setOpenDeleteAlert({
                open: false,
                data: null
            })
            fetchAllSessions();
        } catch (error) {
            console.error("Error deleting session data:", error)
        }
    }


    useEffect(() => {
        fetchAllSessions()
    }, [])
    return (
        <div className='container mx-auto pt-4 pb-4'>
            {/* {sessions?.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="mb-4">
                            <LuPlus className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No Interview Sessions Yet
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Get started by creating your first interview preparation session.
                            Click the button below to begin your journey!
                        </p>
                        <button
                            onClick={() => setOpenCreateModal(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-white rounded-full hover:shadow-lg transition-all duration-200"
                        >
                            <LuPlus className="h-5 w-5" />
                            Create First Session
                        </button>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 mt-1 pb-6 px-4 md:mx-0'>
                    {sessions?.map((data, index) => (
                        <SummaryCard
                            key={data?._id}
                            colors={CARD_BG[index % CARD_BG.length]}
                            role={data?.role || ""}
                            topicsToFocus={data?.topicsToFocus || ""}
                            experience={data?.experience || "_"}
                            questions={data?.questions || ""}
                            description={data?.description || ""}
                            lastUpdated={
                                data?.updatedAt
                                    ? moment(data.updatedAt).format("Do MM YYYY")
                                    : ""
                            }
                            onSelect={() => router.push(`/interview-prep/${data?._id}`)}
                            onDelete={() => setOpenDeleteAlert({ open: true, data })}
                        />
                    ))}
                </div>
            )} */}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <LuLoader className="w-10 h-10 text-orange-500 animate-spin" />
                    <p className="mt-4 text-sm text-gray-500">Loading your sessions...</p>
                </div>
            ) : sessions?.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-full max-w-md text-center">
                        <div className="mb-4">
                            <LuPlus className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No Interview Sessions Yet
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Get started by creating your first interview preparation session.
                            Click the button below to begin your journey!
                        </p>
                        <button
                            onClick={() => setOpenCreateModal(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-white rounded-full hover:shadow-lg transition-all duration-200"
                        >
                            <LuPlus className="h-5 w-5" />
                            Create First Session
                        </button>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 mt-1 pb-6 px-4 md:mx-0'>
                    {sessions?.map((data, index) => (
                        <SummaryCard
                            key={data?._id}
                            colors={CARD_BG[index % CARD_BG.length]}
                            role={data?.role || ""}
                            topicsToFocus={data?.topicsToFocus || ""}
                            experience={data?.experience || "_"}
                            questions={data?.questions || ""}
                            description={data?.description || ""}
                            lastUpdated={
                                data?.updatedAt
                                    ? moment(data.updatedAt).format("Do MM YYYY")
                                    : ""
                            }
                            onSelect={() => router.push(`/interview-prep/${data?._id}`)}
                            onDelete={() => setOpenDeleteAlert({ open: true, data })}
                        />
                    ))}
                </div>
            )}
            <button onClick={() => setOpenCreateModal(true)} className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black transition-colors cursor-pointer hover:shadow-2xl hover:shadow-amber-200 fixed bottom-10 md:bottom-20 right-10 md:right-20'>
                <LuPlus />
                Add new
            </button>


            {openCreateModal && (
                <CreateSessionForm />
            )}

            <Modal
                isOpen={openDeleteAlert?.open}
                onClose={() => {
                    setOpenDeleteAlert({ open: false, data: null })
                }}
                title={"Delete Alert"}
            >
                <div>
                    <DeleteAlertContent
                        content="Are you sure you want to delete this session detail!!"
                        onDelete={() => deleteSession(openDeleteAlert.data)}
                    />
                </div>
            </Modal>


        </div>
    )
}

export default Dashboard