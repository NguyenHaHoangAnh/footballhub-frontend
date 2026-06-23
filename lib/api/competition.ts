import axiosInstanceBasePublic from "../axios-instance-base-public";

export async function findAll({
    params,
}: {
    params: string
}) {
    try {
        const response = await axiosInstanceBasePublic.get(`/public/competitions?${params}`);

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}