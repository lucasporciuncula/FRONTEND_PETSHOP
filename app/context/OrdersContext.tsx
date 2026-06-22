"use client";

export interface CartItem {
  id: string;
  label: string;
  price: number;
  image: string;
  quantity: number;
  categoria:string
  animal:string
}

export interface Order {
  id: string;
  userId: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  statusHistory: StatusHistory[];
  createdAt: string; 
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[]; // Adicionado estado de pedidos
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cleanCart:()=>void
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuthContext(); // Pega as informações do usuário logado do seu AuthContext
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]); // Estado local que guarda os pedidos temporariamente
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); 

  const cleanCart = () => {
    setCartItems([])
  }

  const addToCart = (product: any) => {
    if (!product.id) {
      console.error("Erro: O produto adicionado não possui um 'id' válido.", product);
      return;
    }

    setCartItems((prev) => {
      const exists = prev.find((item) => String(item.id) === String(product.id));

      if (exists) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders, // Expondo a lista de pedidos atualizada
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        cartTotal,
        cleanCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};