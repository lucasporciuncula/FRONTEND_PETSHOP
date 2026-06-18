import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageItem {
  animal: string;
  filename: string;
}

interface ImageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (imageName: string, animalName: string) => void; // Atualizado para retornar o animal também se precisar
  currentImage: string;
}

export default function ImageSelectionModal({
  isOpen,
  onClose,
  onConfirm,
  currentImage,
}: ImageSelectionModalProps) {
  const [folderImages, setFolderImages] = useState<ImageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedImage, setTempSelectedImage] = useState(currentImage);
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [loading, setLoading] = useState(false);

  // Busca as imagens da pasta física quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch("/api/images")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setFolderImages(data);
          }
        })
        .catch((err) => console.error("Erro ao carregar imagens da pasta:", err))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filtra as imagens pelo campo de busca
  const filteredImages = folderImages.filter((img) =>
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.animal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Topo com Pesquisa */}
        <div className="p-6 border-b border-[#E8E3DD] flex flex-col gap-4 bg-[#F5F2EC]">
          <h3 className="text-lg font-bold text-[#4A3728]">
            Imagens disponíveis 
          </h3>
          <input
            type="text"
            placeholder="Pesquisar por nome da imagem ou animal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-white text-[#4A3728] p-3 rounded-xl border border-[#acaaa9] focus:border-[#4A3728] focus:outline-none transition-colors shadow-sm"
          />
        </div>

        {/* Grid contendo o .map modificado */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-40 gap-x-4 flex-1 bg-white">
          {loading ? (
            <div className="col-span-full text-center py-8 text-[#8C7A6B]">Lendo arquivos de imagem...</div>
          ) : (
            filteredImages.map((img, index) => (
              <div
                key={index}
                onClick={() => {
                  setTempSelectedImage(img.filename);
                  setSelectedAnimal(img.animal);
                }}
                className={`relative aspect-square cursor-pointer rounded-2xl border-2 overflow-hidden transition-all hover:scale-105 ${
                  tempSelectedImage === img.filename
                    ? "border-[#4A3728] shadow-lg ring-4 ring-[#4A3728]/20"
                    : "border-[#E8E3DD] shadow-sm hover:border-[#4A3728]/50"
                }`}
              >
                <Image
                  src={`/images/products/${img.animal}/${img.filename}.jpg`}
                  alt={img.filename}
                  fill
                  className="object-cover"
                />
                
                {/* Nome do animal no cantinho para ajudar o Admin a se situar */}
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-bold">
                  {img.animal}
                </span>

                {tempSelectedImage === img.filename && (
                  <div className="absolute inset-0 bg-[#4A3728]/10 flex items-center justify-center">
                    <div className="bg-[#4A3728] text-white p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/center" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="col-span-full text-center text-[#8C7A6B] py-8">
              Nenhum arquivo físico encontrado para {searchTerm}
            </div>
          )}
        </div>

        {/* Rodapé com Ações */}
        <div className="p-6 border-t border-[#E8E3DD] flex gap-3 bg-[#F5F2EC]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-white border border-[#acaaa9] text-[#4A3728] hover:bg-[#E8E3DD] transition-all"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(tempSelectedImage, selectedAnimal)}
            disabled={!tempSelectedImage}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#4A3728] text-white hover:bg-[#38291e] shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Imagem
          </button>
        </div>
      </div>
    </div>
  );
}