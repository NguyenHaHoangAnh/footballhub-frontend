"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { MatchDto } from "@/app/types/match";
import { IMAGE_FALLBACK, MATCH_STATUS } from "@/lib/constant";
import { useTranslation } from "react-i18next";
import { formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MatchItem({
    data
}: {
    data: MatchDto
}) {
    const { t } = useTranslation(["public/match"]);
    const router = useRouter();

    return (
        <Card 
            className="flex flex-col items-center gap-4 px-5 py-3 h-[214px]"
        >
            <div className="flex flex-col items-center w-full">
                <div className="flex gap-2">
                    <Image 
                        src={data.competition?.logoUrl || IMAGE_FALLBACK.logoUrl}
                        alt="league-logo"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                    />
                    <p>{data.competition?.name || t("public/match:competition")}</p>
                </div>
                <p>{`${t("public/match:matchDay")} ${data.matchDay || 0}`}</p>
            </div>
            <div className="flex justify-between items-start gap-1 md:gap-2 lg:gap-5 w-full">
                <div 
                    className="flex flex-col justify-center items-center w-30 cursor-pointer"
                    onClick={() => {
                        if (!data.homeTeam?.teamId) return;
                        router.push(`/team/${data.homeTeam.teamId}`);
                    }}
                >
                    <Image 
                        src={data.homeTeam?.logoUrl || IMAGE_FALLBACK.logo} 
                        alt="home-logo" 
                        width={50}
                        height={50}
                    />
                    <p className="text-center">{data.homeTeam?.name || t("public/match:homeTeam")}</p>
                </div>
                <div className="flex flex-col justify-center items-center text-center">
                    {data?.status === MATCH_STATUS.TIMED ? (
                        <div>VS</div>
                    ) : (
                        <div>{data.scoreHome || 0} - {data.scoreAway || 0}</div>
                    )}
                    <div>{data.startDate && formatDateTime(data.startDate, "HH:mm DD/MM/YYYY")}</div>
                    <div
                        className={`p-2 ${(data.status?.toString() === MATCH_STATUS.LIVE || data.status?.toString() === MATCH_STATUS.IN_PLAY) && "rounded-full bg-red-500"}`}
                    >
                        {t(`public/match:status.${data?.status?.toString().toLowerCase()}`)}
                    </div>
                </div>
                <div 
                    className="flex flex-col justify-center items-center w-30 cursor-pointer"
                    onClick={() => {
                        if (!data.awayTeam?.teamId) return;
                        router.push(`/team/${data.awayTeam.teamId}`);
                    }}
                >
                    <Image 
                        src={data.awayTeam?.logoUrl || IMAGE_FALLBACK.logo} 
                        alt="away-logo" 
                        width={50}
                        height={50}
                    />
                    <p className="text-center">{data.awayTeam?.name || t("public/match:awayTeam")}</p>
                </div>
            </div>
        </Card>
    );
}