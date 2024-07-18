import React from "react";
import { Font, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import Badge from "../Components/Badge";

import { inter } from "./fonts";

Font.registerHyphenationCallback(word => [word]);
Font.register({ family: 'Inter', fonts: inter });

const tw = createTw({
    theme: {
        fontFamily: {
            'sans': ['Inter'],
        },
    },
});

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

function getTertibStatusBadgePDF (isTertib) {
    switch(isTertib) {
        case true:
            return <Text style={tw("py-1 w-16 rounded-full bg-green-100 text-green-500 text-center text-[9px]")}>Tertib</Text>
        case false:
            return <Text style={tw("py-1 w-24 rounded-full bg-red-100 text-red-500 text-center text-[9px]")}>Belum Tertib</Text>
    }
}

function getStatusBadgePDF (isTrue, label) {
    switch(isTrue) {
        case true:
            return <Text style={tw("py-1 w-16 rounded-full bg-green-100 text-green-500 text-center text-[9px]")}>{label}</Text>
        case false:
            return <Text style={tw("py-1 w-24 rounded-full bg-red-100 text-red-500 text-center text-[9px]")}>Tidak {label}</Text>
    }
}

export {
    getTertibStatusBadge,
    getTertibStatusBadgePDF,
    getStatusBadgePDF,
};
