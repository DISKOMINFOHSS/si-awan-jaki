import React from "react";
import { Link, usePage } from "@inertiajs/react";

import Dropdown from "./Dropdown";
import useToggleWithClickOutside from "../Hooks/useToggleWithClickOutside";

import { LiaBarsSolid, LiaUser } from "react-icons/lia";

export default ({ toggleSidebar }) => {
    const { auth } = usePage().props;
    const [
        userDropdownRef,
        isUserDropdownOpened,
        toggleUserDropdown
    ] = useToggleWithClickOutside(false);

    return (
        <header>
            <nav className="min-h-12 flex justify-between items-center px-4 py-2.5 border-b border-slate-200">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded text-slate-600 focus:ring focus:ring-slate-100"
                >
                    <LiaBarsSolid size={20} />
                </button>
                <div className="flex items-center space-x-1">
                    <Dropdown ref={userDropdownRef}>
                        <Dropdown.Toggle
                            onClick={toggleUserDropdown}
                            className="flex items-center space-x-1.5 px-2 py-1.5 rounded hover:bg-slate-100"
                        >
                            <div className="rounded-full h-fit p-2 bg-blue-100 text-blue-600">
                                <LiaUser size={16} />
                            </div>
                            <div className="text-left text-xs text-slate-700">
                                <div className="capitalize">{auth.user.name}</div>
                                <div className="font-light text-[11px] text-slate-500 capitalize">{auth.user.role}</div>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                            isVisible={isUserDropdownOpened}
                            className="min-w-36 flex flex-col right-0 py-2 space-y-0.5 text-xs text-slate-700"
                        >
                            <a href="#" className="px-4 py-2 hover:bg-slate-100 hover:text-blue-600">Pengaturan</a>
                            <Link href="/logout" method="post" as="button" className="text-left px-4 py-2 hover:bg-slate-100 hover:text-blue-600">Keluar</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </header>
    );
}
