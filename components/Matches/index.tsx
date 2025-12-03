"use client";

import { useTranslation } from "react-i18next";
import { EXAMPLE_MATCH } from "@/lib/constant";
import MatchItem from "./MatchItem";

const EXAMPLE_MATCHES = Array.from({ length: 12 }, () => EXAMPLE_MATCH);

export default function Matches() {
    const { t } = useTranslation("site");

    return (
        <section className="px-[120px] py-10 space-y-4">
            <h1>{t("matches.title")}</h1>
            <div className="grid grid-cols-3 gap-4">
                {EXAMPLE_MATCHES && EXAMPLE_MATCHES.map((match, index) => (
                    <MatchItem data={match} key={index}/>
                ))}
            </div>
        </section>
    );
}