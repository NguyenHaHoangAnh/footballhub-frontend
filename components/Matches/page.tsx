"use client";

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export default function Matches() {
    const { t } = useTranslation(["common", "site"]);

    return (
        <div>
            <h1>{t("site:matches.title")}</h1>
            <Button>
                {t("common:save")}
            </Button>
        </div>
    );
}