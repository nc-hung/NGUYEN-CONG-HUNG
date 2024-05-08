import './App.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Autocomplete, Box, Button, Card, CardActions, CardContent, FormControl, Icon, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { getCurrencyConversion, getCurrencySymbols } from './api';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
//apikey: fwvxMzqGJJ2GQ55ZQc1wCJoz91yp9RL7
function App() {

  const currencyNamesInit = {
    "AED": "United Arab Emirates Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillean Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia-Herzegovina Convertible Mark",
    "BBD": "Barbadian Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudian Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTC": "Bitcoin",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswana Pula",
    "BYN": "Belarusian Ruble",
    "BYR": "Belarusian Ruble (pre-2016)",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLF": "Chilean Unit of Account (UF)",
    "CLP": "Chilean Peso",
    "CNY": "Chinese Yuan",
    "CNH": "Chinese Yuan (Offshore)",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colón",
    "CUC": "Cuban Convertible Peso",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Republic Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fijian Dollar",
    "FKP": "Falkland Islands Pound",
    "GBP": "British Pound Sterling",
    "GEL": "Georgian Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanaese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Shekel",
    "IMP": "Manx pound",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Króna",
    "JEP": "Jersey Pound",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgystani Som",
    "KHR": "Cambodian Riel",
    "KMF": "Comorian Franc",
    "KPW": "North Korean Won",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Laotian Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lankan Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LTL": "Lithuanian Litas",
    "LVL": "Latvian Lats",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Myanma Kyat",
    "MNT": "Mongolian Tugrik",
    "MOP": "Macanese Pataca",
    "MRU": "Mauritanian Ouguiya",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Nuevo Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Zloty",
    "PYG": "Paraguayan Guarani",
    "QAR": "Qatari Rial",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STD": "São Tomé and Príncipe Dobra",
    "SVC": "Salvadoran Colón",
    "SYP": "Syrian Pound",
    "SZL": "Swazi Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistani Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistan Som",
    "VEF": "Venezuelan Bolívar",
    "VES": "Venezuelan Bolívar Soberano",
    "VND": "Vietnamese Dong",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tala",
    "XAF": "CFA Franc BEAC",
    "XAG": "Silver Ounce",
    "XAU": "Gold Ounce",
    "XCD": "East Caribbean Dollar",
    "XDR": "Special Drawing Rights",
    "XOF": "CFA Franc BCEAO",
    "XPF": "CFP Franc",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMK": "Zambian Kwacha (pre-2013)",
    "ZMW": "Zambian Kwacha",
    "ZWL": "Zimbabwean Dollar",
  };
  const currenciesInit = {
    "AED": 3.944774,
    "AFN": 77.69439,
    "ALL": 100.609394,
    "AMD": 417.393478,
    "ANG": 1.939439,
    "AOA": 900.563444,
    "ARS": 945.939815,
    "AUD": 1.634648,
    "AWG": 1.935923,
    "AZN": 1.818812,
    "BAM": 1.954392,
    "BBD": 2.172765,
    "BDT": 118.104917,
    "BGN": 1.955932,
    "BHD": 0.404912,
    "BIF": 3086.362202,
    "BMD": 1.074021,
    "BND": 1.456244,
    "BOB": 7.43554,
    "BRL": 5.450226,
    "BSD": 1.076145,
    "BTC": 0.000017071372,
    "BTN": 89.860309,
    "BWP": 14.641725,
    "BYN": 3.521712,
    "BYR": 21050.816892,
    "BZD": 2.169168,
    "CAD": 1.477268,
    "CDF": 3007.259813,
    "CHF": 0.976608,
    "CLF": 0.036457,
    "CLP": 1005.950022,
    "CNY": 7.759263,
    "CNH": 7.766333,
    "COP": 4173.979602,
    "CRC": 550.313799,
    "CUC": 1.074021,
    "CUP": 28.461564,
    "CVE": 110.184084,
    "CZK": 25.033934,
    "DJF": 191.634622,
    "DKK": 7.459184,
    "DOP": 62.476155,
    "DZD": 144.559441,
    "EGP": 51.2553,
    "ERN": 16.110319,
    "ETB": 61.270102,
    "EUR": 1,
    "FJD": 2.443237,
    "FKP": 0.862183,
    "GBP": 0.860269,
    "GEL": 2.867295,
    "GGP": 0.862183,
    "GHS": 14.872078,
    "GIP": 0.862183,
    "GMD": 72.764907,
    "GNF": 9247.467233,
    "GTQ": 8.36086,
    "GYD": 225.134668,
    "HKD": 8.395785,
    "HNL": 26.592338,
    "HRK": 7.604243,
    "HTG": 142.706529,
    "HUF": 388.752823,
    "IDR": 17269.080598,
    "ILS": 3.972735,
    "IMP": 0.862183,
    "INR": 89.686844,
    "IQD": 1409.697573,
    "IRR": 45176.023788,
    "ISK": 150.309343,
    "JEP": 0.862183,
    "JMD": 168.771559,
    "JOD": 0.761158,
    "JPY": 166.663936,
    "KES": 143.384515,
    "KGS": 95.121015,
    "KHR": 4384.820741,
    "KMF": 490.747161,
    "KPW": 966.619519,
    "KRW": 1467.048398,
    "KWD": 0.330401,
    "KYD": 0.896758,
    "KZT": 473.571042,
    "LAK": 22945.896957,
    "LBP": 96367.222483,
    "LKR": 322.523658,
    "LRD": 207.82479,
    "LSL": 19.84822,
    "LTL": 3.171306,
    "LVL": 0.649665,
    "LYD": 5.222311,
    "MAD": 10.789776,
    "MDL": 19.063621,
    "MGA": 4764.656245,
    "MKD": 61.569785,
    "MMK": 2259.91403,
    "MNT": 3705.373753,
    "MOP": 8.669135,
    "MRU": 42.843138,
    "MUR": 49.694857,
    "MVR": 16.60459,
    "MWK": 1865.89055,
    "MXN": 18.17158,
    "MYR": 5.097843,
    "MZN": 68.198837,
    "NAD": 19.837286,
    "NGN": 1486.335613,
    "NIO": 39.611648,
    "NOK": 11.757772,
    "NPR": 143.781097,
    "NZD": 1.793546,
    "OMR": 0.413371,
    "PAB": 1.07611,
    "PEN": 4.013908,
    "PGK": 4.166018,
    "PHP": 61.676208,
    "PKR": 299.218613,
    "PLN": 4.313216,
    "PYG": 8030.327068,
    "QAR": 3.910489,
    "RON": 4.976261,
    "RSD": 117.148816,
    "RUB": 98.047908,
    "RWF": 1402.515738,
    "SAR": 4.028117,
    "SBD": 9.126366,
    "SCR": 14.520341,
    "SDG": 645.487085,
    "SEK": 11.704253,
    "SGD": 1.456695,
    "SHP": 1.356972,
    "SLE": 24.538489,
    "SLL": 22521.692957,
    "SOS": 613.266381,
    "SRD": 35.42983,
    "STD": 22230.071849,
    "SVC": 9.416304,
    "SYP": 2698.511058,
    "SZL": 19.852068,
    "THB": 39.696295,
    "TJS": 11.72965,
    "TMT": 3.769815,
    "TND": 3.364375,
    "TOP": 2.548921,
    "TRY": 34.660276,
    "TTD": 7.289782,
    "TWD": 34.843827,
    "TZS": 2776.345336,
    "UAH": 42.295818,
    "UGX": 4051.025045,
    "USD": 1.074021,
    "UYU": 40.99047,
    "UZS": 13611.321072,
    "VEF": 3890698.473715,
    "VES": 39.229279,
    "VND": 27312.360896,
    "VUV": 127.509994,
    "WST": 3.011135,
    "XAF": 655.496983,
    "XAG": 0.03924,
    "XAU": 0.000463,
    "XCD": 2.902596,
    "XDR": 0.814129,
    "XOF": 655.493934,
    "XPF": 119.331742,
    "YER": 268.881548,
    "ZAR": 19.913805,
    "ZMK": 9667.486597,
    "ZMW": 29.163398,
    "ZWL": 345.834411
  }



  const [currencies, setCurrencies] = useState({});
  const [currencyNames, setCurrencyNames] = useState({});
  const [fromCurrency, setFromCurrency] = useState(null);
  const [tocurrency, setToCurrency] = useState(null);
  const [isShowErr, setIsShowErr] = useState(false);
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);


  useEffect(() => {
    // handleRequestGetCurrencyConversion()
    // handleRequestGetCurrencySymbols()
    setCurrencies(currenciesInit)
    setCurrencyNames(currencyNamesInit)
  }, [])

  useEffect(() => {

    convertCurrency(currencies[fromCurrency], currencies[tocurrency], amount);

  }, [fromCurrency, tocurrency, amount])

  const handleRequestGetCurrencyConversion = async () => {
    const result = await getCurrencyConversion();

    if (result.success == true) {
      setCurrencies(result.rates)
    }
  }

  const handleRequestGetCurrencySymbols = async () => {
    const result = await getCurrencySymbols();

    if (result.success == true) {
      setCurrencyNames(result.symbols)
    }
  }

  function handleChangeSelectCurrency() {
    const temp = fromCurrency;
    setFromCurrency(tocurrency);
    setToCurrency(temp);
  }

  const convertCurrency = (fromCurrency, toCurrency, amount) => {
    console.log(fromCurrency, toCurrency, amount)
    if (fromCurrency && toCurrency) {
      const exchangeRate = toCurrency / fromCurrency;
      const convertedAmount = amount * exchangeRate;
      const result = convertedAmount.toFixed(4);

      console.log(result);
      setResult(result);
      return result;
    }

    return 'Invalid conversion';
  };

  const CurrencySwapForm = () => {

    return (
      <Formik
        initialValues={{ amount: '' }}
        validationSchema={Yup.object({
          amount: Yup.number().required('Please enter an amount'),
        })}
        onSubmit={(values, { setSubmitting, }) => {
          console.log(values);
          setSubmitting(false);
          setAmount(values.amount);
          convertCurrency(currencies[fromCurrency], currencies[tocurrency], values.amount);
          setIsShowErr(true)
        }}

      >

        {({ errors, touched, isSubmitting }) => (
          <Form className='form-wrapper'>

            <div className='form-group'   >

              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={fromCurrency}
                  onChange={(event, value) => {
                    setFromCurrency(value)
                  }}
                  options={Object.keys(currencies)}
                  renderInput={(params) => <TextField {...params} label="From" />}
                  renderOption={(props, option) => (
                    <MenuItem {...props} key={option}>
                      {option} - {currencyNames[option]}
                    </MenuItem>
                  )}
                />
                {(!fromCurrency && isShowErr) && (<div className="error-message">Please select from currency</div>)}
              </FormControl>


              <div style={{ padding: 8 }}>
                <Button style={{ borderWidth: 1 }} variant='outlined' onClick={handleChangeSelectCurrency}>
                  <SwapHorizIcon />
                </Button>
              </div>


              <FormControl fullWidth margin="normal">
                <Autocomplete
                  value={tocurrency}
                  onChange={(event, value) => {
                    setToCurrency(value)
                  }} options={Object.keys(currencies)}
                  renderInput={(params) => <TextField {...params} label="To" />}
                  renderOption={(props, option) => (
                    <MenuItem {...props} key={option}>
                      {option} - {currencyNames[option]}
                    </MenuItem>
                  )}
                />
                {(!tocurrency && isShowErr) && (<div className="error-message">Please select to currency</div>)}
              </FormControl>


            </div>

            <div>
              <FormControl fullWidth margin="normal" >
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!(errors.amount && touched.amount)}
                  helperText={(errors.amount && touched.amount) && errors.amount}
                />
              </FormControl>
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => { setIsShowErr(true) }}
              >
                Swap
              </Button>
            </div>

          </Form>
        )}

      </Formik>
    );
  };


  function renderResult() {
    return (
      <div className='render_result-wrapper'>
        <Typography gutterBottom variant="h6" component="div" color={'GrayText'}>
          {fromCurrency && tocurrency && amount && `${amount} ${fromCurrency} (${currencyNames[fromCurrency]}) = `}
        </Typography>

        <div className='card' >
          <Typography variant='h4' color='ActiveCaption'>
            {`${result}`}
          </Typography>
          <Typography variant='h6' color='GrayText'>
            {` ${tocurrency} (${currencyNames[tocurrency]})`}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {CurrencySwapForm()}
      {result && amount && renderResult()}
    </div>
  );
}

export default App;