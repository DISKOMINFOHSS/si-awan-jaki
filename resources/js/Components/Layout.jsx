import React from "react";

import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [windowSize, setWindowSize] = React.useState([window.innerWidth, window.innerHeight]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    React.useEffect(() => {
        windowSize[0] >= 1024 ? setIsSidebarOpen(true) : setIsSidebarOpen(false);
    }, [windowSize]);

    return (
        <main className="relative flex">
            <Sidebar isOpened={isSidebarOpen} />
            <div className="w-full grow overflow-auto">
                <Navigation toggleSidebar={toggleSidebar} />
                <section className="p-7">
                    {children}
                </section>
            </div>
        </main>
    );
}
