import React from "react";
import { Font, Text, View } from "@react-pdf/renderer";
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

function getSesuaiStatusBadge (isSesuai) {
    switch(isSesuai) {
        case true:
            return <Badge bg="green">Sesuai</Badge>
        case false:
            return <Badge bg="red">Tidak Sesuai</Badge>
    }
}

function getAktifStatusBadge (isAktif) {
    switch(isAktif) {
        case true:
            return <Badge bg="green" size="2xs">Aktif</Badge>
        case false:
            return <Badge bg="red" size="2xs">Tidak Aktif</Badge>
    }
}

function getProgressStatusBadge(status) {
    switch(status) {
        case "Dalam Proses":
            return <Badge bg="blue">Dalam Proses</Badge>;
        case "Selesai":
            return <Badge bg="green">Selesai</Badge>;
        case "Terlambat":
            return <Badge bg="red">Terlambat</Badge>;
    }
}

function getTertibStatusBadgePDF (isTertib) {
    switch(isTertib) {
        case true:
            return <Text style={tw("py-0.5 w-16 rounded-full bg-green-100 text-green-500 text-center text-[8px]")}>Tertib</Text>
        case false:
            return <Text style={tw("py-0.5 w-24 rounded-full bg-red-100 text-red-500 text-center text-[8px]")}>Belum Tertib</Text>
    }
}

function getTertibStatusBadgeRekapitulasiPDF(isTertib) {
    switch(isTertib) {
        case true:
            return (
                <View style={tw("w-full flex flex-row justify-center items-center gap-x-1")}>
                    <Text style={tw("bg-green-400 rounded-full w-1.5 h-1.5")}></Text>
                    <Text>Tertib</Text>
                </View>
            );
        case false:
            return (
                <View style={tw("flex flex-row flex-wrap justify-center items-center gap-x-1")}>
                    <Text style={tw("bg-red-400 rounded-full w-1.5 h-1.5")}></Text>
                    <Text>Belum</Text>
                    <Text>Tertib</Text>
                </View>
            );
    }
}

function getStatusBadgePDF (isTrue, label) {
    switch(isTrue) {
        case true:
            return <Text style={tw("py-0.5 w-16 rounded-full bg-green-100 text-green-500 text-center text-[8px]")}>{label}</Text>
        case false:
            return <Text style={tw("py-0.5 w-24 rounded-full bg-red-100 text-red-500 text-center text-[8px]")}>Tidak {label}</Text>
    }
}

export {
    getAktifStatusBadge,
    getSesuaiStatusBadge,
    getTertibStatusBadge,
    getProgressStatusBadge,
    getTertibStatusBadgePDF,
    getTertibStatusBadgeRekapitulasiPDF,
    getStatusBadgePDF,
};
