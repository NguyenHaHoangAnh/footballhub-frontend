import axiosInstanceBasePublic from "../axios-instance-base-public";

export async function findById({
    id,
}: {
    id: number
}) {
    try {
        const response = await axiosInstanceBasePublic.get(`/public/teams/${id}`);

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}