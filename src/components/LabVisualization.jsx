import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function LabVisualization({ labData }) {
  const [selectedTest, setSelectedTest] = useState('CBC');
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState(null);

  // Sample lab data structure for visualization
  const sampleLabData = {
    CBC: {
      dates: ['Jan 1', 'Feb 15', 'Mar 30', 'May 15'],
      values: {
        'Hemoglobin': [14.2, 13.8, 14.0, 14.5],
        'WBC': [7500, 8200, 7800, 7600],
        'Platelets': [250000, 240000, 260000, 255000]
      },
      referenceRanges: {
        'Hemoglobin': { min: 12, max: 16 },
        'WBC': { min: 4500, max: 11000 },
        'Platelets': { min: 150000, max: 450000 }
      }
    },
    LFT: {
      dates: ['Jan 1', 'Feb 15', 'Mar 30', 'May 15'],
      values: {
        'ALT': [25, 28, 22, 24],
        'AST': [22, 24, 20, 21],
        'Bilirubin': [0.8, 0.9, 0.7, 0.8]
      },
      referenceRanges: {
        'ALT': { min: 7, max: 55 },
        'AST': { min: 8, max: 48 },
        'Bilirubin': { min: 0.1, max: 1.2 }
      }
    },
    RFT: {
      dates: ['Jan 1', 'Feb 15', 'Mar 30', 'May 15'],
      values: {
        'Creatinine': [0.9, 0.85, 0.92, 0.88],
        'BUN': [15, 14, 16, 15],
        'eGFR': [95, 98, 94, 96]
      },
      referenceRanges: {
        'Creatinine': { min: 0.6, max: 1.2 },
        'BUN': { min: 7, max: 20 },
        'eGFR': { min: 90, max: 120 }
      }
    }
  };

  // Use provided lab data or sample data
  const data = labData || sampleLabData;

  useEffect(() => {
    if (data && data[selectedTest]) {
      const testData = data[selectedTest];
      const parameters = Object.keys(testData.values);
      const selectedParameter = parameters[0]; // Default to first parameter
      
      const chartColors = [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ];

      // Create datasets for each parameter
      const datasets = parameters.map((param, index) => {
        return {
          label: param,
          data: testData.values[param],
          borderColor: chartColors[index % chartColors.length],
          backgroundColor: chartColors[index % chartColors.length].replace('0.8', '0.2'),
          borderWidth: 2,
          tension: 0.3
        };
      });

      setChartData({
        labels: testData.dates,
        datasets
      });
    }
  }, [selectedTest, data]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedTest} Trends Over Time`,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const referenceRange = data[selectedTest].referenceRanges[label];
            
            let result = `${label}: ${value}`;
            if (referenceRange) {
              result += ` (Ref: ${referenceRange.min}-${referenceRange.max})`;
            }
            return result;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  return (
    <Card className="bg-white p-6 rounded-2xl shadow-md my-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">Lab Results Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(data).map(test => (
            <Button
              key={test}
              variant={selectedTest === test ? "default" : "outline"}
              onClick={() => setSelectedTest(test)}
              className="text-sm"
            >
              {test}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button
            variant={chartType === 'line' ? "default" : "outline"}
            onClick={() => setChartType('line')}
            className="text-sm"
          >
            Line Chart
          </Button>
          <Button
            variant={chartType === 'bar' ? "default" : "outline"}
            onClick={() => setChartType('bar')}
            className="text-sm"
          >
            Bar Chart
          </Button>
        </div>
        
        <div className="h-80 w-full">
          {chartData && (
            chartType === 'line' ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )
          )}
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Reference Ranges</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data[selectedTest] && Object.keys(data[selectedTest].values).map(param => {
                  const values = data[selectedTest].values[param];
                  const latestValue = values[values.length - 1];
                  const range = data[selectedTest].referenceRanges[param];
                  
                  let status = "Normal";
                  let statusColor = "text-green-600";
                  
                  if (range) {
                    if (latestValue < range.min) {
                      status = "Low";
                      statusColor = "text-amber-600";
                    } else if (latestValue > range.max) {
                      status = "High";
                      statusColor = "text-red-600";
                    }
                  }
                  
                  return (
                    <tr key={param}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{param}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {range ? `${range.min} - ${range.max}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{latestValue}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${statusColor}`}>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LabVisualization;
