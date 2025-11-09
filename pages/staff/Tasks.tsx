import React, { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Search, Filter, User, Clock, FileCheck, AlertTriangle, X, FileDown, Briefcase } from 'lucide-react';
import { Task } from '../../types';

// Mock data for tasks
const initialTasks: Task[] = [
  { id: 'task-1', applicantName: 'Axmed Cumar', service: 'Vehicle Registration', submittedDate: '2025-11-20', dueDate: '2025-11-25', status: 'in-progress', assignee: 'me', nextStep: 'Verify Documents' },
  { id: 'task-2', applicantName: 'Farhiya Jaamac', service: 'Driver License Renewal', submittedDate: '2025-11-19', dueDate: '2025-11-22', status: 'in-progress', assignee: 'me', nextStep: 'Check Medicals' },
  { id: 'task-3', applicantName: 'Cabdi Ismaaciil', service: 'Ownership Transfer', submittedDate: '2025-11-15', dueDate: '2025-11-18', status: 'in-progress', assignee: 'me', nextStep: 'Final Approval' }, // Overdue
  { id: 'task-4', applicantName: 'Xaliimo Aadan', service: 'Vehicle Registration', submittedDate: '2025-11-21', dueDate: '2025-11-28', status: 'available', assignee: 'unassigned', nextStep: 'Initial Review' },
  { id: 'task-5', applicantName: 'Maxamed Faarax', service: 'Plate Replacement', submittedDate: '2025-11-21', dueDate: '2025-11-27', status: 'available', assignee: 'unassigned', nextStep: 'Verify Police Report' },
  { id: 'task-6', applicantName: 'Aisha Yusuf', service: 'Driver License - New', submittedDate: '2025-11-20', dueDate: '2025-12-05', status: 'available', assignee: 'unassigned', nextStep: 'Initial Review' },
  { id: 'task-7', applicantName: 'John Doe', service: 'Vehicle Registration', submittedDate: '2025-11-18', dueDate: '2025-11-25', status: 'in-progress', assignee: 'Jane Smith', nextStep: 'Await Inspection Report' },
  { id: 'task-8', applicantName: 'Peter Jones', service: 'Driver License Renewal', submittedDate: '2025-11-17', dueDate: '2025-11-24', status: 'in-progress', assignee: 'John Doe', nextStep: 'Verify Payment' },
  { id: 'task-9', applicantName: 'Mary Williams', service: 'Ownership Transfer', submittedDate: '2025-10-30', dueDate: '2025-11-05', status: 'completed', assignee: 'me', nextStep: 'Archived' },
  { id: 'task-10', applicantName: 'David Brown', service: 'Vehicle Registration', submittedDate: '2025-10-28', dueDate: '2025-11-03', status: 'completed', assignee: 'me', nextStep: 'Archived' },
];

const teamMembers = ['me', 'Jane Smith', 'John Doe', 'Peter Williams'];

type TaskStatus = 'in-progress' | 'available' | 'team' | 'completed';

interface TasksProps {
    onViewDetails: (task: Task) => void;
}

const isOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Compare dates only, not time
    return new Date(dueDate) < today;
};

const SummaryCard: React.FC<{ title: string; value: number | string; icon: React.ElementType; colorClass: string }> = ({ title, value, icon: Icon, colorClass }) => (
    <Card>
        <div className="flex items-center">
            <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-').replace('600', '100')}`}>
                <Icon className={`w-6 h-6 ${colorClass}`} />
            </div>
            <div className="ml-4">
                <p className="text-sm text-brand-gray-500">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
    </Card>
);

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-md ${active ? 'bg-brand-blue-600 text-white' : 'text-brand-gray-600 hover:bg-brand-gray-100'}`}>
        {children}
    </button>
);

const AssignTaskModal: React.FC<{ task: Task, onClose: () => void, onAssign: (taskId: string, assignee: string) => void }> = ({ task, onClose, onAssign }) => {
    const [assignee, setAssignee] = useState(task.assignee === 'unassigned' ? 'me' : task.assignee);
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Assign Task</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-brand-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>Assigning task for <strong>{task.applicantName}</strong> ({task.service}).</p>
                    <div>
                        <label className="text-sm font-medium">Assign to:</label>
                        <select value={assignee} onChange={e => setAssignee(e.target.value)} className="mt-1 w-full border border-brand-gray-300 rounded-lg p-2 bg-white">
                            {teamMembers.map(member => <option key={member} value={member}>{member}</option>)}
                        </select>
                    </div>
                </div>
                <div className="p-4 bg-brand-gray-50 border-t flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-white border border-brand-gray-300 px-4 py-2 rounded-lg text-sm">Cancel</button>
                    <button onClick={() => { onAssign(task.id, assignee); onClose(); }} className="bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm">Assign</button>
                </div>
            </div>
        </div>
    );
};


const Tasks: React.FC<TasksProps> = ({ onViewDetails }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [currentTab, setCurrentTab] = useState<TaskStatus>('in-progress');
    const [searchTerm, setSearchTerm] = useState('');
    const [assigningTask, setAssigningTask] = useState<Task | null>(null);
    const [serviceFilter, setServiceFilter] = useState('All');

    const handleClaimTask = (taskId: string) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId ? { ...task, status: 'in-progress', assignee: 'me' } : task
        ));
    };

    const handleCompleteTask = (taskId: string) => {
         setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId ? { ...task, status: 'completed' } : task
        ));
    };
    
    const handleAssignTask = (taskId: string, assignee: string) => {
        setTasks(prevTasks => prevTasks.map(task => 
            task.id === taskId ? { ...task, status: assignee === 'unassigned' ? 'available' : 'in-progress', assignee } : task
        ));
    };
    
    const services = useMemo(() => ['All', ...new Set(tasks.map(t => t.service))], [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesTab = (currentTab === 'in-progress' && task.status === 'in-progress' && task.assignee === 'me') ||
                               (currentTab === 'available' && task.status === 'available') ||
                               (currentTab === 'team' && task.status === 'in-progress' && task.assignee !== 'me' && task.assignee !== 'unassigned') ||
                               (currentTab === 'completed');
            
            const matchesSearch = task.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  task.service.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = serviceFilter === 'All' || task.service === serviceFilter;

            return matchesTab && matchesSearch && matchesFilter;
        });
    }, [tasks, currentTab, searchTerm, serviceFilter]);
    
    const myTasksCount = tasks.filter(t => t.status === 'in-progress' && t.assignee === 'me').length;
    const availableTasksCount = tasks.filter(t => t.status === 'available').length;
    const dueTodayCount = tasks.filter(t => new Date(t.dueDate).toDateString() === new Date().toDateString() && t.status === 'in-progress' && t.assignee === 'me').length;
    const overdueCount = tasks.filter(t => isOverdue(t.dueDate) && t.status === 'in-progress' && t.assignee === 'me').length;
    
    const exportToCSV = () => {
        const completedTasks = tasks.filter(t => t.status === 'completed');
        const headers = "Task ID,Applicant,Service,Assignee,Submitted,Due,Next Step\n";
        const csvContent = "data:text/csv;charset=utf-8," + headers + completedTasks.map(t => `${t.id},"${t.applicantName}","${t.service}","${t.assignee}",${t.submittedDate},${t.dueDate},"${t.nextStep}"`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "completed_tasks.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
    <>
        {assigningTask && <AssignTaskModal task={assigningTask} onClose={() => setAssigningTask(null)} onAssign={handleAssignTask} />}
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Tasks</h1>
                <p className="text-brand-gray-600">View, pick, and manage assigned tasks.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard title="My Tasks" value={myTasksCount} icon={User} colorClass="text-blue-600" />
                <SummaryCard title="Available to Claim" value={availableTasksCount} icon={FileCheck} colorClass="text-green-600" />
                <SummaryCard title="Due Today" value={dueTodayCount} icon={Clock} colorClass="text-amber-600" />
                <SummaryCard title="Overdue" value={overdueCount} icon={AlertTriangle} colorClass="text-red-600" />
            </div>
            
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex space-x-2">
                        <TabButton active={currentTab === 'in-progress'} onClick={() => setCurrentTab('in-progress')}>My Tasks</TabButton>
                        <TabButton active={currentTab === 'available'} onClick={() => setCurrentTab('available')}>Available</TabButton>
                        <TabButton active={currentTab === 'team'} onClick={() => setCurrentTab('team')}>Team</TabButton>
                        <TabButton active={currentTab === 'completed'} onClick={() => setCurrentTab('completed')}>Completed</TabButton>
                    </div>
                     <div className="flex items-center space-x-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray-400" />
                            <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-brand-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500" />
                        </div>
                        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="bg-white border border-brand-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-brand-gray-100">
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {currentTab === 'completed' && <button onClick={exportToCSV} className="flex items-center bg-white border border-brand-gray-300 px-3 py-2 rounded-lg text-sm hover:bg-brand-gray-100"><FileDown className="w-4 h-4 mr-1.5"/> Export</button>}
                    </div>
                </div>

                <div className="overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-brand-gray-500 uppercase bg-brand-gray-50">
                            <tr>
                                <th className="px-4 py-3">Applicant</th>
                                <th className="px-4 py-3">Service</th>
                                {currentTab === 'team' && <th className="px-4 py-3">Assignee</th>}
                                {currentTab === 'in-progress' && <th className="px-4 py-3">Next Step</th>}
                                <th className="px-4 py-3">Submitted</th>
                                <th className="px-4 py-3">Due Date</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.length > 0 ? filteredTasks.map(task => (
                                <tr key={task.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">{task.applicantName}</td>
                                    <td className="px-4 py-3">{task.service}</td>
                                    {currentTab === 'team' && <td className="px-4 py-3">{task.assignee}</td>}
                                    {currentTab === 'in-progress' && <td className="px-4 py-3"><Badge variant="default">{task.nextStep}</Badge></td>}
                                    <td className="px-4 py-3 text-brand-gray-600">{task.submittedDate}</td>
                                    <td className="px-4 py-3 text-brand-gray-600">
                                        <div className="flex items-center">
                                            {task.dueDate}
                                            {isOverdue(task.dueDate) && (task.status === 'in-progress' || task.status === 'team') && <Badge variant="danger" className="ml-2">Overdue</Badge>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right space-x-2">
                                        <button onClick={() => onViewDetails(task)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100">Details</button>
                                        {(currentTab === 'available' || currentTab === 'team') && <button onClick={() => setAssigningTask(task)} className="bg-white border border-brand-gray-300 px-3 py-1 rounded-md text-sm hover:bg-brand-gray-100 flex items-center"><Briefcase className="w-3 h-3 mr-1" /> Assign</button>}
                                        {task.status === 'available' && <button onClick={() => handleClaimTask(task.id)} className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700">Claim</button>}
                                        {task.status === 'in-progress' && task.assignee === 'me' && <button onClick={() => handleCompleteTask(task.id)} className="bg-brand-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-brand-blue-700">Complete</button>}
                                        {task.status === 'completed' && <span className="text-xs text-brand-gray-500">Archived</span>}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={currentTab === 'team' || currentTab === 'in-progress' ? 6 : 5} className="text-center p-8 text-brand-gray-500">
                                        No tasks found in this view.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    </>
    );
};

export default Tasks;
