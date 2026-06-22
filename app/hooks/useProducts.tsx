import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/config";
import { useAuthContext } from "../context/AuthContext";
import { useProductContext } from "../context/ProductsContext";
import { Products } from "../types/productsType";

export function useProducts() {
  const { token } = useAuthContext();
  const {products, setProducts } =
    useProductContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) return;
    const getAllProducts = async () => {
      //pega as categorias do server aberto
      try {
        setLoading(true);
        const res = await fetch(API_BASE_URL + "/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //aqui precisa mandar o token pq senao ele n da 🤷‍♂️
          },
        });

        if (!res.ok) {
          throw new Error("erro ao buscar produtos");
        }

        const data = await res.json();
        setProducts(data);
        console.log(data)
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "erro desconhecido");
        console.log("erro: " + err);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, [token, setProducts]);

  const createProduct = async (product:Products) => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },body: JSON.stringify( product ),
      });

      if (!res.ok) {
        throw new Error("erro ao create produtos");
      }

      setProducts((prevProducts) => [...prevProducts, product])
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "erro desconhecido");
      console.log("erro: " + err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product: Products) => {
  try {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/products/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product) 
    });

    if (!res.ok) {
      console.error("Status do erro:", res.status); 
      throw new Error(`erro ao update produtos: ${res.statusText}`);
    }

    setProducts((prevProducts) => 
      prevProducts.map((p) => (p?.id === product.id ? product : p))
    );
    
    setError(null);
  } catch (err) {
    setError(err instanceof Error ? err.message : "erro desconhecido");
    console.log("erro: " + err);
  } finally {
    setLoading(false);
  }
};

  const deleteProduct = async (id:number) => {
    console.log("O que está chegando na função delete:", id);
    const usedId = id.toString()
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL + "/products/"+usedId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res.ok) {
        throw new Error("erro ao delete produtos");
      }

      setProducts((prevProducts) => prevProducts.filter((p) => p?.id !== id))
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "erro desconhecido");
      console.log("erro: " + err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
