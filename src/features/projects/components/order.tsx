import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrderStore } from "@/lib/stores/order.store";
import { OrderType } from "@/lib/stores/order.store";

export const ProjectOrder = () => {
  const { order, orderBy } = useOrderStore();

  const handleOrder = (value: OrderType) => {
    orderBy(value);
  };

  return (
    <Select onValueChange={handleOrder} value={order}>
      <SelectTrigger className="w-74">
        <SelectValue placeholder="Ordenar lista" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="alphabetical">Ordem alfabética</SelectItem>
        <SelectSeparator />
        <SelectItem value="started_recently">
          Iniciados mais recentes
        </SelectItem>
        <SelectSeparator />
        <SelectItem value="next_to_end">Prazo mais próximo</SelectItem>
      </SelectContent>
    </Select>
  );
};
