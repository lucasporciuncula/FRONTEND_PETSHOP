import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pedidosFake = [
      {
        id: '1001',
        cliente: 'João Silva',
        data: '23/06/2026',
        total: 150.00,
        status: 'Pago',
        itens: ['Ração Premier 15kg', 'Brinquedo Mordedor']
      },
      {
        id: '1002',
        cliente: 'Maria Souza',
        data: '22/06/2026',
        total: 85.90,
        status: 'Pendente',
        itens: ['Coleira antipulgas']
      }
    ];

    return NextResponse.json(pedidosFake);

  } catch (error) {
    console.error("[API PEDIDOS ERRO]", error);
    return NextResponse.json(
      { error: 'Erro ao buscar os pedidos.' }, 
      { status: 500 }
    );
  }
}