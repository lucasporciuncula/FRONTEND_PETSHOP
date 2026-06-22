"use client"

import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import useUser from "../hooks/useUser";

export default function Login() {

    const {name, setName, email, setEmail, password, setPassword} = useUserContext()
    const {handleCadastro} = useUser()
    const [error, setError] = useState("");
   


    return (
    <div 
      className="flex min-h-screen items-center justify-center bg-[#63783D] bg-cover bg-center bg-no-repeat px-4 font-sans"
      style={{ backgroundImage: "url('/images/banner5.png')" }}
    >
      
      <div className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-2xl border-2 border-[#664533] transition-all">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 text-3xl font-black tracking-widest text-white">
            <span className="text-black font-bold uppercase">Criar</span><span className="text-[#664533] font-bold uppercase">Conta</span>
          </div>
          <p className="mt-2 text-sm text-gray-400">
            Insira seus dados para criar sua conta.
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleCadastro}>
          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Nome
              </label>
              <input
                type="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                required
                className="mt-1 w-full rounded-lg bg-[#222222] border border-neutral-700 px-4 py-3 text-white placeholder-gray-500 shadow-sm"
                placeholder="Seu nome completo"
                
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required
                className="mt-1 w-full rounded-lg bg-[#222222] border border-neutral-700 px-4 py-3 text-white placeholder-gray-500 shadow-sm"
                placeholder="seu@email.com"
                
              />
            </div>

            
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Senha
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                className="mt-1 w-full rounded-lg bg-[#222222] border border-neutral-700 px-4 py-3 text-white placeholder-gray-500 shadow-sm"
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
              className="w-full rounded-lg bg-[#664533] py-3 text-sm font-bold text-white shadow-lg hover:bg-[#7c5540] active:scale-95 uppercase tracking-wider transition-all duration-100 hover:shadow-md "
            >
              Entrar
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          <a href="/login" className="text-[#664533] font-medium hover:underline">
            Voltar à página de login
          </a>
        </p>
        
      </div>
    </div>
  );
}

