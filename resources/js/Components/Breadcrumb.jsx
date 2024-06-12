import React from "react";
import { Link } from "@inertiajs/react";

import { LiaAngleRightSolid } from "react-icons/lia";

function Breadcrumb({ children }) {
    return (
        <div className="flex flex-row items-center gap-x-1 text-xs text-slate-600 mb-1">
            {children}
        </div>
    );
}

function Item({ href, disabled, active, children }) {
    return !disabled && !active ?
    (
        <>
            <Link href={href} className="truncate max-w-[30ch] hover:text-blue-600 hover:underline">{children}</Link>
            <LiaAngleRightSolid size={14} className="text-slate-500"/>
        </>
    ) : <span className="truncate max-w-[40ch] font-medium">{children}</span> ;
}

Breadcrumb.Item = Item;

export default Breadcrumb;
