import React from "react";
import classNames from "classnames";

function Card({ className, children }) {
    const cardClass = classNames(
        "border border-slate-200 rounded-md shadow shadow-slate-100",
        className,
    );

    return (
        <div className={cardClass}>
            {children}
        </div>
    );
}

function Header({ className, children }) {
    const headerClass = classNames(
        "p-4 border-b border-slate-200",
        className,
    )
    return (
        <div className={headerClass}>{children}</div>
    );
}

function Body({ className, children }) {
    const bodyClass = classNames(className);

    return (
        <div className={bodyClass}>{children}</div>
    );
}

function Footer({ className, children }) {
    const footerClass = classNames(
        "border-t border-slate-200",
        className,
    );

    return (
        <div className={footerClass}>{children}</div>
    );
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
