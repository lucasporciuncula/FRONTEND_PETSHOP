import Image from "next/image";
import Link from "next/link";

export default function Carrinho() {

    const {}


    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen bg-[#FAFAF8] p-8 font-sans">
            <div className="w-full mb-8 flex justify-between items-end text-2xl text-black flex-col flex-1">
                <div className="w-full  max-w-7xl pr-4 pl-0 py-4 sm:py-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <div className="flex justify-start ml-10">
                        <Link href="/">
                            <Image
                                src="/images/logo_petshop.png"
                                alt="PetShop Logo"
                                width={35}
                                height={50}
                                priority
                                className="h-auto w-auto object-contain"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <form className="relative flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus-within:border-[#664533] transition-all">
                            <input
                                type="text"
                                placeholder="Pesquise por mais de 10.000 produtos..."
                                className="w-full bg-transparent text-sm text-gray-700 outline-none pr-8"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="absolute right-3 text-gray-400">
                                <path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z" />
                            </svg>
                        </form>
                    </div>

                    <div className="hidden sm:flex justify-end gap-6 text-sm text-right mr-10">
                        <div>
                            <span className="block text-xs uppercase tracking-wider text-[#664533] font-medium">Telefone</span>
                            <span className="font-semibold text-gray-900">+980-34984089</span>
                        </div>
                        <div>
                            <span className="block text-xs uppercase tracking-wider text-[#664533] font-medium">Email</span>
                            <span className="font-semibold text-gray-900">petshop@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="w-screen  mx-auto px-4 items-center bg-[#664533]">
                    <div className="space-y-6 text-center md:text-left order-1 md:order-2">
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-normal text-white leading-tight">
                            Carrinho
                        </h1>
                        <div className="pt-4">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 border-2 border-white px-6 py-3.5 rounded text-sm uppercase font-semibold text-white hover:bg-white hover:text-white transition-all group"
                            >
                                Limpar Carrinho
                            </Link>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}