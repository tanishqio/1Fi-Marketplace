import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_URL } from "../../config";
function useFeaturedProducts(){
    return useQuery({
        queryKey:["featuredproducts"],
        queryFn:async ()=>{
            const response=await axios.get(`${BACKEND_URL}/featuredproducts`);
            return response.data;
        }
    })
}
export default useFeaturedProducts