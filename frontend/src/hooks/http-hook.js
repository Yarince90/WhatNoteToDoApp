import { useCallback } from 'react';

export const useHttpClient = () => {
  
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            });

            const resData = await response.json();

            return resData;

        } catch (err){console.log(err)}

    },[]);

    return { sendRequest };
};
