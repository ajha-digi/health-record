"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const BPLineChart = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllRecords = async () => {
            const resp = await axios.get('/api/report');
            const chartData = resp.data.data.map((item) => {
                const date = new Date(item.createdAt).toISOString().slice(0, 10);
                const bpValues = item.bp.split('/');
                return [date, { v: parseInt(bpValues[0]), f: item.bp}, parseInt(item.pulse),  parseFloat(item.weight) ];
              });
              
              chartData.unshift(['Date', 'Pressure', 'Pulse', 'Weight']);
              setData(chartData.slice(0, 10))
        }
        getAllRecords();
    }, []);

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'Last 10days BP, Pulse and Weight Report',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
          title: 'Date',
          format: 'MMM d, yyyy',
          titleTextStyle: { color: '#333' },
        },
        vAxis: {
          title: 'Bp/ Pulse/ Weight',
          format: '#/#', // Format to display both systolic and diastolic values
        },
        tooltip: {
          isHtml: true,
          // Customize tooltip content to display both systolic and diastolic values on hover
          // Use the formatted value (f) from the data array
          // and display it with a line break between systolic and diastolic values
          // Note that the {v: systolic, f: 'systolic/diastolic'} syntax is used to display formatted values in tooltip
          // You can customize this tooltip content to suit your needs
          formatter: function (tooltipItem) {
            const dataValue = tooltipItem.getValue();
            const dataFormatted = tooltipItem.getFormattedValue();
            const dataDate = tooltipItem.getXValue();
            return `
              <div style="padding: 10px;">
                <div>Date: ${dataDate}</div>
                <div>Systolic/Diastolic: ${dataFormatted}</div>
              </div>
            `;
          },
        },
        colors: ['#b0120a', '#f1c40f', '#27ae60'],
      }}
    />
  );
  
}

export default BPLineChart;

