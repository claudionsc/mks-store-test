import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    const baseUrl = "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/"

    const getAllProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}products?page=1&rows=5&sortBy=id&orderBy=DESC`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Erro ao obter produtos');
            }
        }

    });

    return { getAllProducts }

}