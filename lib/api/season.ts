import axiosInstanceBasePublic from "../axios-instance-base-public";

export async function findByCompetitionId({
    id,
}: {
    id: number;
}) {
    try {
        const response = await axiosInstanceBasePublic.get(`/public/seasons/competition/${id}`);

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}