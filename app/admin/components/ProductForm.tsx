import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Products } from "@/app/types/productsType";
import { modoAtivado } from "../page";
import { useProducts } from "@/app/hooks/useProducts";
import ImageSelectionModal from "./ImageSelectionModal";

export const InputField = ({ label, name, value, onChange, type = "text" }: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#8C7A6B] text-[10px] font-bold uppercase tracking-wider">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="text-sm bg-[#F5F2EC] text-[#4A3728] p-3 rounded-xl border border-[#acaaa9] focus:border-[#4A3728] focus:outline-none transition-colors"
    />
  </div>
);

interface ProductFormProps {
  mode: modoAtivado;
  initialData: Products | null;
  onSubmit: (data: Products) => void;
  onCancel: () => void;
}

type ProductFormData = Omit<Products, "id"> & { id?: number };

export default function ProductForm({ mode, initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    label: "",
    description: "",
    price: 0,
    animal: "",
    categoria: "",
    image: "",
  });

  const { products } = useProducts();
  const [openedImages, setOpenImages] = useState(false);

  useEffect(() => {
    if (mode === "editar" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({ label: "", description: "", price: 0, animal: "", categoria: "", image: "" });
    }
  }, [mode, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...(formData as Products), id: mode === "criar" ? Date.now() : initialData?.id || 0 });
    onCancel();
  };

  // Função que o Modal vai chamar quando o usuário confirmar a imagem
  const handleSelectImage = (imageName: string) => {
    setFormData((prev) => ({ ...prev, image: imageName }));
    setOpenImages(false);
  };

  return (
    <div className="w-full bg-white border border-[#E8E3DD] rounded-3xl p-8 flex flex-col gap-6 shadow-xl">
      <h4 className="text-sm font-extrabold uppercase text-[#4A3728] tracking-wider border-b border-[#E8E3DD] pb-4">
        {mode === "criar" ? " Criando Novo Produto" : " Editando Produto"}
      </h4>

      {/* COMPONENTE DO MODAL ISOLADO */}
      <ImageSelectionModal
        isOpen={openedImages}
        onClose={() => setOpenImages(false)}
        onConfirm={handleSelectImage}
        products={products}
        currentImage={formData.image}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Container da Imagem Principal (Clicável) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[#8C7A6B] text-[10px] font-bold uppercase tracking-wider">
            Imagem do Produto (Clique para alterar)
          </label>
          <div
            className="relative w-full h-70 bg-[#F5F2EC] rounded-2xl mb-2 border-2 border-dashed border-[#acaaa9] hover:border-[#4A3728] flex items-center justify-center transition-all duration-300 overflow-hidden group shadow-sm cursor-pointer"
            onClick={() => setOpenImages(true)}
          >
            {formData.image && formData.animal ? (
              <>
                <Image
                  src={`/images/products/${formData.animal}/${formData.image}.jpg`}
                  alt={formData.label || "Imagem do Produto"}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-95"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white font-bold gap-2">
                  Trocar Imagem
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#8C7A6B] gap-2">
                <span className="text-sm font-bold">Clique para selecionar uma imagem</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Animal" name="animal" value={formData.animal} onChange={handleChange} />
          <InputField label="Categoria" name="categoria" value={formData.categoria} onChange={handleChange} />
        </div>

        <InputField label="Nome" name="label" value={formData.label} onChange={handleChange} />
        <InputField label="Imagem (nome do arquivo)" name="image" value={formData.image} onChange={handleChange} />
        <InputField label="Descrição" name="description" value={formData.description} onChange={handleChange} />
        <InputField label="Preço" name="price" type="number" value={formData.price} onChange={handleChange} />
        
        <div className="flex gap-3 mt-4 pt-4 border-t border-[#E8E3DD]">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#F5F2EC] text-[#4A3728] hover:bg-[#e8e2d5] transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#4A3728] text-white hover:bg-[#38291e] shadow-md transition-all"
          >
            {mode === "criar" ? "Salvar Produto" : "Atualizar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}