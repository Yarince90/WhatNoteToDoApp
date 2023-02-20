import { useCallback, useRef } from 'react';

export const useHttpClient = () => {

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback (
        async (url, method = 'GET', body = null, headers = {}) => {
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                  });

                  const responseData = await response.json();

                  activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                  );

                  if (!response.ok) {
                    throw new Error('Error sending request to server')
                  }
                  return responseData;

            } catch (err) {
                throw new Error('Error sending request to server')
            }

        }, [] );

        return { sendRequest }
};