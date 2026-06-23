"use client";

import { StandingResponseDto } from "@/app/types/standing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useTranslation } from "react-i18next";
import { Check, Minus, X } from "lucide-react";
import { COMPETITION_RELEGATE_SLOTS, COMPETITION_TOTAL_TEAMS, IMAGE_FALLBACK, RESULT_STATUS } from "@/lib/constant";
import Image from "next/image";
import { CompetitionDto } from "@/app/types/competition";
import { useRouter } from "next/navigation";

export default function StandingTable({
    data,
    competition,
    teamId,
}: {
    data: StandingResponseDto[] | null | undefined;
    competition: CompetitionDto | null | undefined;
    teamId?: number;
}) {
    const { t } = useTranslation(["public/standing"]);
    const router = useRouter();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t("public/standing:column.no")}</TableHead>
                    <TableHead>{t("public/standing:column.teamName")}</TableHead>
                    <TableHead>{t("public/standing:column.playedGames")}</TableHead>
                    <TableHead>{t("public/standing:column.won")}</TableHead>
                    <TableHead>{t("public/standing:column.draw")}</TableHead>
                    <TableHead>{t("public/standing:column.lost")}</TableHead>
                    <TableHead>{t("public/standing:column.goalsFor")}</TableHead>
                    <TableHead>{t("public/standing:column.goalsAgainst")}</TableHead>
                    <TableHead>{t("public/standing:column.goalsDifference")}</TableHead>
                    <TableHead>{t("public/standing:column.points")}</TableHead>
                    <TableHead>{t("public/standing:column.form")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && competition && data.map((item: StandingResponseDto, index: number) => (
                    <TableRow 
                        key={index}
                        className={`
                            ${(index + 1 > COMPETITION_TOTAL_TEAMS[competition.code] - COMPETITION_RELEGATE_SLOTS[competition.code]) && "bg-red-200"}
                            ${teamId && teamId === item.teamId && "bg-blue-100"}
                        `}
                    >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            <div 
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => {
                                    router.push(`/team/${item.teamId}`);
                                }}
                            >
                                <Image 
                                    src={item.teamLogoUrl || IMAGE_FALLBACK.logo}
                                    alt={item.teamName || ""}
                                    width={24}
                                    height={24}
                                />
                                {item.teamName}
                            </div>
                        </TableCell>
                        <TableCell>{item.playedGames}</TableCell>
                        <TableCell>{item.won}</TableCell>
                        <TableCell>{item.draw}</TableCell>
                        <TableCell>{item.lost}</TableCell>
                        <TableCell>{item.goalsFor}</TableCell>
                        <TableCell>{item.goalsAgainst}</TableCell>
                        <TableCell>{item.goalsDifference}</TableCell>
                        <TableCell>{item.points}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {Array.from({ length: 5 }, (_, index: number) => {
                                    if (!item?.form) return;
                                    const forms = item?.form.split(",");

                                    return (
                                        <div key={index} className={`flex justify-center items-center w-4 h-4 p-0.5 rounded-full text-white
                                            ${forms[index] === RESULT_STATUS.WON
                                                ? "bg-green-500 ring-green-500"
                                                : forms[index] === RESULT_STATUS.DRAW
                                                    ? "bg-gray-500 ring-gray-500"
                                                    : forms[index] === RESULT_STATUS.LOST 
                                                        ? "bg-red-500 ring-red-500"
                                                        : ""
                                            }
                                            ${index === (forms.length - 1) ? "ring-2 ring-offset-2 ring-offset-white" : ""}
                                        `}   >
                                            {forms[index] === RESULT_STATUS.WON
                                                ? <Check />
                                                : forms[index] === RESULT_STATUS.DRAW
                                                    ? <Minus />
                                                    : forms[index] === RESULT_STATUS.LOST
                                                        ? <X />
                                                        : null
                                            }
                                        </div>
                                    );
                                })}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}