import { useEffect, useMemo, useState } from "react";
import determineDisplaySize from "../utils/determineDisplaySize";

const useResponsive = () => {
    const [currentDisplaySize, setCurrentDisplaySize] = useState(
        determineDisplaySize(window.innerWidth)
    );

    useEffect(() => {
        const handler = () => setCurrentDisplaySize(determineDisplaySize(window.innerWidth));
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return useMemo(() => currentDisplaySize, [currentDisplaySize]);
};

export default useResponsive;
