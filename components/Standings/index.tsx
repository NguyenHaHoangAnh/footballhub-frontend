"use client";

import { CompetitionDto } from "@/app/types/competition";
import { SeasonDto } from "@/app/types/season";
import { findAll as findAllCompetitions } from "@/lib/api/competition";
import { findByCompetitionId } from "@/lib/api/season";
import { findByCompetitionIdAndSeasonId } from "@/lib/api/standing";
import { getParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import StandingTable from "./standing-table";

export default function Standings({
    competitionId: _competitionId,
    seasonId: _seasonId,
    teamId,
}: {
    competitionId?: number;
    seasonId?: number;
    teamId?: number;
}) {
    const { t } = useTranslation(["public/standing"]);
    const [competitionId, setCompetitionId] = useState<number | null>(null);
    const [seasonId, setSeasonId] = useState<number | null>(null);
console.log("render", {
    teamId,
    _competitionId,
    _seasonId,
    competitionId,
    seasonId,
});

    useEffect(() => {
        if (!_competitionId || !_seasonId) {
            setCompetitionId(null);
            setSeasonId(null);
            return;
        };
        setCompetitionId(_competitionId);
        setSeasonId(_seasonId);
    }, [_competitionId, _seasonId]);

    const { data: competitionData } = useQuery({
        queryKey: ["findAllCompetitions", _competitionId, teamId],
        queryFn: async () => {
            if (!teamId && !_competitionId) {
                return findAllCompetitions({
                    params: getParams({}, {}, { page: 0, size: 99999 }),
                });
            }
            if (_competitionId) {
                return findAllCompetitions({
                    params: getParams(
                        { "competitionId": { field: "competitionId", type: "number", compare: "equals", value: _competitionId } }, 
                        {}, 
                        { page: 0, size: 1 }
                    ),
                });
            }
            return null;
        }
    });

    const { data: seasonData } = useQuery({
        queryKey: ["findAllSeasons", competitionId, teamId],
        queryFn: async () => {
            if (!competitionId || teamId) return null;
            return findByCompetitionId({ id: competitionId });
        },
        enabled: !!competitionId,
    });

    const { data } = useQuery({
        queryKey: ["findStanding", competitionId, seasonId],
        enabled: !!competitionId && !!seasonId,
        queryFn: () => {
            if (!competitionId || !seasonId) return null;
            return findByCompetitionIdAndSeasonId({
                payload: {
                    competitionId,
                    seasonId,
                }
            });
        }
    });

    const competitionSelect = useMemo(() => {
        if (!competitionData?.data?.content || teamId) return null;
        const competitions: { [key: string]: string } = {};
        competitionData.data.content.forEach((competition: CompetitionDto) => {
            competitions[competition.competitionId.toString()] = competition.name;
        });

        return competitions;
    }, [competitionData?.data?.content]);

    const seasonSelect = useMemo(() => {
        if (!seasonData?.data || teamId) return null;
        const seasons: { [key: string]: string } = {};
        seasonData.data.forEach((season: SeasonDto) => {
            seasons[season.seasonId.toString()] = season.year?.toString() || "";
        });

        return seasons;
    }, [seasonData?.data]);

    useEffect(() => {
        if (!competitionSelect || teamId) return;
        setCompetitionId(Number(Object.keys(competitionSelect)[0]));
    }, [competitionSelect]);

    useEffect(() => {
        if (!seasonSelect || teamId) return;
        setSeasonId(Number(Object.keys(seasonSelect)[0]));
    }, [seasonSelect]);

    return (
        <section className="px-10 py-20 space-y-4">
            <h1 className="text-2xl font-bold">{t("public/standing:title")}</h1>
            {!teamId && (
                <div className="flex items-center gap-2">
                    <Select
                        value={competitionId?.toString() || ""}
                        onValueChange={(value: string) => {
                            if (!value) return;
                            setCompetitionId(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-50">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {competitionSelect && Object.keys(competitionSelect).map((key: string) => (
                                <SelectItem key={key} value={key}>
                                    {competitionSelect[key]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                        value={seasonId?.toString() || ""}
                        onValueChange={(value: string) => {
                            if (!value) return;
                            setSeasonId(Number(value));
                        }}
                    >
                        <SelectTrigger className="w-25">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            {seasonSelect && Object.keys(seasonSelect).map((key: string) => (
                                <SelectItem key={key} value={key}>
                                    {seasonSelect[key]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <StandingTable 
                data={data?.data}
                competition={competitionData?.data?.content.find((item: CompetitionDto) => (item.competitionId === competitionId || _competitionId))}
                teamId={teamId}
            />
        </section>
    );
}