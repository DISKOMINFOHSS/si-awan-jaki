async function getDaftarPaketPekerjaan(tahun = '2024') {
    const response = await fetch(`https://emonev.hulusungaiselatankab.go.id/api/public/mr/1.3.0.0.0.0.01.0000/${tahun}`);
    return response.json();
}

async function getPaketPekerjaan(id) {
    const response = await fetch(`https://emonev.hulusungaiselatankab.go.id/api/public/mr/perencanaan/detail/paket/${id}`);
    return response.json();
}

export {
    getDaftarPaketPekerjaan,
    getPaketPekerjaan,
}
