// Realistic dummy market data for StrataQuant

// Generate date range
export const generateDates = (days: number, startDate: string = '2023-01-01'): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// 2 years of daily data
export const DATES = generateDates(504, '2022-01-03');

// Sensex price data (simulated realistic movement)
const generatePriceData = (startPrice: number, volatility: number, trend: number): number[] => {
  const prices: number[] = [startPrice];
  for (let i = 1; i < 504; i++) {
    const change = (Math.random() - 0.5) * volatility + trend;
    const newPrice = prices[i - 1] * (1 + change / 100);
    prices.push(Math.round(newPrice * 100) / 100);
  }
  return prices;
};

export const SENSEX_PRICES = generatePriceData(58000, 1.5, 0.03);
export const SP500_PRICES = generatePriceData(4500, 1.2, 0.025);

// Calculate returns
export const calculateReturns = (prices: number[]): number[] => {
  const returns: number[] = [0];
  for (let i = 1; i < prices.length; i++) {
    const ret = ((prices[i] - prices[i - 1]) / prices[i - 1]) * 100;
    returns.push(Math.round(ret * 10000) / 10000);
  }
  return returns;
};

export const SENSEX_RETURNS = calculateReturns(SENSEX_PRICES);
export const SP500_RETURNS = calculateReturns(SP500_PRICES);

// Calculate rolling volatility (20-day)
export const calculateRollingVolatility = (returns: number[], window: number = 20): number[] => {
  const volatility: number[] = [];
  for (let i = 0; i < returns.length; i++) {
    if (i < window - 1) {
      volatility.push(0);
    } else {
      const slice = returns.slice(i - window + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / window;
      const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / window;
      volatility.push(Math.round(Math.sqrt(variance) * 10000) / 10000);
    }
  }
  return volatility;
};

export const SENSEX_VOLATILITY = calculateRollingVolatility(SENSEX_RETURNS);

// Calculate drawdowns
export const calculateDrawdowns = (prices: number[]): number[] => {
  const drawdowns: number[] = [];
  let peak = prices[0];
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > peak) peak = prices[i];
    const dd = ((prices[i] - peak) / peak) * 100;
    drawdowns.push(Math.round(dd * 100) / 100);
  }
  return drawdowns;
};

export const SENSEX_DRAWDOWNS = calculateDrawdowns(SENSEX_PRICES);

// Calculate moving averages
export const calculateMA = (prices: number[], window: number): number[] => {
  const ma: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < window - 1) {
      ma.push(0);
    } else {
      const avg = prices.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0) / window;
      ma.push(Math.round(avg * 100) / 100);
    }
  }
  return ma;
};

export const SENSEX_MA10 = calculateMA(SENSEX_PRICES, 10);
export const SENSEX_MA20 = calculateMA(SENSEX_PRICES, 20);
export const SENSEX_MA50 = calculateMA(SENSEX_PRICES, 50);

// Calculate rolling mean
export const calculateRollingMean = (data: number[], window: number = 20): number[] => {
  const means: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < window - 1) {
      means.push(0);
    } else {
      const avg = data.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0) / window;
      means.push(Math.round(avg * 10000) / 10000);
    }
  }
  return means;
};

export const SENSEX_ROLLING_MEAN = calculateRollingMean(SENSEX_RETURNS);

// Market Stress Index (composite of volatility, drawdowns, momentum)
export const calculateStressIndex = (
  volatility: number[],
  drawdowns: number[],
  returns: number[]
): number[] => {
  const maxVol = Math.max(...volatility.filter(v => v > 0));
  const minDD = Math.min(...drawdowns);
  
  return volatility.map((vol, i) => {
    const volScore = vol > 0 ? (vol / maxVol) * 40 : 0;
    const ddScore = drawdowns[i] < 0 ? (Math.abs(drawdowns[i]) / Math.abs(minDD)) * 40 : 0;
    const momentumScore = Math.abs(returns[i]) > 2 ? 20 : Math.abs(returns[i]) * 5;
    const stress = Math.min(100, volScore + ddScore + momentumScore);
    return Math.round(stress * 100) / 100;
  });
};

export const MARKET_STRESS_INDEX = calculateStressIndex(SENSEX_VOLATILITY, SENSEX_DRAWDOWNS, SENSEX_RETURNS);

// Market Regimes
export type MarketRegime = 'Stable' | 'Volatile' | 'Crisis';

export const detectRegimes = (stressIndex: number[]): MarketRegime[] => {
  return stressIndex.map(stress => {
    if (stress < 30) return 'Stable';
    if (stress < 60) return 'Volatile';
    return 'Crisis';
  });
};

export const MARKET_REGIMES = detectRegimes(MARKET_STRESS_INDEX);

// Key market events (dummy)
export const MARKET_EVENTS = [
  { date: '2022-03-15', event: 'Fed Rate Hike', impact: 'negative' },
  { date: '2022-06-13', event: 'Inflation Surge', impact: 'negative' },
  { date: '2022-10-03', event: 'Global Correction', impact: 'negative' },
  { date: '2023-03-10', event: 'Banking Stress', impact: 'negative' },
  { date: '2023-07-20', event: 'Tech Rally', impact: 'positive' },
  { date: '2023-10-27', event: 'Geopolitical Tension', impact: 'negative' },
];

// Summary statistics
export const MARKET_SUMMARY = {
  sensex: {
    totalReturn: ((SENSEX_PRICES[SENSEX_PRICES.length - 1] - SENSEX_PRICES[0]) / SENSEX_PRICES[0] * 100).toFixed(2),
    avgVolatility: (SENSEX_VOLATILITY.filter(v => v > 0).reduce((a, b) => a + b, 0) / SENSEX_VOLATILITY.filter(v => v > 0).length).toFixed(2),
    maxDrawdown: Math.min(...SENSEX_DRAWDOWNS).toFixed(2),
    avgReturn: (SENSEX_RETURNS.reduce((a, b) => a + b, 0) / SENSEX_RETURNS.length).toFixed(4),
    sharpeRatio: '0.85',
    calmarRatio: '0.62',
  },
  sp500: {
    totalReturn: ((SP500_PRICES[SP500_PRICES.length - 1] - SP500_PRICES[0]) / SP500_PRICES[0] * 100).toFixed(2),
    avgVolatility: '1.15',
    maxDrawdown: '-18.42',
    avgReturn: '0.0312',
    sharpeRatio: '0.91',
    calmarRatio: '0.68',
  },
};

// Correlation between indices
export const INDEX_CORRELATION = 0.76;

// Histogram data for returns
export const generateReturnHistogram = (returns: number[]): { bucket: string; count: number }[] => {
  const buckets: { [key: string]: number } = {};
  const ranges = ['-5+', '-4 to -5', '-3 to -4', '-2 to -3', '-1 to -2', '-1 to 0', '0 to 1', '1 to 2', '2 to 3', '3 to 4', '4 to 5', '5+'];
  ranges.forEach(r => buckets[r] = 0);
  
  returns.forEach(ret => {
    if (ret <= -5) buckets['-5+']++;
    else if (ret <= -4) buckets['-4 to -5']++;
    else if (ret <= -3) buckets['-3 to -4']++;
    else if (ret <= -2) buckets['-2 to -3']++;
    else if (ret <= -1) buckets['-1 to -2']++;
    else if (ret < 0) buckets['-1 to 0']++;
    else if (ret < 1) buckets['0 to 1']++;
    else if (ret < 2) buckets['1 to 2']++;
    else if (ret < 3) buckets['2 to 3']++;
    else if (ret < 4) buckets['3 to 4']++;
    else if (ret < 5) buckets['4 to 5']++;
    else buckets['5+']++;
  });
  
  return ranges.map(bucket => ({ bucket, count: buckets[bucket] }));
};

export const SENSEX_RETURN_HISTOGRAM = generateReturnHistogram(SENSEX_RETURNS);

// Get formatted chart data
export const getChartData = (limit: number = 100) => {
  const startIdx = Math.max(0, DATES.length - limit);
  return DATES.slice(startIdx).map((date, idx) => {
    const i = startIdx + idx;
    return {
      date,
      price: SENSEX_PRICES[i],
      sp500: SP500_PRICES[i],
      returns: SENSEX_RETURNS[i],
      volatility: SENSEX_VOLATILITY[i],
      drawdown: SENSEX_DRAWDOWNS[i],
      ma10: SENSEX_MA10[i],
      ma20: SENSEX_MA20[i],
      ma50: SENSEX_MA50[i],
      rollingMean: SENSEX_ROLLING_MEAN[i],
      stressIndex: MARKET_STRESS_INDEX[i],
      regime: MARKET_REGIMES[i],
    };
  });
};
