import React from "react";
import { Link, usePage } from "@inertiajs/react";
import classNames from "classnames";

import {
    LiaCloudSolid,
    LiaHomeSolid,
} from "react-icons/lia";

function Sidebar({ isOpened, children }) {
    const asideClass = classNames(
        "relative block min-w-72 h-screen overflow-y-auto bg-white border-r border-slate-200 p-4",
        {
            "hidden": !isOpened,
        }
    );

    return (
        <aside className={asideClass}>
            <Link href="#" className="block min-h-12 mb-2.5">
                    <LiaCloudSolid className="text-blue-600" size={48} />
                </Link>
            <div className="space-y-5">
                {children}
            </div>
        </aside>
    );
}

function Menu({ title, children }) {
    return (
        <div>
            {
                title &&
                <div className="font-medium text-xs text-slate-500 tracking-wide uppercase mb-2">{title}</div>
            }
            {children}
        </div>
    );
}

function Item({ href, icon, text }) {
    const { url }  = usePage();
    const isActive = url.includes(href);

    const menuClass = classNames(
        "group flex items-center space-x-2.5 p-3 rounded text-sm leading-5 hover:bg-slate-100 hover:text-blue-600",
        {
            "text-blue-600 bg-slate-100": isActive,
            "text-slate-700": !isActive,
        }
    );

    const iconClass = classNames({
        "text-slate-500 group-hover:text-blue-600": !isActive,
    });

    return (
        <Link href={href} className={menuClass}>
            <span className={iconClass}>{icon}</span>
            <span>{text}</span>
        </Link>
    );
}

Sidebar.Menu = Menu;
Sidebar.Item = Item;

export default ({ isOpened }) => {
    return (
        <Sidebar isOpened={isOpened}>
            <Sidebar.Menu>
                <Sidebar.Item
                    href="/admin/dashboard"
                    icon={<LiaHomeSolid size={20} />}
                    text="Dashboard"
                />
            </Sidebar.Menu>
        </Sidebar>
    );
}
