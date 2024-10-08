import React from "react";
import { useForm } from "@inertiajs/react";

import ModalError from "../../Components/ModalError";

import { LiaSpinnerSolid } from "react-icons/lia";

export default function LoginPage() {
    const { data, setData, post, processing } = useForm({
        username: '',
        password: '',
    });

    const [isModalErrorOpened, setIsModalErrorOpened] = React.useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post('/login', {
            onError: () => setIsModalErrorOpened(true),
        });
    }

    return (
        <>
            <section className="flex flex-col items-center justify-center bg-slate-50 px-6 py-8 space-y-5 mx-auto h-screen">
                <img src={`/storage/assets/logo-pemkab-hss.png`} alt="logo-pemkab-hss" className="h-32"/>
                <div className="text-center">
                    <h2 className="uppercase font-medium text-xs text-slate-500">Pemerintah Kabupaten Hulu Sungai Selatan</h2>
                    <h1 className="font-semibold text-2xl text-slate-700">Sistem Pengawasan Jasa Konstruksi</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full bg-white rounded-md shadow sm:max-w-sm p-5 md:p-8 space-y-5 md:space-y-8">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-xs font-medium text-slate-800">Nama Pengguna</label>
                        <input
                            type="text" name="username" id="username" required
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            value={data.username} onChange={e => setData('username', e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-xs font-medium text-slate-800">Kata Sandi</label>
                        <input
                            type="password" name="password" id="password" required
                            className="px-3 py-2 block w-full rounded-md border-slate-200 text-slate-600 placeholder:text-slate-500 focus:ring-blue-400 focus:border-blue-400 text-xs"
                            value={data.password} onChange={e => setData('password', e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={processing} className="flex justify-center items-center space-x-1 bg-blue-600 font-medium text-xs text-white rounded w-full py-2 px-2.5">
                        { processing && <LiaSpinnerSolid className="animate-spin" /> }
                        <span>Masuk</span>
                    </button>
                </form>
            </section>
            <ModalError
                isVisible={isModalErrorOpened}
                onClose={() => setIsModalErrorOpened(false)}
            >
                <div className="font-medium text-slate-700 mb-1">Uh Oh!</div>
                <div className="font-light text-xs text-slate-500 mb-2">
                    Silakan periksa kembali nama pengguna<br />dan kata sandi Anda.
                </div>
            </ModalError>
        </>
    );
}
