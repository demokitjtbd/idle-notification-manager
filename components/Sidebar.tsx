import React from 'react';
// FIX: Removed LifebuoyIcon and UserCircleIcon from the import statement as they are not exported from the Icons module and were unused in the component.
import { HomeIcon, BarChartIcon, InboxIcon, PaperAirplaneIcon, CogIcon, AdjustmentsIcon, LinkIcon, ViewColumnsIcon, UsersIcon, ChatBubbleIcon, BoltIcon, DocumentTextIcon, PowerIcon, QuestionMarkCircleIcon } from './Icons';

interface NavItemProps {
  icon: React.ReactNode;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, active }) => (
  <button className={`p-3 rounded-lg ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}`}>
    {icon}
  </button>
);

const Sidebar: React.FC = () => {
  return (
    <div className="w-16 bg-card border-r flex flex-col items-center justify-between py-4">
      <div className="flex flex-col items-center space-y-2">
        <div className="p-2 bg-primary rounded-md mb-4">
          <BoltIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <NavItem icon={<HomeIcon className="w-6 h-6"/>} />
        <NavItem icon={<BarChartIcon className="w-6 h-6"/>} />
        <NavItem icon={<InboxIcon className="w-6 h-6"/>} />
        <NavItem icon={<PaperAirplaneIcon className="w-6 h-6"/>} />
        <NavItem icon={<ChatBubbleIcon className="w-6 h-6"/>} active />
        <NavItem icon={<UsersIcon className="w-6 h-6"/>} />
        <NavItem icon={<ViewColumnsIcon className="w-6 h-6"/>} />
        <NavItem icon={<DocumentTextIcon className="w-6 h-6"/>} />
        <NavItem icon={<LinkIcon className="w-6 h-6"/>} />
        <NavItem icon={<AdjustmentsIcon className="w-6 h-6"/>} />
        <NavItem icon={<PowerIcon className="w-6 h-6"/>} />

      </div>
      <div className="flex flex-col items-center space-y-2">
        <NavItem icon={<QuestionMarkCircleIcon className="w-6 h-6"/>} />
        <NavItem icon={<CogIcon className="w-6 h-6"/>} />
        <button className="mt-2">
            <img src="https://picsum.photos/32" alt="User avatar" className="w-8 h-8 rounded-full" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;