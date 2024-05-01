import { useEffect, useState } from "react";

const useFetch = (URL, deps=[]) => {

  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  
  const fetchData = async () => {
    try {
      const resp = await fetch(URL);
      const respData = await resp.json(); 

      if(!resp.ok || !respData) {
        throw new Error(respData?.message || resp.statusText || 'an error occurred.');
      }
      
      setData(respData);
    } 
    catch(err) {
      setError(err.message); 
    } 
    finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, isFetching, error };

}

export default useFetch;