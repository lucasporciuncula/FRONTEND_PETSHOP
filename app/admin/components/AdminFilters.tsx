import useCategories from "@/app/hooks/useCategories";

export interface AdminFiltersProps {
  selectedAnimal: string;
  setSelectedAnimal: (animal: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function AdminFilters({
  selectedAnimal,
  setSelectedAnimal,
  selectedCategory,
  setSelectedCategory
}: AdminFiltersProps) {

  const { animals, categories } = useCategories()

  const ButtonStyle = (isActive: boolean) =>
    `px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 ${isActive
      ? "bg-[#4A3728] text-white shadow-md"
      : "bg-white text-[#4A3728] hover:bg-[#F5F2EC] border border-[#E8E3DD]"
    }`;

  return (
    <div className="w-full max-w-7xl flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DD]">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
        <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2">Animal:</span>
        {animals.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedAnimal(filter.id)}
            className={ButtonStyle(selectedAnimal === filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <span className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider mr-2">Categoria:</span>
        {categories.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedCategory(filter.id)}
            className={ButtonStyle(selectedCategory === filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}