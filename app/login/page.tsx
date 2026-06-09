"use client"

import { useState } from "react";


export default function Login() {

    const [error, setError] = useState("")

    return (
    <div 
      className="flex min-h-screen items-center justify-center bg-[#63783D] bg-cover bg-center bg-no-repeat px-4 font-sans"
      style={{ backgroundImage: "url('/images/banner1.png')" }}
    >
      
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-2xl border-2 border-[#63783D] transition-all">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-3xl font-black tracking-widest text-white">
            {/* <div className="bg-[#f26422] p-1.5 rounded-xl text-white flex items-center justify-center">
            </div> */}
            <span className="text-black font-bold uppercase">Bem</span><span className="text-[#63783D] font-bold uppercase">Vindo</span>
          </div>
          {/* <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Bem-vindo de volta!
          </h2> */}
          <p className="mt-2 text-sm text-gray-400">
            Insira suas credenciais para acessar sua conta
          </p>
        </div>
        
        <form className="space-y-6" >
          <div className="space-y-3">
            
            <div>
              <label className="block text-sm font-medium text-gray-400">
                E-mail
              </label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-lg bg-[#222222] border border-neutral-700 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
                placeholder="seu@email.com"
                
              />
            </div>

            
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Senha
                </label>
                <a href="/adm" className="text-xs text-[#63783D] hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                type="password"
                required
                className="mt-1 w-full rounded-lg bg-[#222222] border border-neutral-700 px-4 py-3 text-white placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-300 transition-all"
                placeholder="••••••••"
                
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-200 text-red-500 border border-red-400 rounded p-2 mb-2 text-center">
              {error}
            </div>
          )}

          
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#63783D] py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-blue-500 transition-colors uppercase tracking-wider"
            >
              Entrar
            </button>
          </div>
        </form>

        
        <p className="text-center text-sm text-gray-400 mt-4">
          Não tem uma conta?{' '}
          <a href="#" className="text-[#63783D] font-medium hover:underline">
            Cadastre-se
          </a>
        </p>

      </div>
    </div>
  );
}

