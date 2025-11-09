import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Notification } from '../../types';
import { Bell, AlertTriangle, CheckSquare, AtSign, Filter, Eye, Archive } from 'lucide-react';

const mockNotifications: Notification[] = [
    { id: 'n1', type: 'SLA', message: 'SLA breach imminent for application APP-OT-003.', context: 'Cabdi Ismaaciil', timestamp: '2 hours ago', isRead: false },
    { id: 'n2', type: 'New Task', message: 'New Vehicle Registration application ready for verification.', context: 'APP-VR-011', timestamp: '8 hours ago', isRead: false },
    { id: 'n3', type: 'Mention', message: 'Jane Smith mentioned you in a comment on APP-VR-002.', context: 'Xaliimo Aadan', timestamp: '1 day ago', isRead: true },
    { id: 'n4', type: 'Approval', message: 'License Renewal for Farhiya Jaamac is ready for final approval.', context: 'APP-LR-056', timestamp: '2 days ago', isRead: true },
    { id: 'n5', type: 'SLA', message: 'SLA at risk for application APP-VR-010.', context: 'Fatima Ahmed', timestamp: '3 days ago', isRead: true },
];

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    switch (type) {
        case 'SLA': return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case 'New Task': return <CheckSquare className="w-5 h-5 text-blue-500" />;
        case 'Mention': return <AtSign className="w-5 h-5 text-purple-500" />;
        case 'Approval': return <Bell className="w-5 h-5 text-green-500" />;
        default: return <Bell className="w-5 h-5 text-brand-gray-500" />;
    }
};

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filteredNotifications = notifications.filter(n => filter === 'all' || !n.isRead);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-brand-gray-600">System alerts, new tasks, and mentions.</p>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-5 h-5 text-brand-gray-500"/>
                        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-brand-blue-600 text-white' : 'bg-brand-gray-100'}`}>All</button>
                        <button onClick={() => setFilter('unread')} className={`px-3 py-1 rounded-md text-sm font-medium ${filter === 'unread' ? 'bg-brand-blue-600 text-white' : 'bg-brand-gray-100'}`}>Unread</button>
                    </div>
                    <button onClick={markAllAsRead} className="text-sm font-medium text-brand-blue-600 hover:underline">Mark all as read</button>
                </div>

                <ul className="space-y-3">
                    {filteredNotifications.map(n => (
                        <li key={n.id} className={`p-4 rounded-lg flex items-start space-x-4 transition-colors ${!n.isRead ? 'bg-brand-blue-50' : 'bg-white hover:bg-brand-gray-50'}`}>
                            <div className="flex-shrink-0 mt-1"><NotificationIcon type={n.type} /></div>
                            <div className="flex-grow">
                                <p className="font-semibold text-brand-gray-800">{n.message}</p>
                                <p className="text-sm text-brand-gray-500">Context: {n.context}</p>
                                <p className="text-xs text-brand-gray-400 mt-1">{n.timestamp}</p>
                            </div>
                            <div className="flex items-center space-x-2 self-center">
                                <button className="p-2 rounded-md hover:bg-brand-gray-200"><Eye className="w-4 h-4 text-brand-gray-600" /></button>
                                {!n.isRead && <button onClick={() => markAsRead(n.id)} className="p-2 rounded-md hover:bg-brand-gray-200"><Archive className="w-4 h-4 text-brand-gray-600" /></button>}
                            </div>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default Notifications;
