export const BASE_URL = "http://localhost:5000";


export const API_PATH = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_PROFILE: "/api/auth/profile",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image"
    },
    AI: {
        GENERATE_QUESTION: "/api/ai/generate-question",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation"
    },
    SESSION: {
        CREATE: "/api/sessions/create",
        GET_ALL: "/api/sessions/my-sessions",
        GET_ONE: (id) => `/api/sessions/${id}`,
        DELETE: (id) => `/api/sessions/${id}`
    },
    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",
        PIN: (id) => `/api/questions/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
    }
}