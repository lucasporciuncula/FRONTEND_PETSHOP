import { Products } from "@/app/types/productsType";
import Image from "next/image";

export default function ProductDetails({ product,  onDelete,}: {  product: Products | null,  onDelete: (id: number) => void;}) {
  if (!product) {
    return (
      <div className="w-full h-full min-h-75 bg-white border border-[#E8E3DD] rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-sm">
        <p className="text-[#8C7A6B] text-sm font-medium">
          Selecione um produto na lista ao lado para visualizar as informações
          completas ou edita-lo.
        </p>
      </div>
    );
  }

  const ExibirInfo = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex flex-col gap-1 border-b border-[#E8E3DD] pb-3">
      <span className="text-[#8C7A6B] text-[10px] font-bold uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-medium text-[#4A3728]">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-white border border-[#E8E3DD] rounded-3xl p-8 flex flex-col gap-6 shadow-xl">
      <h4 className="text-sm font-extrabold uppercase text-[#4A3728] tracking-wider flex justify-between items-center">
        Informações do Produto
      </h4>

      <div className="relative w-full aspect-square bg-[#F5F2EC] rounded-2xl overflow-hidden border border-[#E8E3DD]">
        <Image
          src={`/images/products/${product.animal}/${product.image}.jpg`}
          alt={product.label}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <ExibirInfo label="Animal" value={product.animal} />
          <ExibirInfo label="Categoria" value={product.categoria} />
        </div>

        <ExibirInfo label="Nome" value={product.label} />
        <ExibirInfo label="Descrição" value={product.description} />
        <ExibirInfo
          label="Preço"
          value={`R$ ${product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
        />
      </div>

      <button
        onClick={() => {
          if (confirm("Tem certeza que deseja deletar este produto?")) {
            onDelete(product.id);
          }
        }}
        className="mt-2 w-full py-3 rounded-xl text-sm font-bold bg-[#FFF0F0] text-[#D32F2F] hover:bg-[#FFE5E5] transition-all"
      >
        Deletar Produto
      </button>
    </div>
  );
}
