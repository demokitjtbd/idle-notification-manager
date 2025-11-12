import React, { useState } from 'react';
import { FollowUp, Channel, ActionType, Subject } from './types';
import FollowUpList from './components/FollowUpList';
import CreateFollowUp from './components/CreateFollowUp';

const initialFollowUps: FollowUp[] = [
  {
    id: '1',
    name: 'Follow Up 10',
    subject: Subject.CustomerCombined,
    duration: 10,
    maxRecurring: 3,
    actionType: ActionType.Webhook,
    actionDetails: {
      url: 'https://webhook.site/8f876f03-f542-4b49-b2f9-0bef6aed9f8a'
    },
    channels: [Channel.Glasius, Channel.Playground],
    isActive: true,
  },
];

const App: React.FC = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [editingFollowUp, setEditingFollowUp] = useState<FollowUp | null>(null);

  const handleCreateNew = () => {
    setEditingFollowUp(null);
    setCurrentView('form');
  };

  const handleEdit = (followUp: FollowUp) => {
    setEditingFollowUp(followUp);
    setCurrentView('form');
  };

  const handleSave = (followUp: FollowUp) => {
    if (editingFollowUp) {
      setFollowUps(followUps.map(f => f.id === followUp.id ? followUp : f));
    } else {
      setFollowUps([...followUps, { ...followUp, id: Date.now().toString() }]);
    }
    setCurrentView('list');
    setEditingFollowUp(null);
  };
  
  const handleCancel = () => {
    setCurrentView('list');
    setEditingFollowUp(null);
  };

  const handleDelete = (id: string) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    setFollowUps(followUps.map(f => f.id === id ? { ...f, isActive } : f));
  };

  return (
    <div className="min-h-screen">
      <main className="p-8">
        {currentView === 'list' ? (
          <FollowUpList
            followUps={followUps}
            onCreateNew={handleCreateNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggleActive}
          />
        ) : (
          <CreateFollowUp
            onSave={handleSave}
            onCancel={handleCancel}
            initialData={editingFollowUp}
          />
        )}
      </main>
    </div>
  );
};

export default App;