import { StandingUpdateManuallyRequestDto } from "@/app/types/standing";
import axiosInstanceBasePublic from "../axios-instance-base-public";

export async function findByCompetitionIdAndSeasonId({
    payload
}: {
    payload: StandingUpdateManuallyRequestDto;
}) {
    try {
        const response = await axiosInstanceBasePublic.post("/public/standings", payload);

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}