import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { BACKEND_URL } from "../../config"
export default function useGetSingleProduct(productid: Number) {
    return useQuery({
        queryKey: ["getsingleproduct", productid],
        queryFn: async () => {
            const response = await axios.get(`${BACKEND_URL}/getsingleproduct/${productid}`);
            return response.data;
        }
    })

}