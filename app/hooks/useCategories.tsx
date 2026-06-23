"use client";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/config";
export interface CategoryOrAnimal {
  id: string;
  label: string;
}

export default function useCategories() {
     // Dentro do seu hook:
    const [categories, setCategories] = useState<CategoryOrAnimal[]>([]);
    const [animals, setAnimals] = useState<CategoryOrAnimal[]>([]);

    useEffect(() => {
        const cat = async () => {
            try {
                const res = await fetch(API_BASE_URL + "/categories", {
                    method: "GET"
                });

                if (!res.ok) {
                    throw new Error("erro ao buscar produtos");
                }

                const data = await res.json();
                setCategories(data)
                console.log(data)

            } catch (err) {
                console.log("erro: " + err)
            }
        }
        const ani = async () => {
            try {
                const res = await fetch(API_BASE_URL + "/animals", {
                    method: "GET"
                });

                if (!res.ok) {
                    throw new Error("erro ao buscar produtos");
                }

                const data = await res.json();
                setAnimals(data)
                console.log(data)

            } catch (err) {
                console.log("erro: " + err)
            }
        }
        cat();
        ani();
    }, []);

    return {
        animals,
        categories
    };
}