import Product from '../interfaces/Product';
import {URL_FOR_SEARCH_QUERY, URL_FOR_SEARCH_CATEGORY} from '../config/ApiURL';
const fetchProducts = async () => {
    // const response = await fetch('');
    // console.log(idToFetchFrom);
    // const ids = idToFetchFrom.map((id) => id.toString());
    // const queryString = ids.join(',');
    // const url = `ToFetchFrom);
    // const ids = idToFetchFrom.map((id) => id.toString());
    // const queryString = ids.join(',');
    // const url = `URL_ADDRESSjson.com/products?ids=${queryString}`;
    // const data = await response.json();
    // return data;
}
const fetchProductsFilterByQuery = async (category:string , query: string, nextId:number) => {
    let url = `${URL_FOR_SEARCH_QUERY}?category=${category}&nextId=${nextId}`;
    if(query !== "") url += `&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    
    return data;
}
const fetchProductsByCategory = async (nextId:number ,category:string) => {
    const response = await fetch(`${URL_FOR_SEARCH_CATEGORY}?category=${category}&nextId=${nextId}`);
    const data = await response.json();
    return data;
}
export { fetchProducts, fetchProductsFilterByQuery, fetchProductsByCategory };
