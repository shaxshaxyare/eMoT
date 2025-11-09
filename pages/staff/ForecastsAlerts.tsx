import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { WeatherForecast, View } from '../../types';
import { ArrowLeft, Plus, X, Edit, Send } from 'lucide-react';

const mockForecasts: WeatherForecast[] = [
    { id: 'FC-001', date: '2025-11-23', title: 'Clear Skies and Moderate Winds', summary: 'Expect sunny conditions throughout the day with north-easterly winds...', issuedBy: 'Staff A', status: 'Published' },
    { id: 'FC-002', date: '2025-11-24', title: 'Chance of Afternoon Showers', summary: 'Increased humidity may lead to isolated showers in coastal areas...', issuedBy: 'Staff B', status: 'Draft' },
    { id: 'AL-001', date: '2025-11-20', title: 'High Wind Warning', summary: 'Strong gusts expected, potentially reaching 40 km/h. Secure loose objects.', issuedBy: 'Staff A', status: 'Archived', severity: 'High' },
];

const ForecastModal: React.FC<{ forecast: WeatherForecast | null, onClose: () => void, onSave: (forecast: WeatherForecast) => void }> = ({ forecast, onClose, onSave }) => {
    const [current, setCurrent] = useState<WeatherForecast>(forecast || { id: `FC-${Date.now()}`, date: new Date().toISOString().split('T')[0], title: '', summary: '', issuedBy: 'me', status: 'Draft' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCurrent(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{forecast ? 'Edit' : 'Create'} Forecast/Alert</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <input name="title" value={current.title} onChange={handleChange} placeholder="Title (e.g., Clear Skies)" className="w-full border p-2 rounded" />
                    <textarea name="summary" value={current.summary} onChange={handleChange} placeholder="Summary..." className="w-full border p-2 rounded" rows={5}></textarea>
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-end">
                    <button onClick={() => onSave(current)} className="bg-brand-blue-600 text-white px-4 py-2 rounded-lg">Save Draft</button>
                </div>
            </div>
        </div>
    );
}

interface ForecastsAlertsProps {
    navigate: (view: View) => void;
}

const ForecastsAlerts: React.FC<ForecastsAlertsProps> = ({ navigate }) => {
    const [forecasts, setForecasts] = useState(mockForecasts);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<WeatherForecast | null>(null);

    const handleSave = (forecast: WeatherForecast) => {
        if (forecasts.find(f => f.id === forecast.id)) {
            setForecasts(forecasts.map(f => f.id === forecast.id ? forecast : f));
        } else {
            setForecasts([forecast, ...forecasts]);
        }
        setModalOpen(false);
        setEditing(null);
    };

    return (
        <>
        {isModalOpen && <ForecastModal forecast={editing} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} />}
        <div className="space-y-6">
            <div className="flex items-center space-x-3">
                <button onClick={() => navigate('data-entry')} className="p-2 rounded-full hover:bg-brand-gray-100">
                    <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Forecasts & Alerts</h1>
                    <p className="text-brand-gray-600">Prepare, approve, and publish forecasts.</p>
                </div>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Forecasts List</h2>
                    <button onClick={() => setModalOpen(true)} className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Plus size={16} className="mr-2"/> Create New</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forecasts.map(f => (
                                <tr key={f.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{f.title}</td>
                                    <td className="px-4 py-3">{f.date}</td>
                                    <td className="px-4 py-3"><Badge variant={f.status === 'Published' ? 'success' : 'default'}>{f.status}</Badge></td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        {f.status === 'Draft' && <button className="p-1.5 rounded-md hover:bg-brand-gray-100" title="Publish"><Send size={16} className="text-green-600"/></button>}
                                        <button onClick={() => { setEditing(f); setModalOpen(true); }} className="p-1.5 rounded-md hover:bg-brand-gray-100" title="Edit"><Edit size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
        </>
    );
};

export default ForecastsAlerts;