import { tesloApi } from "@/api/TesloApi"
import { getProductImage } from "./get-product-image"

export const getProductById = async(productId:string)=>{

    try {
        const {data}= await tesloApi.get(`/products/${productId}`)
        console.log(data);
        return{
            ... data,
            images:data.images.map(getProductImage),
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id ${productId}`);

        
    }

}