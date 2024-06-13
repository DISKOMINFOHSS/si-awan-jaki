import React from "react";
import classNames from "classnames";

function TabList({ children }) {
    return (
        <div className="flex items-center gap-x-5 border-b border-slate-200 text-sm text-slate-500">
            {children}
        </div>
    );
}

function TabItem({ badge, isActive, onClick, children }) {
    const tabClass = classNames("flex items-center gap-x-1 px-1 py-2.5", {
        "border-b-2 border-blue-600 text-blue-600": isActive
    });

    return (
        <button className={tabClass} onClick={onClick}>
            { badge && <span className="rounded-full text-[10px] px-2 bg-slate-50">{badge}</span> }
            <span>{children}</span>
        </button>
    );
}

function TabPanel({ isActive, children }) {
    if (!isActive) return null;
    return (
        <div className="my-5 space-y-5">{children}</div>
    );
}

function Tab({ children }) {
    return (
        <>{children}</>
    );
}

function Tabs({ tabList, children }) {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    return (
        <>
            <TabList>
                {
                    tabList.map(({ badge, label }, i) => (
                        <TabItem
                            key={i}
                            isActive={activeTabIndex === i}
                            onClick={() => setActiveTabIndex(i)}
                            badge={badge}
                        >
                            {label}
                        </TabItem>
                    ))
                }
            </TabList>
            {
                React.Children.map(children, (child, index) => (
                    <TabPanel key={index} isActive={activeTabIndex === index}>{child}</TabPanel>
                ))
            }
        </>
    );
}

Tabs.Tab = Tab;

export default Tabs;
