import Product from '../interfaces/Product';
import {URL_FOR_SEARCH_QUERY, URL_FOR_SEARCH_CATEGORY, URL_FOR_ALL_QUERY} from '../config/ApiURL';
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
const fetchProductsFilterByQuery = async (category:string , query: string, lastSeenId: Map<string, number>, userQueryList: {[key:string]:number}) => {
    if(category === "All" && query === "" && !checkIfAllCategoriesAreAtSameOffset(lastSeenId)){
        console.log("fetching all products");
        const response = await fetch(`${URL_FOR_ALL_QUERY}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lastSeenId: Object.fromEntries(lastSeenId),
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    let url = `${URL_FOR_SEARCH_QUERY}?category=${category}`;
    if(query !== "") {
        url += `&query=${encodeURIComponent(query)}`;
    }
    if(userQueryList[query] !== undefined){
        url += `&nextId=${userQueryList[query]}`
    }else{
        url += `&nextId=${lastSeenId.get(category)}`
    }
    const response = await fetch(url);
    const data = await response.json();
    console.log(url);
    
    console.log(data);
    return data;
}
const fetchProductsByCategory = async (nextId:number ,category:string) => {
    const response = await fetch(`${URL_FOR_SEARCH_CATEGORY}?category=${category}&nextId=${nextId}`);
    const data = await response.json();
    return data;
}
function checkIfAllCategoriesAreAtSameOffset(lastSeenId:Map<string, number>){
    const firstOffset = lastSeenId.get("All");
    let flag = true;
    lastSeenId.forEach((value, key) => {
        if(key !== "All" && value !== firstOffset){
            flag = false;
        };
    });
    return flag;
}
export { fetchProducts, fetchProductsFilterByQuery, fetchProductsByCategory };
