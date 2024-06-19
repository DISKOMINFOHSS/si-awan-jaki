import React from "react";
import Badge from "../Components/Badge";

function getTertibStatusBadge (isTertib) {
    switch(isTertib) {
        case true:
            return <Badge bg="green">Tertib</Badge>
        case false:
            return <Badge bg="red">Belum Tertib</Badge>
        default:
            return <Badge bg="slate">-</Badge>
    }
}

export { getTertibStatusBadge };
