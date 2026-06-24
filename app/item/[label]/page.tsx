"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useProductContext } from "@/app/context/ProductsContext";
import { useProducts } from "@/app/hooks/useProducts";
import { useCart } from "@/app/context/OrdersContext";

export default function ItemPage() {
  const router = useRouter(); // Inicializa o roteador

  // const [quantity, setQuantity] = useState(1);
  const params = useParams();
  
  const buttonClickCart = () => {
    router.push('/carrinho');
  };

  const { product, setProduct } = useProductContext();
  const { products } = useProducts();

  // 1. CORREÇÃO DO USEEFFECT: Adicionando a busca e salvamento do produto
  useEffect(() => {
    if (!product && params?.label) {
      const urlLabel = decodeURIComponent(params.label as string);
      const foundProduct = products.find((p) => p?.label === urlLabel);
      
      // Essa é a parte que faltava no seu código!
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [params, product, products, setProduct]);

  const {addToCart, cartItems} = useCart()

  // Tela de carregamento (precisa vir antes de tentar calcular os produtos relacionados)
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium">Carregando produto...</p>
      </div>
    );
  }

  // 2. CORREÇÃO DO LOOP INFINITO: Usando apenas uma constante (Derived State)
  // Filtramos os produtos da mesma categoria, excluindo o produto que já estamos vendo.
  const relatedProducts = products.filter(
    (p) => p?.categoria === product?.categoria && p?.id !== product?.id &&p.animal===product.animal
  );
  // Tela de carregamento enquanto busca o produto pelo F5
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <p className="text-gray-500 font-medium">Carregando produto...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 bg-white">

      {/* Navigation */}
      <nav className="w-full bg-gray-100 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link className="text-xl font-bold tracking-tight text-gray-900" href="/Produtos">
              Voltar
            </Link>
          </div>

          {/* Carrinho */}
          <div className="flex items-center">
            <button className="border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm" type="button" onClick={buttonClickCart}>
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartItems.length}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Product section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Imagem Otimizada do Next.js */}
            <div className="w-full relative aspect-600/700 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={`/images/products/${product?.animal}/${product?.image}.jpg`}
                alt={product?.image || "nome da imagem"}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Informações do Produto */}
            <div className="space-y-4">
              <div className="text-xs text-gray-500 tracking-wider">{product.animal}</div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">{product.label}</h1>

              <div className="text-xl font-medium text-gray-800 space-x-2">
                <span className="text-gray-900 font-bold">R${product?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>

              {/* Controles de Compra */}
              <div className="flex items-center gap-4 pt-4">
                {/* <input
                  className="w-16 border border-gray-300 rounded-lg px-2 py-2.5 text-center focus:outline-none focus:border-gray-900 text-sm font-semibold"
                  id="inputQuantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => { if (quantity > 0 && !(e.target.valueAsNumber < 1)) { setQuantity(Number(e.target.value)) } }}
                /> */}
                <button className="border border-gray-900 bg-white hover:bg-gray-900 text-gray-900 hover:text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all text-sm shrink-0" type="button" onClick={()=>addToCart(product.id)}>
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related items section */}
      <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Produtos Relacionados</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">

            {relatedProducts.map((rel) => (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full" key={rel?.id} >
                <div className="w-full relative h-48">
                  <Image src={`/images/products/${rel?.animal}/${rel?.image}.jpg`} alt="..." fill className="object-cover" onClick={() => {
                // 1. Salva no contexto
                setProduct(rel); 
                // 2. Navega para a página do item
                router.push(`/item/${rel?.label}`);
              }}/>
                </div>
                <div className="p-4 grow flex flex-col justify-between text-center">
                  <div className="space-y-1 my-2">
                    <h5 className="font-bold text-gray-900">{rel?.label}</h5>
                    <p className="text-sm text-gray-600">{rel?.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="pt-4 items-center justify-center">
                    <button className="border border-gray-900 hover:bg-gray-900 text-gray-900 hover:text-white text-xs font-bold py-2 rounded-lg transition-colors flex gap-2 p-12 items-center" onClick={()=>addToCart(rel?.id??0)}>
                      <ShoppingCart className="w-4 h-4" />Adicioinar ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <p className="m-0">Copyright &copy; Your Website 2026</p>
        </div>
      </footer>
    </div>
  );
}