import React, { useState, useEffect, useRef } from 'react';
import { DocumentTemplate, TemplateElement } from '../../types';
import { Card } from '../ui/Card';
import { Plus, Save, Trash2, Type, Image as ImageIcon, Hash, Upload, PenTool, Stamp, QrCode, AlignLeft, AlignCenter, AlignRight, Eye, EyeOff } from 'lucide-react';

// --- TYPES & CONSTANTS ---
type ElementType = 'text' | 'field' | 'logo' | 'signature' | 'stamp' | 'qrcode';
const SNAP_THRESHOLD = 5;

// --- HELPER & SUB-COMPONENTS ---
const DraggableResizableBox: React.FC<{
    element: TemplateElement;
    isSelected: boolean;
    onMouseDown: (e: React.MouseEvent, elementId: string) => void;
    isPreview: boolean;
}> = ({ element, isSelected, onMouseDown, isPreview }) => {
    
    const style: React.CSSProperties = {
        position: 'absolute',
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.width}px`,
        height: `${element.height}px`,
        fontFamily: element.fontFamily,
        fontSize: `${element.fontSize}px`,
        fontWeight: element.fontWeight,
        color: element.color,
        cursor: isPreview ? 'default' : 'move',
        userSelect: 'none',
    };

    const renderContent = () => {
        switch (element.type) {
            case 'logo': return <img src={element.content} alt="logo" className="w-full h-full object-contain pointer-events-none" />;
            case 'signature': return <div style={{ fontFamily: 'cursive', fontSize: '1.5em', borderBottom: '2px solid #333' }} className="w-full h-full flex items-center justify-center pointer-events-none">{element.content}</div>;
            case 'stamp': return <div className="w-full h-full rounded-full border-4 font-bold flex items-center justify-center text-center text-sm pointer-events-none" style={{color: element.color, borderColor: element.color}}>{element.content}</div>;
            case 'qrcode': return <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-1 pointer-events-none"><QrCode className="w-full h-full text-gray-600" /></div>;
            default: return element.content;
        }
    };

    const outlineClass = isPreview
        ? 'outline-none'
        : isSelected 
        ? 'outline-2 outline-dashed outline-brand-blue-500 bg-brand-blue-50/50' 
        : 'outline-1 outline-transparent hover:outline-gray-300 hover:outline-dashed';

    const alignmentClass = {
        left: 'justify-start text-left',
        center: 'justify-center text-center',
        right: 'justify-end text-right',
    }[element.textAlign || 'left'];

    return (
        <div
            style={style}
            onMouseDown={(e) => onMouseDown(e, element.id)}
            className={`p-1 flex items-center ${alignmentClass} ${outlineClass}`}
        >
            {renderContent()}
        </div>
    );
};

const PropertyInput: React.FC<{ label: string, name: string, value: any, onChange: (e: any) => void, type?: string, as?: 'input' | 'textarea' }> = ({ label, name, value, onChange, type = 'text', as = 'input' }) => {
    const commonProps = { name, value, onChange, className: "mt-1 w-full border border-brand-gray-300 rounded-md px-2 py-1 text-xs" };
    return (
        <div>
            <label className="text-xs font-medium">{label}</label>
            {as === 'textarea' ? <textarea {...commonProps} rows={3} /> : <input type={type} {...commonProps} />}
        </div>
    );
};

const ElementPropertiesPanel: React.FC<{ element: TemplateElement; onUpdate: (id: string, updates: Partial<TemplateElement>) => void; onDelete: (id: string) => void; }> = ({ element, onUpdate, onDelete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumeric = ['x', 'y', 'width', 'height', 'fontSize'].includes(name);
        onUpdate(element.id, { [name]: isNumeric ? parseFloat(value) || 0 : value });
    };
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target && typeof loadEvent.target.result === 'string') {
                    onUpdate(element.id, { content: loadEvent.target.result });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <>
            <h4 className="font-bold text-sm uppercase text-brand-gray-500">Element Properties</h4>
            {element.type === 'logo' ? (
                <div>
                    <label className="text-xs font-medium">Logo Image</label>
                    <button onClick={() => fileInputRef.current?.click()} className="mt-1 w-full flex items-center justify-center px-3 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100 text-sm"><Upload className="w-4 h-4 mr-2"/>Upload Logo</button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </div>
            ) : (element.type === 'text' || element.type === 'field') ? (
                <PropertyInput label="Content" name="content" value={element.content} onChange={handleChange} as="textarea" />
            ) : null}
            <div className="grid grid-cols-2 gap-2"><PropertyInput label="X" name="x" type="number" value={element.x} onChange={handleChange} /><PropertyInput label="Y" name="y" type="number" value={element.y} onChange={handleChange} /><PropertyInput label="Width" name="width" type="number" value={element.width} onChange={handleChange} /><PropertyInput label="Height" name="height" type="number" value={element.height} onChange={handleChange} /></div>
            {(element.type !== 'logo' && element.type !== 'qrcode' && element.type !== 'stamp') && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t"><PropertyInput label="Font Size" name="fontSize" type="number" value={element.fontSize} onChange={handleChange} /><PropertyInput label="Color" name="color" type="color" value={element.color} onChange={handleChange} /><div><label className="text-xs font-medium">Weight</label><select name="fontWeight" value={element.fontWeight} onChange={handleChange} className="mt-1 w-full border border-brand-gray-300 rounded-md px-2 py-1 text-xs bg-white"><option value="normal">Normal</option><option value="bold">Bold</option></select></div></div>
            )}
            {(element.type === 'text' || element.type === 'field') && (
                <div className="col-span-2 pt-2 border-t"><label className="text-xs font-medium">Alignment</label><div className="flex items-center space-x-1 mt-1"><button onClick={() => onUpdate(element.id, { textAlign: 'left' })} className={`p-1 rounded ${element.textAlign === 'left' || !element.textAlign ? 'bg-brand-blue-100 text-brand-blue-700' : 'hover:bg-brand-gray-100'}`}><AlignLeft size={16}/></button><button onClick={() => onUpdate(element.id, { textAlign: 'center' })} className={`p-1 rounded ${element.textAlign === 'center' ? 'bg-brand-blue-100 text-brand-blue-700' : 'hover:bg-brand-gray-100'}`}><AlignCenter size={16}/></button><button onClick={() => onUpdate(element.id, { textAlign: 'right' })} className={`p-1 rounded ${element.textAlign === 'right' ? 'bg-brand-blue-100 text-brand-blue-700' : 'hover:bg-brand-gray-100'}`}><AlignRight size={16}/></button></div></div>
            )}
            {element.type === 'stamp' && (<div className="pt-2 border-t"><PropertyInput label="Color" name="color" type="color" value={element.color} onChange={handleChange} /></div>)}
            <button onClick={() => onDelete(element.id)} className="w-full mt-4 text-sm text-red-600 hover:underline flex items-center justify-center"><Trash2 className="w-4 h-4 mr-1"/> Delete Element</button>
        </>
    );
};

const CanvasPanel: React.FC<{ onAddElement: (type: ElementType) => void; onSetOrientation: (o: 'portrait' | 'landscape') => void; currentOrientation: 'portrait' | 'landscape'; onUploadDesign: (e: React.ChangeEvent<HTMLInputElement>) => void; onSetOpacity: (val: number) => void; opacity: number; }> = ({ onAddElement, onSetOrientation, currentOrientation, onUploadDesign, onSetOpacity, opacity }) => (
    <>
        <h4 className="font-bold text-sm uppercase text-brand-gray-500">Canvas Settings</h4>
        <div>
            <label className="text-xs font-medium">Orientation</label>
            <select value={currentOrientation} onChange={e => onSetOrientation(e.target.value as any)} className="mt-1 text-xs px-3 py-1.5 w-full bg-white border rounded-md hover:bg-brand-gray-100">
                <option value="portrait">Portrait</option><option value="landscape">Landscape</option>
            </select>
        </div>
        <div>
            <label className="text-xs font-medium">Background Design</label>
            <label className="mt-1 w-full flex items-center justify-center px-3 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100 cursor-pointer text-sm"><Upload className="w-4 h-4 mr-2"/>Upload Design<input type="file" accept="image/*" className="hidden" onChange={onUploadDesign} /></label>
        </div>
         <div>
            <label className="text-xs font-medium">Design Opacity</label>
            <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={e => onSetOpacity(parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1" />
        </div>
        <div className="pt-2 border-t">
             <h4 className="font-bold text-sm uppercase text-brand-gray-500 mt-2">Add Elements</h4>
             <div className="grid grid-cols-2 gap-2 mt-2">
                <button onClick={() => onAddElement('text')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><Type className="w-4 h-4 mr-2"/>Text</button>
                <button onClick={() => onAddElement('field')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><Hash className="w-4 h-4 mr-2"/>Data Field</button>
                <button onClick={() => onAddElement('logo')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><ImageIcon className="w-4 h-4 mr-2"/>Logo</button>
                <button onClick={() => onAddElement('signature')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><PenTool className="w-4 h-4 mr-2"/>Signature</button>
                <button onClick={() => onAddElement('stamp')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><Stamp className="w-4 h-4 mr-2"/>Stamp</button>
                <button onClick={() => onAddElement('qrcode')} className="flex items-center text-xs px-2 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100"><QrCode className="w-4 h-4 mr-2"/>QR Code</button>
            </div>
        </div>
    </>
);

const MultiSelectPanel: React.FC<{ count: number; }> = ({ count }) => (
    <>
        <h4 className="font-bold text-sm uppercase text-brand-gray-500">Multiple Selection</h4>
        <div className="p-4 bg-brand-blue-50 rounded-lg text-center">
            <p className="font-bold text-lg">{count}</p>
            <p className="text-sm">elements selected</p>
        </div>
        <p className="text-xs text-brand-gray-500">Drag to move all selected elements. Properties can be edited one at a time.</p>
    </>
);


// --- MAIN COMPONENT ---
interface TemplateEditorProps { templates: DocumentTemplate[]; onTemplatesChange: (newTemplates: DocumentTemplate[]) => void; }

const TemplateEditor: React.FC<TemplateEditorProps> = ({ templates, onTemplatesChange }) => {
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [editingTemplate, setEditingTemplate] = useState<DocumentTemplate | null>(null);
    const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [snapLines, setSnapLines] = useState<{ x?: number, y?: number, width?: number, height?: number }[]>([]);

    const [dragState, setDragState] = useState<{ startX: number; startY: number; elementStartPositions: Map<string, { x: number, y: number }> } | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!selectedTemplateId) { setEditingTemplate(null); return; }
        if (selectedTemplateId === 'new') {
            setEditingTemplate({ id: `TPL-${Date.now()}`, name: 'New Untitled Template', category: 'Official', page: { width: 595, height: 842, backgroundOpacity: 0.15 }, elements: [] });
        } else {
            setEditingTemplate(JSON.parse(JSON.stringify(templates.find(t => t.id === selectedTemplateId) || null)));
        }
        setSelectedElementIds([]);
    }, [selectedTemplateId, templates]);

    const updateEditingTemplate = (updates: Partial<DocumentTemplate> | ((prev: DocumentTemplate) => DocumentTemplate)) => {
        setEditingTemplate(prev => {
            if (!prev) return null;
            return typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
        });
    };
    
    const addElement = (type: ElementType) => {
        if (!editingTemplate) return;
        const newElement: TemplateElement = { id: `el-${Date.now()}`, type, x: 20, y: 20, fontSize: 12, fontWeight: 'normal', fontFamily: 'sans-serif', color: '#000000', textAlign: 'left', ...{
            text: { content: 'New Text', width: 150, height: 20 },
            field: { content: '{{FieldName}}', width: 150, height: 20 },
            logo: { content: 'https://i.imgur.com/gE2gV5a.png', width: 60, height: 60 },
            signature: { content: 'e-Signature', width: 120, height: 40, fontFamily: 'cursive' },
            stamp: { content: 'OFFICIAL', width: 80, height: 80, color: '#D9534F' },
            qrcode: { content: 'qrcode-placeholder', width: 80, height: 80 },
        }[type]};
        updateEditingTemplate(prev => ({...prev, elements: [...prev.elements, newElement]}));
    };

    const deleteElement = (id: string) => {
        updateEditingTemplate(prev => ({ ...prev, elements: prev.elements.filter(el => el.id !== id) }));
        setSelectedElementIds(prev => prev.filter(elId => elId !== id));
    };
    
    const handleSave = () => {
        if (!editingTemplate || !editingTemplate.name) return;
        const newTemplates = templates.some(t => t.id === editingTemplate.id) 
            ? templates.map(t => t.id === editingTemplate.id ? editingTemplate : t)
            : [...templates, editingTemplate];
        onTemplatesChange(newTemplates);
        alert("Template saved!");
    };
    
    const handleDeleteTemplate = () => {
        if (!editingTemplate || !window.confirm(`Delete "${editingTemplate.name}"?`)) return;
        onTemplatesChange(templates.filter(t => t.id !== editingTemplate.id));
        setSelectedTemplateId(null);
    };
    
    // --- Event Handlers for Canvas Interaction ---
    const handleCanvasMouseDown = (e: React.MouseEvent) => { if (e.target === canvasRef.current) setSelectedElementIds([]); };

    const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
        e.stopPropagation();
        
        let newSelectedIds = [...selectedElementIds];
        if (e.shiftKey) {
            newSelectedIds = newSelectedIds.includes(elementId) ? newSelectedIds.filter(id => id !== elementId) : [...newSelectedIds, elementId];
        } else if (!newSelectedIds.includes(elementId)) {
            newSelectedIds = [elementId];
        }
        setSelectedElementIds(newSelectedIds);
        
        const elementStartPositions = new Map();
        editingTemplate?.elements.forEach(el => {
            if (newSelectedIds.includes(el.id)) {
                elementStartPositions.set(el.id, { x: el.x, y: el.y });
            }
        });

        setDragState({ startX: e.clientX, startY: e.clientY, elementStartPositions });
    };

    const handleCanvasMouseMove = (e: React.MouseEvent) => {
        if (!dragState || !editingTemplate) return;
        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;

        const newElements = [...editingTemplate.elements];
        const activeSnapLines: typeof snapLines = [];

        const primaryDraggedId = Array.from(dragState.elementStartPositions.keys())[0];
        const primaryElement = newElements.find(el => el.id === primaryDraggedId);
        if (!primaryElement) return;
        
        const startPos = dragState.elementStartPositions.get(primaryDraggedId)!;
        let currentX = startPos.x + dx;
        let currentY = startPos.y + dy;
        
        const staticElements = editingTemplate.elements.filter(el => !dragState.elementStartPositions.has(el.id));
        
        for (const staticEl of staticElements) {
            // X-axis snapping
            const checksX = [staticEl.x, staticEl.x + staticEl.width / 2, staticEl.x + staticEl.width];
            const draggedChecksX = [currentX, currentX + primaryElement.width / 2, currentX + primaryElement.width];
            for (let i = 0; i < 3; i++) {
                if (Math.abs(draggedChecksX[i] - checksX[i]) < SNAP_THRESHOLD) {
                    currentX += checksX[i] - draggedChecksX[i];
                    activeSnapLines.push({ x: checksX[i], y: Math.min(primaryElement.y, staticEl.y), height: Math.max(primaryElement.y + primaryElement.height, staticEl.y + staticEl.height) - Math.min(primaryElement.y, staticEl.y) });
                }
            }
            // Y-axis snapping
            const checksY = [staticEl.y, staticEl.y + staticEl.height / 2, staticEl.y + staticEl.height];
            const draggedChecksY = [currentY, currentY + primaryElement.height / 2, currentY + primaryElement.height];
             for (let i = 0; i < 3; i++) {
                if (Math.abs(draggedChecksY[i] - checksY[i]) < SNAP_THRESHOLD) {
                    currentY += checksY[i] - draggedChecksY[i];
                    activeSnapLines.push({ y: checksY[i], x: Math.min(primaryElement.x, staticEl.x), width: Math.max(primaryElement.x + primaryElement.width, staticEl.x + staticEl.width) - Math.min(primaryElement.x, staticEl.x) });
                }
            }
        }
        setSnapLines(activeSnapLines);

        const finalDx = currentX - startPos.x;
        const finalDy = currentY - startPos.y;

        dragState.elementStartPositions.forEach((originalPos, id) => {
            const index = newElements.findIndex(el => el.id === id);
            if (index !== -1) {
                newElements[index] = { ...newElements[index], x: originalPos.x + finalDx, y: originalPos.y + finalDy };
            }
        });
        updateEditingTemplate({ elements: newElements });
    };
    
    const handleCanvasMouseUp = () => { setDragState(null); setSnapLines([]); };

    // --- Panel Render Logic ---
    const renderPropertiesPanel = () => {
        const selectedElements = editingTemplate?.elements.filter(el => selectedElementIds.includes(el.id)) || [];
        if (selectedElements.length === 1) return <ElementPropertiesPanel element={selectedElements[0]} onUpdate={(id, updates) => updateEditingTemplate(prev => ({...prev, elements: prev.elements.map(el => el.id === id ? {...el, ...updates} : el)}))} onDelete={deleteElement} />;
        if (selectedElements.length > 1) return <MultiSelectPanel count={selectedElements.length} />;

        const orientation = (editingTemplate?.page.height ?? 0) >= (editingTemplate?.page.width ?? 0) ? 'portrait' : 'landscape';
        return <CanvasPanel 
            onAddElement={addElement}
            onSetOrientation={(o) => updateEditingTemplate(prev => ({...prev, page: {...prev.page, width: o === 'portrait' ? 595 : 842, height: o === 'portrait' ? 842 : 595 } }))}
            currentOrientation={orientation}
            onUploadDesign={(e) => {
                if (e.target.files?.[0]) {
                    const reader = new FileReader();
                    reader.onload = (loadEvent) => updateEditingTemplate(prev => ({...prev, page: {...prev.page, backgroundImage: loadEvent.target?.result as string }}));
                    reader.readAsDataURL(e.target.files[0]);
                }
            }}
            onSetOpacity={(val) => updateEditingTemplate(prev => ({...prev, page: {...prev.page, backgroundOpacity: val }}))}
            opacity={editingTemplate?.page.backgroundOpacity ?? 0.15}
        />;
    };
    
    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[75vh]">
                <div className="md:col-span-1 border-r pr-6"><h3 className="text-lg font-semibold mb-4">Templates</h3><button onClick={() => setSelectedTemplateId('new')} className="w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium hover:bg-brand-gray-50"><Plus className="w-4 h-4 mr-2"/>Create New</button><ul className="mt-4 space-y-1">{templates.map(t => (<li key={t.id}><button onClick={() => setSelectedTemplateId(t.id)} className={`w-full text-left p-2 rounded-md text-sm ${selectedTemplateId === t.id ? 'bg-brand-blue-100 font-semibold' : 'hover:bg-brand-gray-100'}`}>{t.name}</button></li>))}</ul></div>
                <div className="md:col-span-3">
                    {editingTemplate ? (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-4"><input type="text" value={editingTemplate.name} onChange={e => updateEditingTemplate({ name: e.target.value })} className="font-bold text-xl border-b-2 border-transparent focus:border-brand-blue-500 outline-none bg-transparent" /><div className="flex items-center space-x-2"><button onClick={() => setIsPreviewMode(!isPreviewMode)} className="flex items-center text-sm px-3 py-1.5 bg-white border rounded-md hover:bg-brand-gray-100">{isPreviewMode ? <EyeOff size={16} className="mr-2"/> : <Eye size={16} className="mr-2"/>} {isPreviewMode ? 'Exit Preview' : 'Preview'}</button><button onClick={handleDeleteTemplate} className="text-red-600 p-2 rounded-md hover:bg-red-50"><Trash2 className="w-4 h-4"/></button><button onClick={handleSave} className="bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center"><Save className="w-4 h-4 mr-2"/>Save</button></div></div>
                            <div 
                                className="flex-grow mt-4 flex border rounded-lg bg-brand-gray-100 p-4"
                                onMouseMove={handleCanvasMouseMove}
                                onMouseUp={handleCanvasMouseUp}
                                onMouseLeave={handleCanvasMouseUp}
                            >
                                <div 
                                    className="flex-grow h-full overflow-auto"
                                >
                                    <div 
                                        ref={canvasRef}
                                        onMouseDown={handleCanvasMouseDown}
                                        className="bg-white shadow-md relative mx-auto" 
                                        style={{ width: `${editingTemplate.page.width}px`, height: `${editingTemplate.page.height}px`}}
                                    >
                                        {editingTemplate.page.backgroundImage && <div style={{position: 'absolute', inset: 0, backgroundImage: `url(${editingTemplate.page.backgroundImage})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: editingTemplate.page.backgroundOpacity, zIndex: 0}} />}
                                        {editingTemplate.elements.map(el => <DraggableResizableBox key={el.id} element={el} isSelected={selectedElementIds.includes(el.id)} onMouseDown={handleElementMouseDown} isPreview={isPreviewMode} />)}
                                        {snapLines.map((line, i) => (
                                            <div key={i} className="bg-pink-500" style={{ position: 'absolute', ...(line.x !== undefined ? { left: line.x, top: line.y, width: 1, height: line.height } : { top: line.y, left: line.x, height: 1, width: line.width }) }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="w-72 bg-white border-l p-4 space-y-4 overflow-y-auto shrink-0 ml-4 rounded-md">{renderPropertiesPanel()}</div>
                            </div>
                        </div>
                    ) : <div className="flex items-center justify-center h-full bg-brand-gray-50 rounded-lg"><p>Select or create a template to begin.</p></div>}
                </div>
            </div>
        </Card>
    );
};

export default TemplateEditor;