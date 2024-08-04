import React from "react";
import classNames from "classnames";

function Badge({ bg, size, children }) {
    const badgeClass = classNames(
        "h-fit w-fit rounded-full whitespace-nowrap",
        {
            "bg-green-100 text-green-500": bg === "green",
            "bg-yellow-100 text-yellow-500": bg === "yellow",
            "bg-slate-100 text-slate-500": bg === "slate",
            "bg-red-100 text-red-500": bg === "red",
        },
        {
            "px-3 text-[9px]": size === "2xs",
            "py-0.5 px-3 text-[10px]": size === "xs",
            "py-1 px-4 text-[11px]": !size,
        }
    );

    return (
        <span className={badgeClass}>{children}</span>
    );
}

export default Badge;
