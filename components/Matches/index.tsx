"use client";

import { useTranslation } from "react-i18next";
import MatchItem from "./MatchItem";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { findAll } from "@/lib/api/match";
import { findAll as findAllCompetitions } from "@/lib/api/competition";
import { getParams } from "@/lib/utils";
import { MatchDto } from "@/app/types/match";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CompetitionDto } from "@/app/types/competition";
import CustomPagination from "../CustomPagination";
import { Pagination } from "@/app/types/table";

export default function Matches({
    teamId,
}: {
    teamId?: number;
}) {
    const { t } = useTranslation(["public/match"]);
    const [pagination, setPagination] = useState<Pagination>({ page: 0, size: 12 });
    const [competitionId, setCompetitionId] = useState<number | null>(null);

    const { data } = useQuery({
        queryKey: ["findAllMatches", competitionId, teamId, pagination.page, pagination.size],
        queryFn: async () => {
            if (!competitionId) {
                if (!teamId) {
                    return findAll({
                        params: getParams(
                            {},
                            { "startDate": { column: "startDate", value: "desc" } },
                            { page: pagination.page, size: pagination.size },
                        ),
                    });
                }
                return findAll({
                    params: getParams(
                        { 
                            "homeTeamId": { field: "homeTeamId", type: "number", compare: "equals", value: Number(teamId), operator: "or" }, 
                            "awayTeamId": { field: "awayTeamId", type: "number", compare: "equals", value: Number(teamId), operator: "or" }, 
                        },
                        { "startDate": { column: "startDate", value: "desc" } },
                        { page: pagination.page, size: pagination.size },
                    ),
                });
            }
            return findAll({
                params: getParams(
                    { "competitionId": { field: "competitionId", type: "number", compare: "equals", value: competitionId } },
                    { "startDate": { column: "startDate", value: "desc" } },
                    { page: pagination.page, size: pagination.size },
                ),
            })
        },
    });

    const { data: competitionData } = useQuery({
        queryKey: ["findAllCompetitions", teamId],
        queryFn: async () => {
            if (teamId) return null;
            return findAllCompetitions({
                params: getParams({}, {}, { page: 0, size: 99999 }),
            });
        }
    });
    
    const competitionSelect = useMemo(() => {
        if (!competitionData?.data?.content) return null;
        const competitions: { [key: string]: string } = {};
        competitionData.data.content.forEach((competition: CompetitionDto) => {
            competitions[competition.competitionId.toString()] = competition.name;
        });

        return competitions;
    }, [competitionData?.data?.content]);

    const onPageChange = (page: number, size: number) => {
        setPagination({
            page,
            size,
        });
    }

    return (
        <section className="px-10 py-20 space-y-4">
            <h1 className="text-2xl font-bold">{t("public/match:title")}</h1>
            {!teamId && (
                <Select
                    value={competitionId?.toString() || "null"}
                    onValueChange={(value: string) => {
                        if (!value) return;
                        if (value === "null") setCompetitionId(null);
                        setCompetitionId(Number(value));
                    }}
                >
                    <SelectTrigger className="w-50">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="null">
                            {t("public/match:competition")}
                        </SelectItem>
                        {competitionSelect && Object.keys(competitionSelect).map((key: string) => (
                            <SelectItem key={key} value={key}>
                                {competitionSelect[key]}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data?.data?.content && data?.data?.content.map((match: MatchDto, index: number) => (
                        <MatchItem data={match} key={index}/>
                    ))}
                </div>
                <CustomPagination 
                    totalPages={data?.data?.totalPages}
                    totalElements={data?.data?.totalElements}
                    currentPage={pagination.page}
                    pageSize={pagination.size}
                    onPageChange={onPageChange}
                    pageOptions={[12]}
                />
            </div>
        </section>
    );
}