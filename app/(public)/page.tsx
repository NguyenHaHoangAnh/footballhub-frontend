"use client";

import Banners from "@/components/Banners";
import Matches from "@/components/Matches";
import Standings from "@/components/Standings";

export default function Home() {
    return (
        <main>
            <Banners />
            <Matches />
            <Standings />
        </main>
    );
}