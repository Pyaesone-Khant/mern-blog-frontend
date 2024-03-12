import React, {useEffect} from 'react';

export const useSlugChanger = (title) => {

    const [slug, setSlug] = React.useState("");

    useEffect(() => {
        if (title) {
            const slug = title?.trim().toLowerCase().replace("?", "").split(" ").join("-");
            setSlug(slug);
        }
    }, [title]);

    return slug;
};

