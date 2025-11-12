import React, { useState } from 'react';
import { FollowUp, Channel } from '../types';
import { ChannelIcon, TrashIcon, ChevronLeftIcon } from './Icons';

interface FollowUpListProps {
  followUps: FollowUp[];
  onCreateNew: () => void;
  onEdit: (followUp: FollowUp) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, isActive: boolean) => void;
}

const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      className={`${
        checked ? 'bg-primary' : 'bg-input'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

const FollowUpList: React.FC<FollowUpListProps> = ({
  followUps,
  onCreateNew,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const [isFeatureActive, setIsFeatureActive] = useState(true);

  return (
    <div className="bg-card p-6 rounded-lg border">
      <a href="#" className="text-sm text-muted-foreground mb-4 flex items-center hover:text-primary">
        <ChevronLeftIcon className="w-4 h-4 mr-1" />
        Back To Your Installed Apps
      </a>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">Idle Notification</h1>
          <p className="text-muted-foreground mt-1">
            Manage your idle configurations to optimize your workflow
          </p>
        </div>
        <ToggleSwitch checked={isFeatureActive} onChange={setIsFeatureActive} />
      </div>
      <div className="bg-secondary border-l-4 border-primary/50 text-secondary-foreground p-4 rounded-md mb-6">
        <p>
          This add-on continuously monitors both agent or customer activity during conversations. When it detects inactivity—whether from the agent or the customer—it automatically triggers predefined actions, such as sending reminders, escalating the chat, or gracefully ending the session. The goal is to prevent stalled conversations, improve response times, and maintain a seamless user experience.
        </p>
      </div>
      <button
        onClick={onCreateNew}
        className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors mb-6 h-10"
      >
        Create New
      </button>
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Max Recurring</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Channels</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {followUps.map(followUp => (
              <tr key={followUp.id} className="hover:bg-muted/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline cursor-pointer" onClick={() => onEdit(followUp)}>{followUp.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{followUp.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{followUp.duration} minutes</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{followUp.maxRecurring} times</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{followUp.actionType}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  <div className="flex flex-wrap items-center gap-2">
                    {followUp.channels.map(channel => (
                      <div key={channel} className="flex items-center gap-1.5 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
                        <ChannelIcon channel={channel} className="w-4 h-4" />
                        <span>{channel}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-4">
                   <ToggleSwitch checked={followUp.isActive} onChange={(checked) => onToggle(followUp.id, checked)} />
                   <button onClick={() => onDelete(followUp.id)} className="text-muted-foreground hover:text-destructive p-1 rounded-md">
                     <TrashIcon className="w-5 h-5" />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FollowUpList;