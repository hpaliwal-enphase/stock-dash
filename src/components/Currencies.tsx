import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

// API Key
import { alphaVantageKey } from "../utils/apiKey";

type CurrencyData = {
  "Realtime Currency Exchange Rate": {
    [key: string]: string,
  }
};

const fetchCurrency = (baseCurrency: string, targetCurrency: string) => {
  return axios.get(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${baseCurrency}&to_currency=${targetCurrency}&apikey=${alphaVantageKey}`
  );
};

export const CurrenciesPage = () => {
  const { data: cnyData, isLoading: cnyLoading, isError: cnyIsError, error: cnyError } = useQuery<
    AxiosResponse<CurrencyData>,
    AxiosError
  >(["currencies", 'USD', 'CNY'], () => fetchCurrency('USD', 'CNY'));

  const { data: inrData, isLoading: inrLoading, isError: inrIsError, error: inrError } = useQuery<
    AxiosResponse<CurrencyData>,
    AxiosError
  >(["currencies", 'USD', 'INR'], () => fetchCurrency('USD', 'INR'));

  if (cnyLoading || inrLoading) {
    return <h2>Loading...</h2>;
  }

  if (cnyIsError || inrIsError) {
    return cnyError ? <h2>{cnyError.message}</h2> : <h2>{inrError?.message}</h2>;
  }

  return (
    <>
      <h2>Currencies Page</h2>
      <div>1 USD equals: </div>
      <div>Chinese Yen {cnyData?.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}</div>
      <div>Indian Rupee {inrData?.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}</div>
    </>
  );
};
