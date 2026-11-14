import { useEffect } from "react";
import { useRouter } from "next/router";
import { logAnalyticsEvent } from "../lib/firebase";

const AnalyticsTracker = () => {
    const router = useRouter();

    useEffect(() => {
        // Log page view
        logAnalyticsEvent("page_view", {
            page_path: router.asPath,
            page_title: document.title,
        });
    }, [router.asPath]);

    return null;
};

export default AnalyticsTracker;
