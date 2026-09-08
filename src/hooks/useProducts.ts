import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export default function useProduct(brand:any){
    return useQuery({
        queryKey:["productsofabrand",brand],
        queryFn:async ()=>{
            const response=await axios.get(`${BACKEND_URL}/getproductsbybrand/${brand}`);
            return response.data;
        }
    })
}