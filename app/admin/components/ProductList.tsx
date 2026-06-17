import { Products } from "@/app/types/productsType";
import Image from "next/image";

interface ProductListProps {
  products: Products[];
  selectedProduct: Products | null;
  onSelect: (product: Products) => void;
}

export default function ProductList({ products, selectedProduct, onSelect }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-4 flex-1 w-full lg:max-w-[60%] xl:max-w-[65%]">
        <p className="text-center text-[#8C7A6B] my-auto py-12 font-medium bg-white rounded-2xl border border-[#E8E3DD]">
          Nenhum produto encontrado neste filtro.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[75vh] flex-1 w-full lg:max-w-[60%] xl:max-w-[65%] pr-2 scrollbar-hide">
      {products.map((prod) => {
        const isSelected = selectedProduct?.id === prod?.id;

        return (
          <div
            key={prod?.id}
            onClick={() => onSelect(prod)}
            className={`p-5 rounded-2xl transition-all flex items-center justify-between cursor-pointer min-h-30 w-full ${isSelected
                ? "bg-white border-2 border-[#4A3728] shadow-md"
                : "bg-white border border-[#E8E3DD] hover:shadow-md hover:border-[#D0C5BA]"
              }`}
          >
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24 shrink-0 bg-[#F5F2EC] rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src={`/images/products/${prod.animal}/${prod.image}.jpg`}
                  alt={prod.label}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mb-1">
                  {prod?.animal} • {prod?.categoria}
                </span>
                <p className="font-extrabold text-[#4A3728] text-lg leading-tight">
                  {prod?.label}
                </p>
                <p className="font-medium text-[#8C7A6B] mt-1 line-clamp-2">
                  {prod?.description}
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right shrink-0 pl-4">
              <p className="font-bold text-[#4A3728] text-lg">
                R$ {prod?.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}