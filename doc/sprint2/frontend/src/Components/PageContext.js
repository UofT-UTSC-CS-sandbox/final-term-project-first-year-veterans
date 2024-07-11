import React, { createContext, useState, useContext } from 'react';

const PageContext = createContext();

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('Search');

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <PageContext.Provider value={{ currentPage, handlePageChange }}>
            {children}
        </PageContext.Provider>
    );
};