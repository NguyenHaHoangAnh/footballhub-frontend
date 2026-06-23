import axios from "axios";

const axiosInstanceBasePublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstanceBasePublic.interceptors.request.use(
    // Add accessToken to headers
    async (config) => {
        config.headers["Accept-Language"] = "vi";
        config.headers['Authorization'] = undefined
        delete config.headers['Authorization'];

        return config;
    },
    (error) => Promise.reject(error),
);

axiosInstanceBasePublic.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Nếu lỗi 401, 403 -> đăng xuất + redirect sang signin
        if ([401, 403].includes(error?.response?.status)) {
            // await signOut({ redirect: true, redirectTo: "/auth/sign-in" });
        }

        return Promise.reject(error);
    }
);

export default axiosInstanceBasePublic;