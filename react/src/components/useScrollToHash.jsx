import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToHash = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash, pathname]);
};

export default useScrollToHash;
