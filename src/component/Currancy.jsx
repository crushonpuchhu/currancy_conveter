import React, { useReducer, useRef, useState } from 'react'
import st from './Style.module.css'
import axios from 'axios'
const from_data = ["USD",
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTC",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VEF",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWL"]

const to_data = ["INR",
    "USD",
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTC",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VEF",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWL"]

const da = new Date();
const date = da.getDate() - 3;
const year = da.getFullYear();
const mounth = da.getMonth() + 1;


const Currancy = () => {
      
    const data1 = useRef();
    const data2 = useRef();
    const inp1 = useRef();
    const inp2 = useRef();



    function run1(e) {

        const arr = new Array();
        arr.push(e.target.value);
        arr.push(data1.current.value);
        arr.push(data2.current.value);

        try {
            const info = axios("https://exchange-rates.abstractapi.com/v1/convert?api_key=4b15c61a17324062a04490a72146f438&base=" + arr[1] + "&target=" + arr[2] + "&date=" + year + "-" + mounth + "-" + date + "&base_amount=" + arr[0]);
            const fet = async () => {
                const data_get = await info;
                if (arr[0] !== "") {
                    inp2.current.value = data_get.data.converted_amount;

                }
                else
                    inp2.current.value = "";
                setTimeout(() => {
                    if (arr[0] !== "") {
                        inp2.current.value= data_get.data.converted_amount;

                    }
                    else
                        inp2.current.value = "";
                }, 1000)

            }
            fet();

        }
        catch (e) {
            console.log(e);
        }

    }

    function run2(e) {

        const arr = new Array();
        arr.push(e.target.value);
        arr.push(data1.current.value);
        arr.push(data2.current.value);

        try {
            const info = axios("https://exchange-rates.abstractapi.com/v1/convert?api_key=4b15c61a17324062a04490a72146f438&base=" + arr[2] + "&target=" + arr[1] + "&date=" + year + "-" + mounth + "-" + date + "&base_amount=" + arr[0]);
            const fet = async () => {
                const data_get = await info;
                if (arr[0] !== "") {
                    inp1.current.value = data_get.data.converted_amount;

                }
                else
                    inp1.current.value = "";


                setTimeout(() => {
                    if (arr[0] !== "") {
                        inp1.current.value = data_get.data.converted_amount;

                    }
                    else
                        inp1.current.value = "";
                }, 1000)

            }
            fet();

        }
        catch (e) {
            console.log(e);
        }

    }


    return (

        <>
            <div className={st.main}>
                <div className={st.sub}>
                    <div className={st.text}>
                        <h1>Currency Converter</h1>
                    </div>
                    <div className={st.tags}>
                        <div className={st.fro}>
                            <select ref={data1} name="from" id="">
                                {
                                    from_data.map((e, i) => {

                                        return (
                                            <option key={i} value={e}>{e}</option>

                                        )
                                    })
                                }

                            </select>
                            <input type="number" onChange={run1} ref={inp1} />
                        </div>
                        <div className={st.too}>
                            <select ref={data2} name="to" id="">
                                {
                                    to_data.map((e, i) => {
                                        return (
                                            <option key={i} value={e}>{e}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" onChange={run2} ref={inp2} />

                        </div>
                    </div>
                </div>


            </div>
        </>


    )
}

export default Currancy



