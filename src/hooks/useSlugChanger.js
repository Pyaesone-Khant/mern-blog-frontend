import React, { useEffect } from 'react';

export const useSlugChanger = (title) => {

    const [slug, setSlug] = React.useState("");

    useEffect(() => {
        if (title) {
            const slug = title
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\u1000-\u109F\s]/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .toLowerCase()
            .replace(/^-+|-+$/g, '');

            setSlug(slug);
        }
    }, [title]);

    return slug;
};

