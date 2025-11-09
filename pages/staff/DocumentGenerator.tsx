import React, { useState } from 'react';
import { View, DocumentTemplate } from '../../types';
import { Card } from '../../components/ui/Card';
import { Edit } from 'lucide-react';
import TemplateEditor from '../../components/staff/TemplateEditor';

const mockTemplates: DocumentTemplate[] = [
    { 
        id: 'TPL-VC-01', 
        name: 'Vehicle Registration Certificate', 
        category: 'Vehicle',
        page: { width: 842, height: 595, backgroundOpacity: 1 }, // A4 Landscape
        elements: [
            // Standard Header
            { id: 'header-en-1', type: 'text', content: 'Federal Republic of Somalia', x: 40, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-en-2', type: 'text', content: 'Galmudug State of Somalia', x: 40, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'left' },
            { id: 'header-en-3', type: 'text', content: 'Ministry of Transportation & Civil Aviation', x: 40, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-logo', type: 'logo', content: 'https://i.imgur.com/gE2gV5a.png', x: 381, y: 20, width: 80, height: 80, fontSize: 12, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#000000' },
            { id: 'header-so-1', type: 'text', content: 'Dowladda Federaalka Soomaaliya', x: 602, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            { id: 'header-so-2', type: 'text', content: 'Dowlad Goboleedka Galmudug', x: 602, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'right' },
            { id: 'header-so-3', type: 'text', content: 'Wasaaradda Gaadiidka iyo Duulista Hawada', x: 602, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            
            // Title
            { id: 'el2', type: 'text', content: 'Vehicle Registration Certificate', x: 0, y: 120, width: 842, height: 24, fontSize: 22, fontWeight: 'bold', fontFamily: 'serif', color: '#1E40AF', textAlign: 'center' },
            
            // Content Fields - Row 1
            { id: 'el4', type: 'text', content: 'Owner Name:', x: 50, y: 200, width: 250, height: 16, fontSize: 12, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6B7280', textAlign: 'left' },
            { id: 'el5', type: 'field', content: '{{Owner Name}}', x: 50, y: 220, width: 250, height: 20, fontSize: 16, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#111827', textAlign: 'left' },
            
            { id: 'el10', type: 'text', content: 'Make & Model:', x: 320, y: 200, width: 250, height: 16, fontSize: 12, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6B7280', textAlign: 'left' },
            { id: 'el11', type: 'field', content: '{{Make/Model}}', x: 320, y: 220, width: 250, height: 20, fontSize: 16, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#111827', textAlign: 'left' },

            { id: 'el6', type: 'text', content: 'Plate Number:', x: 590, y: 200, width: 200, height: 16, fontSize: 12, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6B7280', textAlign: 'left' },
            { id: 'el7', type: 'field', content: '{{Plate Number}}', x: 590, y: 220, width: 200, height: 20, fontSize: 16, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#111827', textAlign: 'left' },

            // Content Fields - Row 2
            { id: 'el8', type: 'text', content: 'Vehicle Identification Number (VIN):', x: 50, y: 270, width: 520, height: 16, fontSize: 12, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6B7280', textAlign: 'left' },
            { id: 'el9', type: 'field', content: '{{VIN}}', x: 50, y: 290, width: 520, height: 20, fontSize: 16, fontWeight: 'normal', fontFamily: 'monospace', color: '#111827', textAlign: 'left' },

            { id: 'el12', type: 'text', content: 'Expiry Date:', x: 590, y: 270, width: 200, height: 16, fontSize: 12, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#6B7280', textAlign: 'left' },
            { id: 'el13', type: 'field', content: '{{Expiry Date}}', x: 590, y: 290, width: 200, height: 20, fontSize: 16, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#111827', textAlign: 'left' },
        ]
    },
    { 
        id: 'TPL-DL-01', 
        name: 'Driver License Card', 
        category: 'License',
        page: { width: 323, height: 204, backgroundOpacity: 1 }, // Card size
        elements: [
            // Standard Header (condensed)
            { id: 'header-en-dl', type: 'text', content: 'Galmudug State - Ministry of Transportation', x: 10, y: 8, width: 120, height: 10, fontSize: 6, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'left' },
            { id: 'header-logo-dl', type: 'logo', content: 'https://i.imgur.com/gE2gV5a.png', x: 141, y: 5, width: 40, height: 40, fontSize: 12, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#000000' },
            { id: 'header-so-dl', type: 'text', content: 'DG Galmudug - Wasaaradda Gaadiidka', x: 193, y: 8, width: 120, height: 10, fontSize: 6, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'right' },
            // Original Content - Shifted Down
            { id: 'dl2', type: 'field', content: '{{Holder Name}}', x: 10, y: 60, width: 200, height: 24, fontSize: 16, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000000', textAlign: 'left' },
            { id: 'dl3', type: 'field', content: '{{License Number}}', x: 10, y: 90, width: 150, height: 16, fontSize: 12, fontWeight: 'normal', fontFamily: 'monospace', color: '#000000', textAlign: 'left' },
        ]
    },
    { 
        id: 'TPL-OT-01', 
        name: 'Ownership Transfer Deed', 
        category: 'Vehicle',
        page: { width: 595, height: 842, backgroundOpacity: 1 },
        elements: [
            // Standard Header
            { id: 'header-en-1', type: 'text', content: 'Federal Republic of Somalia', x: 40, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-en-2', type: 'text', content: 'Galmudug State of Somalia', x: 40, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'left' },
            { id: 'header-en-3', type: 'text', content: 'Ministry of Transportation & Civil Aviation', x: 40, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-logo', type: 'logo', content: 'https://i.imgur.com/gE2gV5a.png', x: 257, y: 20, width: 80, height: 80, fontSize: 12, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#000000' },
            { id: 'header-so-1', type: 'text', content: 'Dowladda Federaalka Soomaaliya', x: 355, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            { id: 'header-so-2', type: 'text', content: 'Dowlad Goboleedka Galmudug', x: 355, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'right' },
            { id: 'header-so-3', type: 'text', content: 'Wasaaradda Gaadiidka iyo Duulista Hawada', x: 355, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            // Title
            { id: 'ot1', type: 'text', content: 'Deed of Ownership Transfer', x: 50, y: 150, width: 500, height: 30, fontSize: 24, fontWeight: 'bold', fontFamily: 'serif', color: '#000000', textAlign: 'center' },
        ]
    },
    { 
        id: 'TPL-OF-01', 
        name: 'Official Ministry Letterhead', 
        category: 'Official',
        page: { width: 595, height: 842, backgroundOpacity: 1 },
        elements: [
             // Standard Header
            { id: 'header-en-1', type: 'text', content: 'Federal Republic of Somalia', x: 40, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-en-2', type: 'text', content: 'Galmudug State of Somalia', x: 40, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'left' },
            { id: 'header-en-3', type: 'text', content: 'Ministry of Transportation & Civil Aviation', x: 40, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'left' },
            { id: 'header-logo', type: 'logo', content: 'https://i.imgur.com/gE2gV5a.png', x: 257, y: 20, width: 80, height: 80, fontSize: 12, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#000000' },
            { id: 'header-so-1', type: 'text', content: 'Dowladda Federaalka Soomaaliya', x: 355, y: 40, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            { id: 'header-so-2', type: 'text', content: 'Dowlad Goboleedka Galmudug', x: 355, y: 55, width: 200, height: 14, fontSize: 10, fontWeight: 'bold', fontFamily: 'sans-serif', color: '#000', textAlign: 'right' },
            { id: 'header-so-3', type: 'text', content: 'Wasaaradda Gaadiidka iyo Duulista Hawada', x: 355, y: 70, width: 200, height: 14, fontSize: 10, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#333', textAlign: 'right' },
            // Title
            { id: 'of1', type: 'text', content: 'Official Communication', x: 50, y: 150, width: 500, height: 30, fontSize: 24, fontWeight: 'bold', fontFamily: 'serif', color: '#000000', textAlign: 'center' },
        ]
    },
];

interface DocumentGeneratorProps {
    navigate: (view: View) => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ navigate }) => {
    const [templates, setTemplates] = useState<DocumentTemplate[]>(mockTemplates);
    const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0]?.id || '');
    const [appId, setAppId] = useState('');
    const [preview, setPreview] = useState(false);
    const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');

    const handleGenerate = () => {
        if (appId && selectedTemplate) {
            setPreview(true);
        }
    };

    const tabClasses = (tabName: 'generate' | 'edit') => 
        `px-3 py-2 font-medium text-sm rounded-md ${
            activeTab === tabName
            ? 'bg-brand-blue-600 text-white'
            : 'text-brand-gray-600 hover:bg-brand-gray-100'
        }`;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Documents & Certificates</h1>
                <p className="text-brand-gray-600">Generate, sign, and manage official documents from templates.</p>
            </div>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <button onClick={() => navigate('e-signatures')} className="bg-brand-blue-50 text-brand-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-brand-blue-100 flex items-center space-x-2"><Edit size={20} /><span>Manage E-Signatures</span></button>
            </Card>

            <div className="flex space-x-2 border-b border-brand-gray-200 pb-2">
                <button onClick={() => setActiveTab('generate')} className={tabClasses('generate')}>
                    Generate Document
                </button>
                <button onClick={() => setActiveTab('edit')} className={tabClasses('edit')}>
                    Template Editor
                </button>
            </div>

            {activeTab === 'generate' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Document Generator</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Select Template</label>
                                <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)} className="mt-1 w-full border border-brand-gray-300 p-2 rounded-lg bg-white">
                                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Enter Application ID</label>
                                <input value={appId} onChange={e => setAppId(e.target.value)} placeholder="e.g., APP-VR-001" className="mt-1 w-full border border-brand-gray-300 p-2 rounded-lg"/>
                            </div>
                            <button onClick={handleGenerate} disabled={!appId || !selectedTemplate} className="w-full bg-brand-blue-600 text-white font-semibold py-2 rounded-lg disabled:bg-brand-gray-400">Generate & Preview</button>
                        </div>
                    </Card>
                    <Card>
                        <h2 className="text-lg font-semibold mb-4">Preview</h2>
                        <div className="h-64 bg-brand-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                            {preview ? <p className="text-brand-gray-700 p-4 text-center">Displaying preview for <strong>{appId}</strong> using template <strong>"{templates.find(t => t.id === selectedTemplate)?.name}"</strong>.</p> : <p className="text-brand-gray-500">Preview will appear here</p>}
                        </div>
                        {preview && (
                            <button className="w-full mt-4 bg-green-600 text-white font-semibold py-2 rounded-lg">Submit for Signature</button>
                        )}
                    </Card>
                </div>
            )}

            {activeTab === 'edit' && (
                <TemplateEditor templates={templates} onTemplatesChange={setTemplates} />
            )}
        </div>
    );
};

export default DocumentGenerator;