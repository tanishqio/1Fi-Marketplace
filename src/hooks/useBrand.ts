import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { BACKEND_URL } from "../../config"
function useBrands(categoryname:any) {
return useQuery({
    queryKey:["topbrands",categoryname],
    queryFn:async ()=>{
         const response =await axios.get(`${BACKEND_URL}/topbrands/${categoryname}`);
         return response.data;
    }
})
}
export default useBrands