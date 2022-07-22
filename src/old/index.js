const axios = require("axios");
const stoch = require("./stochastic");
const vwap = require("./vwap");

const SECURITY = "SPY";
const STRIKE_PRICE_LOW = 385;
const STRIKE_PRICE_HIGH = 385;
const EXPIRATION_DATE = 1657843200;
const VOLUME_MIN = 1000;
const STOCHASTIC_UNDER = 20;

var symbol;
var bid;
var ask;
var name;
var dates;

function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}

async function getChartDataFromYahoo(ticker) {
  const options = {
    method: "GET",
    url: "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker,
    params: {
      //period1: toTimestamp('07/13/2022 13:55:00'),//"2022/07/13-09:00:00", // todo: start of the day moment
      //period2: toTimestamp('07/13/2022 14:30:00'),//"2022/07/13-11:10:00",  // todo: current moment
      StartDateInclusive: '2022-07-12',
      EndDateInclusive: '2022-07-13',
      interval: "1m",
      includePrePost: "true",
    }
  };

  try {
    response = await axios.request(options);
    if (response.data.chart.error) {
      throw new Error(response.data.chart.error)
    }

    timestamp = response.data.chart.result[0].timestamp;
    quote = response.data.chart.result[0].indicators.quote[0];
    quote['timestamp'] = [...timestamp];
    quote['identifier'] = ticker;
    return quote;
  } catch (error) {
    console.error("Unable to download chart data");
    console.error(error);
    return {};
  }
}

function convertToLocalDateTimeString(timestamp1) {
  const c = timestamp1 * 1000;
  const d = new Date(c);
  return d.toLocaleString();
}

async function getOptionChain(ticker) {
  const options = {
    method: "GET",
    url: "https://query1.finance.yahoo.com/v7/finance/options/" + ticker,
  };

  try {
    response = await axios.request(options);

    symbol = response.data.optionChain.result[0].underlyingSymbol;
    name = response.data.optionChain.result[0].quote.longName;
    bid = response.data.optionChain.result[0].quote.bid;
    ask = response.data.optionChain.result[0].quote.ask;
    dates = response.data.optionChain.result[0].expirationDates;

    const CallOptions = response.data.optionChain.result[0].options[0].calls;
    const PutOptions = response.data.optionChain.result[0].options[0].puts;

    return { call: CallOptions, put: PutOptions };

    //const strikes = response.data.optionChain.result[0].strikes;
  } catch (error) {
    console.error("Error getting option chain");
    console.error(error);
    return { call: [], put: [] };
  }
}

function filterOptionChain(call, put) {
  try {
    const filteredCallOptions = call.filter(
      (item) =>
        item.strike >= STRIKE_PRICE_LOW &&
        item.strike <= STRIKE_PRICE_HIGH &&
        item.expiration === EXPIRATION_DATE
    );

    const filteredPutOptions = put.filter(
      (item) =>
        item.strike >= STRIKE_PRICE_LOW &&
        item.strike <= STRIKE_PRICE_HIGH &&
        item.expiration === EXPIRATION_DATE
    );

    console.log("Filtered Call Options:");
    filteredCallOptions.map((item) => {
      console.log(item.contractSymbol);
    });

    console.log("Filtered Put Options:");
    filteredPutOptions.map((item) => {
      console.log(item.contractSymbol);
    });

    return { filteredCalls: filteredCallOptions, filteredPuts: filteredPutOptions };
  } catch (error) {
    console.error("Error filtering option chain");
    console.log(error);
    return { filteredCalls: [], filteredPuts: [] };
  }
}

function AddAlertItem(alertItem) {
  console.log(alertItem);
}

function CalculateVolumeAlert(chartData) {
  vols = chartData.volume;
  stamps = chartData.timestamp;

  vols.map((vol, index) => {
    if (vol > VOLUME_MIN) {
      // Volume alert!
      AddAlertItem({
        symbol: chartData.identifier,
        timestamp: convertToLocalDateTimeString(stamps[index]),
        message: "Option volume (" + vol + ") is above the volume limit ("+ VOLUME_MIN.toString() +") value" ,
      });
    }
  });
}

async function CalculateSlowStochasticAlert(chartData) {
  prices = chartData.close
  stamps = chartData.timestamp

  data = await stoch.SlowStochastic(prices);

  data.map( (item, index) => {
    if (item.k>0 && item.d>0 && item.k<STOCHASTIC_UNDER && item.d<STOCHASTIC_UNDER) {
      AddAlertItem({
        symbol: chartData.identifier,
        dateTime: convertToLocalDateTimeString(stamps[index]),
        message: "SlowStochastic k ("+item.k.toString()+") and d ("+item.d.toString()+") are under the limit ("+ STOCHASTIC_UNDER.toString() +")",
      });
    }    
  })
}

function CalculateVwapAlert(chartData) {
  prices = chartData.close;
  volumes = chartData.volume;
  stamps = chartData.timestamp;

  data = [];

  prices.map( (item, index)=> {
    data[index] = [volumes[index], prices[index]];
  })

  const result = vwap.Vwap(data);

  result.map( (item, index) => {
    if (prices[index] && item>prices[index]) {
      AddAlertItem({
        symbol: chartData.identifier,
        dateTime: convertToLocalDateTimeString(stamps[index]),
        message: "VWAP ("+item.toString()+") is above option price ("+ prices[index].toString() +")"
      });
    }    
  })
}

function checkForAlerts(calls, puts) {
  calls.map( async (item) => {
    const chartData = await getChartDataFromYahoo(item.contractSymbol);

    CalculateVwapAlert(chartData);
    CalculateVolumeAlert(chartData);
    await CalculateSlowStochasticAlert(chartData);
    
  });

  puts.map( async (item) => {
    const chartData = await getChartDataFromYahoo(item.contractSymbol);

    CalculateVwapAlert(chartData);
    CalculateVolumeAlert(chartData);
    await CalculateSlowStochasticAlert(chartData);
  });

  return;
}

async function main() {
  const { call, put } = await getOptionChain(SECURITY);
  var { filteredCalls, filteredPuts } = filterOptionChain(call, put);
  const alerts = checkForAlerts(filteredCalls, filteredPuts);
}

main();

const respData = '<?xml version="1.0" encoding="UTF-8"?>\n<Chart>\n<Symbol>\n<STATUS finestGranularityAllowed="1" finestGranularityExceeded="0" maxYearsAllowed="max" maxYearsExceeded="0"/>\n<DESCRIPTION>SPY JUL 2022 381.0000 CALL</DESCRIPTION>\n<SC_CODE>O</SC_CODE>\n<IDENTIFIER>-SPY220715C381</IDENTIFIER>\n<CUSIP>5945069LF</CUSIP>\n<UNDERLYING_SECURITY_SYMBOL>SPY</UNDERLYING_SECURITY_SYMBOL>\n<EXPIRATION_DATE>07/15/2022</EXPIRATION_DATE>\n<CALL_PUT_FLAG>C</CALL_PUT_FLAG>\n<STRIKE_PRICE>381.00</STRIKE_PRICE>\n<TIMESTAMPS>165…46 5.36 5.9 5.54 5.46 5.46 5.4 5.68 5.35 5.45 5.46 6 5.96 5.88 5.94 6 5.98 5.78 5.68 5.51</HIGH>\n<LOW>6.18 6.5 6.69 7.07 7.17 7.22 7.27 6.99 6.42 6.44 5.44 5.36 5.4 5.6 5.37 5.46 5.34 5.79 5.54 5.45 5.46 5.39 5.68 5.35 5.29 5.46 6 5.96 5.88 5.94 6 5.98 5.78 5.68 5.51</LOW>\n<VOLUME>1 1 1 1 11 2 3 1 1 1 7 80 21 104 8 1 4 7 7 8 7 21 1 1 59 10 1 1 4 2 1 1 1 6 13</VOLUME>\n</VALUES>\n<BAR_COUNT X="35"/>\n<SkipCount></SkipCount>\n</Symbol>\n<cvh></cvh>\n<tsvh></tsvh>\n<rh>FMDSNPOMA211.fmr.com</rh>\n</Chart>';
//  '<?xml version="1.0" encoding="UTF-8"?>\n<Chart>\n<Symbol>\n<STATUS finestGranularityAllowed="1" finestGranularityExceeded="0" maxYearsAllowed="max" maxYearsExceeded="0"/>\n<DESCRIPTION>INTEL CORP</DESCRIPTION>\n<SC_CODE>E</SC_CODE>\n<IDENTIFIER>INTC</IDENTIFIER>\n<CUSIP>458140100</CUSIP>\n<TIMESTAMPS>1657632600 1657632660 1657632720 1657632780 1657632840 1657632900 1657632960 1657633020 1657633080 1657633140 1657633200 1657633260 1657633320 1657633380 1657633440 1657633500 1657633560 1657633620 1657633680 1657633740 1657633800 1657633860 1657633920 1657633980 1657634040 1657634100 1657634160 1657634220 1657634280 1657634340 1657634400 1657634460 1657634520 1657634580 1657634640 1657634700 1657634760 1657634820 1657634880 1657634940 1657635000 1657635060 1657635120 1657635180 1657635240 1657635300 1657635360 1657635420 1657635480 1657635540 1657635600 1657635660 1657635720 1657635780 1657635840 1657635900 1657635960 1657636020 1657636080 1657636140 1657636200 1657636260 1657636320 1657636380 1657636440 1657636500 1657636560 1657636620 1657636680 1657636740 1657636800 1657636860 1657636920 1657636980 1657637040 1657637100 1657637160 1657637220 1657637280 1657637340 1657637400 1657637460 1657637520 1657637580 1657637640 1657637700 1657637760 1657637820 1657637880 1657637940 1657638000</TIMESTAMPS>\n<VALUES>\n<OPEN>37.65 37.5592 37.645 37.65 37.5 37.42 37.535 37.48 37.45 37.38 37.32 37.285 37.31 37.2799 37.285 37.31 37.35 37.34 37.37 37.37 37.26 37.25 37.25 37.28 37.2199 37.23 37.2 37.198 37.235 37.225 37.13 37.095 37.12 37.17 37.115 37.135 37.12 37.13 37.115 37.05 37.05 37.09 37.15 37.165 37.125 37.145 37.185 37.2199 37.23 37.23 37.235 37.24 37.215 37.19 37.2 37.2 37.25 37.23 37.205 37.185 37.19 37.2621 37.25 37.23 37.285 37.225 37.22 37.22 37.26 37.235 37.24 37.205 37.19 37.17 37.15 37.2 37.275 37.24 37.225 37.24 37.235 37.24 37.225 37.22 37.22 37.25 37.26 37.26 37.23 37.225 37.25</OPEN>\n<CLOSE>37.56 37.64 37.64 37.5015 37.42 37.54 37.47 37.45 37.375 37.32 37.2812 37.31 37.275 37.285 37.305 37.35 37.34 37.38 37.37 37.265 37.25 37.245 37.29 37.23 37.23 37.2 37.2 37.24 37.23 37.125 37.1 37.12 37.17 37.11 37.1349 37.13 37.13 37.115 37.05 37.05 37.08 37.15 37.17 37.13 37.14 37.1813 37.21 37.22 37.235 37.245 37.235 37.218 37.195 37.2 37.2 37.2401 37.23 37.21 37.18 37.18 37.26 37.25 37.24 37.28 37.225 37.225 37.22 37.265 37.23 37.24 37.2 37.18 37.17 37.15 37.195 37.28 37.2501 37.23 37.24 37.24 37.235 37.22 37.22 37.225 37.25 37.255 37.26 37.23 37.22 37.235 37.24</CLOSE>\n<HIGH>37.6625 37.64 37.7 37.65 37.5 37.54 37.565 37.49 37.51 37.4 37.35 37.34 37.34 37.3484 37.32 37.39 37.355 37.41 37.4 37.38 37.27 37.28 37.3 37.3 37.24 37.23 37.22 37.25 37.275 37.23 37.13 37.14 37.185 37.17 37.14 37.16 37.13 37.1388 37.115 37.09 37.095 37.16 37.23 37.17 37.15 37.1813 37.21 37.25 37.26 37.25 37.28 37.25 37.215 37.24 37.23 37.25 37.26 37.26 37.21 37.23 37.265 37.2799 37.28 37.28 37.29 37.255 37.25 37.2668 37.265 37.265 37.245 37.205 37.195 37.19 37.2 37.28 37.295 37.25 37.24 37.26 37.265 37.255 37.23 37.25 37.26 37.27 37.28 37.26 37.26 37.24 37.27</HIGH>\n<LOW>37.51 37.545 37.63 37.5 37.375 37.42 37.44 37.44 37.365 37.305 37.22 37.263 37.25 37.26 37.265 37.3 37.26 37.335 37.31 37.26 37.215 37.23 37.21 37.19 37.21 37.14 37.185 37.19 37.22 37.11 37.08 37.09 37.11 37.11 37.1 37.12 37.095 37.1 37.04 37.045 37.05 37.07 37.14 37.12 37.11 37.13 37.15 37.19 37.23 37.19 37.21 37.19 37.16 37.18 37.19 37.17 37.22 37.195 37.1623 37.14 37.17 37.22 37.23 37.23 37.195 37.21 37.2 37.21 37.22 37.23 37.2 37.17 37.14 37.15 37.13 37.2 37.245 37.21 37.2 37.235 37.21 37.22 37.205 37.22 37.22 37.23 37.25 37.21 37.21 37.205 37.23</LOW>\n<VOLUME>587186 104854 67384 43062 79581 72824 105425 111883 184701 96757 126556 185347 79767 59136 107824 102350 103093 76947 146273 91107 136348 63446 80595 104567 42898 129447 80493 77505 85354 64684 77390 58976 37494 51425 33972 30411 90042 24297 77367 74180 61122 99707 68621 60286 52193 74458 64743 48365 41526 69121 69279 48063 67471 43682 21650 35306 51402 146499 45172 181457 75349 76116 50122 77503 194855 101322 70046 96228 70981 49561 92513 71911 77450 54519 75039 32638 45220 15167 28131 47335 31919 26487 61246 48155 61325 56872 64927 63443 127158 77626 61076</VOLUME>\n</VALUES>\n<BAR_COUNT X="91"/>\n<SkipCount></SkipCount>\n</Symbol>\n<cvh></cvh>\n<tsvh></tsvh>\n<rh>FMDSNPRTP112.fmr.com</rh>\n</Chart>';


/*
    Hi Gabor.  It's Josh from Options Trading 102, with an idea about a Python Script or small app that can scan an Options Chain, look for a specific setup / pattern, and notify me when it happens. I have dummy account on Fidelity Actice Trader Pro, Fidelity. Com, and/ Think or Swim (TD Ameritrade).  In the simplest form, I am looking for an app/script that looks for these specific conditions.

Enter Criteria / Search Criteria 

1.  Enter the Security / Stock Option symbol.

2.  Enter the Low and High Strike Price for a search range with expiration date.  This will give a filtered Options Chain.

3.  Open the CALL and PUT charts for the expiration date and Strike Price ranges.

4.  Look at the 1 min chart

Alert / Report when these conditions are met

1.  Volume on the 1 min chart is over "x"  (Variable that let the user enter)

2.  Slow Stochastic is below "x"  (Variable that let the user enter)

3.  Current Option price is below VWAP.

Test Scenario

1.  Look at SPY Option Chain with a Friday (8/15/2022) expiration.  

2.  Look at Strike Prices between 370 and 390 on the Options Chain.

3.  Open (or analyze in the background) all the Options Charts for the Strike Prices listed

4.  Set the VWAP and Slow Stochastic Indicators for each chart

5.  Send an alert with the Options name any time the 1 min Volume bar is over 1,000.

I will send some screen shot examples where the Criteria is met.

For an over simplified version, if the filter is too complicated to take indicators into effect, 
you could just report on any 1 min chart with Volume over 1,000, then we could manually filter
from there.

This is 1 Strategy.  I call it my Scalping Strategy.  I envision an app where a user could select
a Strategy from a drop down list and have the app / script give the results of the scan.
*/