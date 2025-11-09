import React from 'react';
import { View, WeatherDataPoint } from '../../types';
import { Card } from '../../components/ui/Card';
import { Thermometer, Droplets, Wind, CloudRain, Cloud, MessageSquareWarning } from 'lucide-react';

interface DataEntryProps {
    navigate: (view: View) => void;
}

const mockData: WeatherDataPoint[] = [
    { id: 'wdp-001', date: '2025-11-22', temperature: 31, humidity: 65, windSpeed: 15, precipitation: 0, recordedBy: 'Staff A' },
    { id: 'wdp-002', date: '2025-11-21', temperature: 32, humidity: 68, windSpeed: 12, precipitation: 0, recordedBy: 'Staff B' },
    { id: 'wdp-003', date: '2025-11-20', temperature: 29, humidity: 75, windSpeed: 25, precipitation: 5, recordedBy: 'Staff A' },
];

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ElementType }> = ({ title, value, icon: Icon }) => (
    <Card className="flex items-center">
        <Icon className="w-6 h-6 text-brand-blue-600" />
        <div className="ml-4">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-brand-gray-500">{title}</p>
        </div>
    </Card>
);

const DataEntry: React.FC<DataEntryProps> = ({ navigate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meteorology Dashboard</h1>
        <p className="text-brand-gray-600">Enter daily data and manage forecasts and alerts.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Current Temperature" value="31°C" icon={Thermometer} />
          <StatCard title="Humidity" value="65%" icon={Droplets} />
          <StatCard title="Wind Speed" value="15 km/h" icon={Wind} />
          <StatCard title="Active Alerts" value={1} icon={MessageSquareWarning} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <h2 className="text-lg font-semibold mb-4">Daily Data Entry</h2>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Temperature (°C)" />
                <InputField label="Humidity (%)" />
                <InputField label="Wind Speed (km/h)" />
                <InputField label="Precipitation (mm)" />
                <div className="col-span-2">
                    <button className="w-full bg-brand-blue-600 text-white font-semibold py-2 rounded-lg">Submit Data</button>
                </div>
            </div>
        </Card>
        <Card>
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
             <button onClick={() => navigate('forecasts-alerts')} className="w-full bg-amber-50 text-amber-700 p-4 rounded-lg font-medium hover:bg-amber-100 flex items-center justify-between text-left">
                <div>
                    <p className="font-bold">Forecasts & Alerts</p>
                    <p className="text-sm">Create, publish, and manage weather warnings.</p>
                </div>
                <Cloud size={24} />
            </button>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                    <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Temp.</th>
                        <th className="px-4 py-3">Humidity</th>
                        <th className="px-4 py-3">Wind</th>
                        <th className="px-4 py-3">Precipitation</th>
                        <th className="px-4 py-3">Recorded By</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map(d => (
                        <tr key={d.id} className="border-b">
                            <td className="px-4 py-3 font-medium">{d.date}</td>
                            <td className="px-4 py-3">{d.temperature}°C</td>
                            <td className="px-4 py-3">{d.humidity}%</td>
                            <td className="px-4 py-3">{d.windSpeed} km/h</td>
                            <td className="px-4 py-3">{d.precipitation} mm</td>
                            <td className="px-4 py-3">{d.recordedBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};

const InputField: React.FC<{ label: string }> = ({ label }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input type="text" className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2" />
    </div>
);

export default DataEntry;