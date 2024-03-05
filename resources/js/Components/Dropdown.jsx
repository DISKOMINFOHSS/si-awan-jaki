import React from "react";
import classNames from "classnames";

const Dropdown = React.forwardRef(function Dropdown({ children }, ref) {
    return (
        <div className="relative" ref={ref}>
            {children}
        </div>
    );
});

function Toggle({ children, ...props }) {
    return (
        <button {...props}>{children}</button>
    );
}

function Menu({ isVisible, className, children }) {
    const menuClass = classNames(
        "absolute z-20 bg-white mt-1 rounded shadow-md", className,
        {"hidden": !isVisible}
    );

    return (
        <div className={menuClass}>{children}</div>
    );
}

Dropdown.Toggle = Toggle;
Dropdown.Menu = Menu;

export default Dropdown;
