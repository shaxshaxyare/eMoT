import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DrivingTest, View } from '../../types';
import { Calendar, Filter, Check, X, TestTube2, ArrowLeft } from 'lucide-react';

const mockTests: DrivingTest[] = [
    { id: 'dt-001', applicant: { name: 'Aisha Yusuf', id: 'AY-6543-21', appId: 'APP-DL-002' }, testType: 'Theory', licenseClass: 'C', scheduledTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), status: 'Scheduled', result: null, score: null, examiner: 'John Doe' },
    { id: 'dt-002', applicant: { name: 'Cabdullahi Nuur', id: 'CN-8877-66', appId: 'APP-DL-005' }, testType: 'Practical', licenseClass: 'A', scheduledTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString(), status: 'Scheduled', result: null, score: null, examiner: 'Jane Smith' },
    { id: 'dt-003', applicant: { name: 'Hassan Omar', id: 'HO-1122-33', appId: 'APP-DL-006' }, testType: 'Theory', licenseClass: 'B', scheduledTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), status: 'Scheduled', result: null, score: null, examiner: 'John Doe' },
    { id: 'dt-004', applicant: { name: 'Fatima Ahmed', id: 'FA-5555-44', appId: 'APP-DL-007' }, testType: 'Practical', licenseClass: 'D', scheduledTime: new Date(new Date().getTime() + 28 * 60 * 60 * 1000).toISOString(), status: 'Scheduled', result: null, score: null, examiner: 'me' },
];

const ResultModal: React.FC<{ test: DrivingTest, onClose: () => void, onSave: (testId: string, result: 'Pass' | 'Fail', score: number, notes: string) => void }> = ({ test, onClose, onSave }) => {
    const [result, setResult] = useState<'Pass' | 'Fail'>('Pass');
    const [score, setScore] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        onSave(test.id, result, parseInt(score, 10), notes);
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Record Test Result</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>Applicant: <strong>{test.applicant.name}</strong> ({test.testType} Test)</p>
                    <div>
                        <label className="text-sm font-medium">Result</label>
                        <div className="flex space-x-2 mt-1">
                            <button onClick={() => setResult('Pass')} className={`flex-1 p-2 rounded-lg border-2 ${result === 'Pass' ? 'border-green-500 bg-green-50' : ''}`}>Pass</button>
                            <button onClick={() => setResult('Fail')} className={`flex-1 p-2 rounded-lg border-2 ${result === 'Fail' ? 'border-red-500 bg-red-50' : ''}`}>Fail</button>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Score (%)</label>
                        <input type="number" value={score} onChange={e => setScore(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2" min="0" max="100" />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Examiner Notes</label>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2" rows={3}></textarea>
                    </div>
                </div>
                <div className="p-4 bg-brand-gray-50 border-t flex justify-end">
                    <button onClick={handleSubmit} className="bg-brand-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Save Result</button>
                </div>
            </div>
        </div>
    );
};

interface TestingProps {
    navigate: (view: View) => void;
}

const Testing: React.FC<TestingProps> = ({ navigate }) => {
    const [tests, setTests] = useState(mockTests);
    const [filter, setFilter] = useState('Today');
    const [recordingTest, setRecordingTest] = useState<DrivingTest | null>(null);

    const filteredTests = useMemo(() => {
        const today = new Date();
        return tests.filter(test => {
            const testDate = new Date(test.scheduledTime);
            if (filter === 'Today') {
                return testDate.getDate() === today.getDate() && testDate.getMonth() === today.getMonth() && testDate.getFullYear() === today.getFullYear();
            }
            if (filter === 'This Week') {
                const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                return testDate >= today && testDate <= oneWeekFromNow;
            }
            return true; // 'All'
        }).sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
    }, [tests, filter]);

    const handleSaveResult = (testId: string, result: 'Pass' | 'Fail', score: number, notes: string) => {
        setTests(prev => prev.map(t => t.id === testId ? { ...t, status: 'Completed', result, score } : t));
        setRecordingTest(null);
    };

    return (
        <>
            {recordingTest && <ResultModal test={recordingTest} onClose={() => setRecordingTest(null)} onSave={handleSaveResult} />}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <button onClick={() => navigate('licensing-applications')} className="p-2 rounded-full hover:bg-brand-gray-100">
                        <ArrowLeft className="w-5 h-5 text-brand-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Testing Schedule</h1>
                        <p className="text-brand-gray-600">Manage and record results for theory and practical driving tests.</p>
                    </div>
                </div>

                <Card>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                            <Filter className="w-5 h-5 text-brand-gray-500" />
                            <button onClick={() => setFilter('Today')} className={`px-3 py-1 rounded-md text-sm ${filter === 'Today' ? 'bg-brand-blue-600 text-white' : 'bg-brand-gray-100'}`}>Today</button>
                            <button onClick={() => setFilter('This Week')} className={`px-3 py-1 rounded-md text-sm ${filter === 'This Week' ? 'bg-brand-blue-600 text-white' : 'bg-brand-gray-100'}`}>This Week</button>
                            <button onClick={() => setFilter('All')} className={`px-3 py-1 rounded-md text-sm ${filter === 'All' ? 'bg-brand-blue-600 text-white' : 'bg-brand-gray-100'}`}>All Scheduled</button>
                        </div>
                        <button className="flex items-center bg-white border border-brand-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-brand-gray-100"><Calendar className="w-4 h-4 mr-1.5"/> Schedule New Test</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Applicant</th>
                                    <th className="px-4 py-3">Test Type</th>
                                    <th className="px-4 py-3">Class</th>
                                    <th className="px-4 py-3">Examiner</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTests.map(test => (
                                    <tr key={test.id} className="border-b">
                                        <td className="px-4 py-3 font-medium">{new Date(test.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                        <td className="px-4 py-3">{test.applicant.name}</td>
                                        <td className="px-4 py-3"><Badge variant={test.testType === 'Theory' ? 'info' : 'warning'}>{test.testType}</Badge></td>
                                        <td className="px-4 py-3">{test.licenseClass}</td>
                                        <td className="px-4 py-3">{test.examiner}</td>
                                        <td className="px-4 py-3">
                                            {test.status === 'Completed' ? (
                                                <Badge variant={test.result === 'Pass' ? 'success' : 'danger'}>{test.result} ({test.score}%)</Badge>
                                            ) : (
                                                <Badge variant="default">{test.status}</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {test.status === 'Scheduled' && (
                                                <button onClick={() => setRecordingTest(test)} className="bg-brand-blue-600 text-white font-semibold py-1 px-3 rounded-md hover:bg-brand-blue-700">Record Result</button>
                                            )}
                                            {test.status === 'Completed' && (
                                                 <button className="bg-white border border-brand-gray-300 font-semibold py-1 px-3 rounded-md hover:bg-brand-gray-100 text-sm">View Details</button>
                                            )}
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

export default Testing;