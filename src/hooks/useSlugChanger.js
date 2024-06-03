import React, { useEffect } from 'react';

export const useSlugChanger = (title) => {

    const [slug, setSlug] = React.useState("");

    useEffect(() => {
        if (title) {
            const slug = title
                .trim() // remove spaces from both ends
                .toLowerCase() // convert to lower case
                .normalize('NFD') // separate accent from letter
                .replace(/[\u0300-\u036f]/g, '') // remove accent
                .replace(/\W+/g, '-') // replace non-alphanumeric and underscore with hyphen
                .replace(/^-+|-+$/g, ''); // remove hyphen from both ends
            setSlug(slug);
        }
    }, [title]);

    return slug;
};

