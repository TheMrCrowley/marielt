enum CurrencyId {
  USD = 431,
  EUR = 451,
  RUB = 456,
}

interface GetCurrencyResponse {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: keyof typeof CurrencyId;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
}

export const getCurrencyByType = async (type: keyof typeof CurrencyId) => {
  const response = await fetch(`https://api.nbrb.by/exrates/rates/${CurrencyId[type]}`, {});
  const data = (await response.json()) as GetCurrencyResponse;

  return data.Cur_OfficialRate / data.Cur_Scale;
};

export const getCurrencies = async () => {
  const [usd, eur, rub] = await Promise.all([
    getCurrencyByType('USD'),
    getCurrencyByType('EUR'),
    getCurrencyByType('RUB'),
  ]);

  return {
    usd,
    eur,
    rub,
  };
};