export interface Coffee {
  id: number;
  nome: string;
  tipo: string;
  preco: number;
  description: string;
  itensPedido?: string | null;
  tags?: { id: number; nome: string; cafeId: number }[];
}
