import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Products } from "@/app/types/productsType";
import { modoAtivado } from "../page";
import { useProducts } from "@/app/hooks/useProducts";

export const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: any) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[#8C7A6B] text-[10px] font-bold uppercase tracking-wider">
      {label}
    </label>
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

export default function ProductForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    label: "",
    description: "",
    price: 0,
    animal: "",
    categoria: "",
    image: "",
  });

  useEffect(() => {
    if (mode === "editar" && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        label: "",
        description: "",
        price: 0,
        animal: "",
        categoria: "",
        image: "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "criar") {
      onSubmit({ ...(formData as Products), id: Date.now() });
    } else {
      onSubmit({ ...(formData as Products), id: initialData?.id || 0 });
    }
    onCancel();
  };

  const { products } = useProducts();

  const [openedImages, setOpenImages] = useState(false);
  const [image, setImage] = useState("");

  return (
    <div className="w-full bg-white border border-[#E8E3DD] rounded-3xl p-8 flex flex-col gap-6 shadow-xl">
      <h4 className="text-sm font-extrabold uppercase text-[#4A3728] tracking-wider border-b border-[#E8E3DD] pb-4">
        {mode === "criar" ? " Criando Novo Produto" : " Editando Produto"}
      </h4>

      {openedImages ? (
        <div className=" justify-center items-center inset-0 w-screen h-screen">
          <div className="w-screen h-screen bg-white opacity-30">
            <div className="w-150 h-100 border border-gray-700 bg-white rounded-2xl">
              Selecione a Imagem
              {products.map((prod) => (
                <div className="flex flex-col flex-3 gap-2">
                  <Image
                    src={`/images/products/${prod?.animal}/${prod?.image}.jpg`}
                    alt={prod?.label||"imagem sem titulo"}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "editar" && initialData?.image && (
          <div
            className="relative w-full h-70 bg-[#F5F2EC] rounded-2xl mb-2 border border-[#E8E3DD] object-cover transition-transform duration-500 hover:scale-90  overflow-hidden group shadow-md cursor-pointer hover:overflow-visible"
            onClick={() => setOpenImages(!openedImages)}
          >
            <Image
              src={`/images/products/${formData.animal}/${formData.image}.jpg`}
              alt={formData.label}
              fill
              className="object-contain"
            />
            <Image
              src="/images/chocolat/adicionar.png"
              alt="Imagem de cima"
              width={355}
              height={355}
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50 pl-22"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Animal"
            name="animal"
            value={formData.animal}
            onChange={handleChange}
          />
          <InputField
            label="Categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Nome"
          name="label"
          value={formData.label}
          onChange={handleChange}
        />
        <InputField
          label="Imagem (nome do produto + .jpg)"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        <InputField
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <InputField
          label="Preço"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />
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
