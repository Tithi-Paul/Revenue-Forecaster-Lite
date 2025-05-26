import React, { useState } from 'react';
import './App.css';
import InputForm from './components/user-input-component/InputForm';
import ForecastTable from './components/table-component/ForecastTable';
import ChartView from './components/chart-component/ChartView';
import { calculateForecast } from './utils/calculateForecast';
import { exportToCSV, exportToJSON } from './utils/exportUtils';

const App = () => {
  const [inputs, setInputs] = useState({
    months: 12,
    startUsers: 0,
    growthRate: 0,
    churnRate: 0,
    revenuePerUser: 0,
    costPerUser: 0,
    fixedCost: 0,
    toggleRevenueBoost: false,
    toggleGrowthDrop: false
  });

  const [forecast, setForecast] = useState([]);

  const handleForecast = () => {
    const results = calculateForecast(inputs);
    setForecast(results);
  };

  const getTotals = () => {
    const last = forecast[forecast.length - 1];
    return last ? {
      revenue: last.cumulativeRevenue,
      cost: last.cumulativeCost,
      profit: last.cumulativeProfit
    } : null;
  };

  const totals = getTotals();

  return (
    <div className="app-container">
      <h1 className="app-title">Revenue Forecaster Lite</h1>

      <InputForm inputs={inputs} setInputs={setInputs} onCalculate={handleForecast} />

      <div className="export-buttons">
        <button onClick={() => exportToCSV(forecast)}>Export CSV</button>
        <button onClick={() => exportToJSON(forecast)}>Export JSON</button>
      </div>

      {forecast.length > 0 && (
        <>
          <ChartView data={forecast} animate={true} />

          <ForecastTable data={forecast} />
          {totals && (
            <div className="forecast-chart-wrapper">
                <h2 className="forecast-chart-title">🧾 Totals at the End of Forecast</h2>
                <div className="totals-summary">
                  <p><strong>Cumulative Revenue:</strong> £{totals.revenue}</p>
                  <p><strong>Cumulative Cost:</strong> £{totals.cost}</p>
                  <p><strong>Cumulative Profit:</strong> £{totals.profit}</p>
                </div>
            </div>
          )}
        </>
      )}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Revenue Forecaster Lite. All rights reserved.</p>
        <p>Made with 💡 to empower startup founders.</p>
        <p>Version 1.0 | Designed & developed by Tithi Paul</p>
      </footer>
    </div>
  );
};

export default App;
