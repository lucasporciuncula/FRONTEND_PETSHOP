import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { AdminMode } from "../page";
import { Products } from "@/app/types/productsType";

interface ProductFormProps {
  mode: AdminMode;
  initialData: Products | null;
  onSubmit: (data: Products) => void;
  onCancel: () => void;
}

// Tipo temporário para o state do formulário (antes de salvar)
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

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({ label: "", description: "", price: 0, animal: "", categoria: "", image: "" });
    }
  }, [mode, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "create") {
      onSubmit({ ...(formData as Products), id: Date.now() }); 
    } else {
      onSubmit({ ...(formData as Products), id: initialData?.id || 0 }); 
    }
    onCancel();
  };

  // Componente interno para inputs (tipado inline)
  const InputField = ({ label, name, type = "text" }: { label: string; name: keyof ProductFormData; type?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#8C7A6B] text-[10px] font-bold uppercase tracking-wider">{label}</label>
      <input
        type={type}
        value={formData[name] as string | number}
        onChange={handleChange}
        required
        className="text-sm bg-[#F5F2EC] text-[#4A3728] p-3 rounded-xl border border-transparent focus:border-[#4A3728] focus:outline-none transition-colors"
      />
    </div>
  );

  return (
    <div className="w-full bg-white border border-[#E8E3DD] rounded-3xl p-8 flex flex-col gap-6 shadow-xl">
      <h4 className="text-sm font-extrabold uppercase text-[#4A3728] tracking-wider border-b border-[#E8E3DD] pb-4">
        {mode === "create" ? "✨ Criando Novo Produto" : "✏️ Editando Produto"}
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {mode === "edit" && initialData?.image && (
          <div className="relative w-full h-40 bg-[#F5F2EC] rounded-2xl overflow-hidden mb-2 border border-[#E8E3DD]">
             <Image
                src={`/images/products/${formData.animal}/${formData.image}.jpg`}
                alt="Preview" fill className="object-contain p-2"
             />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <InputField label="Animal (ex: dog)" name="animal" />
          <InputField label="Categoria" name="categoria" />
        </div>
        
        <InputField label="Nome do Produto" name="label" />
        <InputField label="Nome da Imagem (sem .jpg)" name="image" />
        <InputField label="Descrição" name="description" />
        <InputField label="Preço (R$)" name="price" type="number" />

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
            {mode === "create" ? "Salvar Produto" : "Atualizar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}