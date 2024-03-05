import React from "react";
import Layout from "../Components/Layout";

const Dashboard = () => {
    return (
        <>
            <h1 className="font-medium text-xl text-slate-800">Dashboard</h1>
        </>
    );
}

Dashboard.layout = page => <Layout children={page} />

export default Dashboard;
