import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logAnalyticsEvent } from "../lib/firebase";

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Log page view
        logAnalyticsEvent("page_view", {
            page_path: location.pathname + location.search,
            page_title: document.title,
        });
    }, [location]);

    return null;
};

export default AnalyticsTracker;
