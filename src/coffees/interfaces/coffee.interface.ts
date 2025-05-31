export interface Coffee {
  id: string
  nome: string
  tipo: string
  quantidade?: number
  preco?: number
  descricao?: string
  tags?: string[]
  dataCriacao?: Date
  startDate?: Date
  endDate?: Date
}
