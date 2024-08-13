import { useEffect, useState } from "react";

const useSectionObserver = (sectionId) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            {
                root: null, // viewport
                rootMargin: "0px",
                threshold: 0.6, // 60% of the section must be visible
            }
        );

        observer.observe(section);

        return () => {
            observer.unobserve(section);
        };
    }, [sectionId]);

    return isIntersecting;
};

export default useSectionObserver;
