import React from "react";

import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";
import { LiaBuildingSolid, LiaHardHatSolid, LiaSquare, LiaUserFriendsSolid } from "react-icons/lia";

const JenisPengawasanRutinIndex = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="font-medium text-xl text-slate-800">Pengawasan Rutin - Tahun 2024</h1>
                    {/* <h2 className="font-light text-xs text-slate-500">Pengawasan Penyelenggaraan Jasa Konstruksi</h2> */}
                </div>
            </div>
            <div className="grid lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
                {/* <Card className="hidden lg:inline-block h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-center gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaSquare size={20} />
                            </div>
                            <div>
                                <div className="line-clamp-1 text-slate-500">Total Pengawasan Rutin</div>
                                <div className="">
                                    <span className="font-medium text-base leading-tight">16 </span>
                                    <span className="font-light text-slate-500">Pengawasan</span>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card> */}
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaSquare size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Total Pengawasan Rutin</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaUserFriendsSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Usaha Jasa Konstruksi</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaHardHatSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Penyelenggaraan</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="h-fit">
                    <Card.Body className="p-4 text-xs text-slate-800">
                        <div className="flex items-start justify-between gap-x-2.5">
                            <div className="bg-blue-100 text-blue-600 rounded p-2">
                                <LiaBuildingSolid size={20} />
                            </div>
                            <div className="text-end">
                                <div className="font-light text-slate-500 text-[11px]">Pengawasan</div>
                                <div className="font-medium text-base leading-tight">16</div>
                                <div className="line-clamp-1 text-slate-500">Tertib Pemanfaatan Produk</div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

JenisPengawasanRutinIndex.layout = page => <Layout children={page} />;

export default JenisPengawasanRutinIndex;
