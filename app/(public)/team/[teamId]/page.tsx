"use client";

import { TeamDto } from "@/app/types/team";
import Matches from "@/components/Matches";
import Standings from "@/components/Standings";
import { findById as findByTeamId } from "@/lib/api/team";
import { IMAGE_FALLBACK } from "@/lib/constant";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Team() {
    const { teamId } = useParams() as { teamId: string };

    const { data } = useQuery({
        queryKey: ["findTeamById", teamId],
        queryFn: async () => {
            if (!teamId) return;
            return findByTeamId({ id: Number(teamId) });
        },
        enabled: !!teamId,
    });

    return (
        <div>
            <TeamInfo data={data?.data} />
            <Matches teamId={Number(teamId)} />
            <Standings 
                competitionId={data?.data?.currentCompetitionId} 
                seasonId={data?.data?.currentSeasonId}
                teamId={Number(teamId)}
            />
        </div>
    );
}

function TeamInfo({
    data,
}: {
    data: TeamDto | null | undefined;
}) {
    const { t } = useTranslation(["public/team"]);
    
    return (
        <div className="px-10 pt-30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex items-center gap-2">
                    <Image 
                        src={data?.logoUrl || IMAGE_FALLBACK.logo}
                        alt={data?.name || ""}
                        width={160}
                        height={160}
                        className="w-10 h-10 md:w-36 md:h-36"
                    />
                    <h1 className="block md:hidden text-2xl font-semibold">{data?.name}</h1>
                </div>
                <div className="flex flex-col ml-0 md:mt-2">
                    <h1 className="hidden md:block text-xl font-semibold">{data?.name}</h1>
                    <div className="grid grid-cols-1">
                        <div className="flex items-baseline gap-1">
                            <span className="shrink-0 font-medium">{t("public/team:info.website")}:</span>
                            {data?.website && (
                                <Link href={data.website} className="text-blue-500 hover:underline">
                                    {data.website}
                                </Link>
                            )}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="shrink-0 font-medium">{t("public/team:info.address")}:</span>
                            <span>{data?.address}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="shrink-0 font-medium">{t("public/team:info.venue")}:</span>
                            <span>{data?.venue}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="shrink-0 font-medium">{t("public/team:info.founded")}:</span>
                            <span>{data?.founded}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}