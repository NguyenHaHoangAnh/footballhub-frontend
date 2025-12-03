"use client";

import { Card } from "../ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function MatchItem({
    data
}: {
    data: any
}) {
    return (
        <Card 
            className="flex flex-col items-center gap-4 px-5 py-3"
        >
            <div className="flex gap-2">
                <Image 
                    src={data.league.logo}
                    alt="league-logo"
                    width={24}
                    height={24}
                />
                <p>{data.league.name}</p>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col justify-center items-center">
                    <Image 
                        src={data.homeTeam.logo} 
                        alt="home-logo" 
                        width={50}
                        height={50}
                    />
                    <p className="text-center">{data.homeTeam.name}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <p>VS</p>
                    <p>{data?.startTime ? format(data.startTime, "hh:mm", {locale: vi}) : ""}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Image 
                        src={data.awayTeam.logo} 
                        alt="away-logo" 
                        width={50}
                        height={50}
                    />
                    <p className="text-center">{data.awayTeam.name}</p>
                </div>
            </div>
        </Card>
    );
}