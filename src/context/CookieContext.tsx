import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import {Product} from "@/types";

// Define the shape of the context value
interface CookieContextType {
    cookie: string;
    setCookieValue: (name: string, value: string, options?: Cookies.CookieAttributes) => void;
    removeCookieValue: (name: string) => void;
    getRecentlyViewed: () => Promise<Product[]>; // Define the return type as any[] for simplicity
}

// Create the context with a default value
const CookieContext = createContext<CookieContextType | undefined>(undefined);

// Custom hook to use the CookieContext
export const useCookie = (): CookieContextType => {
    const context = useContext(CookieContext);
    if (!context) {
        throw new Error('useCookie must be used within a CookieProvider');
    }
    return context;
};

// Define the props for the CookieProvider component
interface CookieProviderProps {
    children: ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
    const [cookie, setCookie] = useState<string>(Cookies.get('productsId') || '');

    const getRecentlyViewed = async (): Promise<any[]> => {
        const data = cookie.split('/');
        let slice: string[] = [];
        if (data.length > 3) {
            slice = data.slice(0, 3);
        } else if (data.length === 2) {
            slice = data.slice(0, 1);
        } else if (data.length === 3) {
            slice = data.slice(0, 2);
        }
        const productPromises = slice.map((id) =>
            fetch(`http://localhost:3000/products/${id}`).then((res) => res.json())
        );
        const products = await Promise.all(productPromises);
        return products;
    };

    useEffect(() => {
        if (!Cookies.get('productsId')) {
            Cookies.set('productsId', '', { expires: 7 });
            setCookie(Cookies.get('productsId') || '');
        }
    }, []);

    const setCookieValue = (name: string, value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(name, value, options);
        setCookie(Cookies.get('productsId') || '');
    };

    const removeCookieValue = (name: string) => {
        Cookies.remove(name);
        setCookie('');
    };

    return (
        <CookieContext.Provider value={{ cookie, setCookieValue, removeCookieValue, getRecentlyViewed }}>
            {children}
        </CookieContext.Provider>
    );
};
