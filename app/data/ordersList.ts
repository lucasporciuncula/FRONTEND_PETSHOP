
export const ORDER_STATUSES = {
  pending: { label: "Recebidos", icon: "📋" },
  production: { label: "Preparando", icon: "📦" },
  sent: { label: "Enviados", icon: "🛵" },
  delivered: { label: "Entregues", icon: "✅" },
};

export const ordersList = [
  {
    id: "PET-8742",
    status: "pending",
    customerName: "Carlos Alberto",
    customerPhone: "(11) 99999-1111",
    address: "Rua das Flores, 123 - Apt 42 - São Paulo/SP",
    notes: "Por favor, deixar na portaria se eu não atender.",
    subtotal: 189.80,
    deliveryFee: 15.00,
    total: 204.80,
    statusHistory: [{ time: "14:25" }],
    items: [
      { name: "Ração Premier Ambientes Internos Cães Adultos 15kg", quantity: 1, price: 159.90 },
      { name: "Brinquedo Mordedor Osso de Borracha", quantity: 2, price: 14.95 }
    ]
  },
  {
    id: "PET-8741",
    status: "production",
    customerName: "Mariana Souza",
    customerPhone: "(11) 98888-2222",
    address: "Av. Paulista, 1000 - Bela Vista - São Paulo/SP",
    notes: "O gato é bem exigente com o sabor da ração saches rsrs",
    subtotal: 74.50,
    deliveryFee: 10.00,
    total: 84.50,
    statusHistory: [{ time: "13:12" }],
    items: [
      { name: "Arranhador para Gatos Torre Standard", quantity: 1, price: 49.90 },
      { name: "Sachê GranPlus Gatos Castrados Salmão", quantity: 10, price: 2.46 }
    ]
  },
  {
    id: "PET-8740",
    status: "sent",
    customerName: "Roberto Silveira",
    customerPhone: "(11) 97777-3333",
    address: "Alameda Lorena, 455 - Jardins - São Paulo/SP",
    notes: "",
    subtotal: 219.00,
    deliveryFee: 0.00, 
    total: 219.00,
    statusHistory: [{ time: "11:05" }],
    items: [
      { name: "Cama Pet Nuvem Pálida GG", quantity: 1, price: 189.00 },
      { name: "Shampoo Neutralizador de Odores Pet Society 500ml", quantity: 1, price: 30.00 }
    ]
  },
  {
    id: "PET-8739",
    status: "delivered",
    customerName: "Beatriz Reis",
    customerPhone: "(11) 96666-4444",
    address: "Rua Augusta, 2200 - Consolação - São Paulo/SP",
    notes: "Entregar antes das 18h.",
    subtotal: 45.80,
    deliveryFee: 8.50,
    total: 54.30,
    statusHistory: [{ time: "09:40" }],
    items: [
      { name: "Coleira Antipulgas e Carrapatos Seresto", quantity: 1, price: 45.80 }
    ]
  }
];