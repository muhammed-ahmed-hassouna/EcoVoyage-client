import React, { createContext, useContext, useState, useEffect } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState("dashboard");
    const [selectedId, setSelectedId] = useState(1);

    const onSelectedPage = (selectedPage) => {
        setPage(selectedPage);
    };
    const onSelectedId = (id) => {
        setSelectedId(id);
    };

    const pageContextValue = {
        page,
        onSelectedPage,
        selectedId,
        onSelectedId,
    };

    return (
        <PageContext.Provider value={pageContextValue}>
            {children}
        </PageContext.Provider>
    );
};

export const usePage = () => {
    return useContext(PageContext);
};
