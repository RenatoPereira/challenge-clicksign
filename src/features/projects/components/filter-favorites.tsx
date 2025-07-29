import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/lib/stores/filter.store";

export const FilterFavorites = () => {
  const { filter, filterBy } = useFilterStore();

  const handleFilter = (checked: boolean) => {
    filterBy(checked ? "favorites" : null);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="airplane-mode"
        checked={filter === "favorites"}
        onCheckedChange={handleFilter}
      />
      <Label
        htmlFor="airplane-mode"
        className="text-[#1E1E1E] text-base font-normal"
      >
        Apenas Favoritos
      </Label>
    </div>
  );
};
