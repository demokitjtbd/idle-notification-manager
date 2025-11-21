import React, { useState, useRef, useEffect } from 'react';
import { FollowUp, Channel, Subject, ActionType, Division, MessageActionDetails, WebhookActionDetails, PromptMessagePair, KnowledgeBase } from '../types';

import { QuestionMarkCircleIcon, XMarkIcon, ChevronDownIcon, ArrowUpIcon, ArrowDownIcon } from './Icons';

interface CreateFollowUpProps {
  onSave: (followUp: FollowUp) => void;
  onCancel: () => void;
  initialData?: FollowUp | null;
}

const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      className={`${checked ? 'bg-primary' : 'bg-input'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

const defaultPrompt: PromptMessagePair = {
  id: `pm-${Date.now()}`,
  prompt: 'Generate a friendly follow-up message asking if the customer still needs help.',
  message: '',
  imageUrl: '',
  isHandoverAgent: false,
  isResolved: false,
  isExactMessage: false,
  getHistoryChat: false,
  getKnowledgeBase: true,
  knowledgeBases: [],
  assignedDivision: undefined,
};

const defaultMessageDetails: MessageActionDetails = {
  prompts: [{ ...defaultPrompt, id: `pm-${Date.now()}` }],
};

const defaultWebhookDetails: WebhookActionDetails = {
  url: '',
};

const defaultFollowUp: Omit<FollowUp, 'id'> = {
  name: 'Follow Up 10',
  channels: [Channel.Glasius, Channel.Playground, Channel.Demo],
  subject: Subject.CustomerCombined,
  duration: 10,
  maxRecurring: 3,
  actionType: ActionType.Message,
  actionDetails: defaultMessageDetails,
  isActive: true,
};

const formElementClasses = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
const labelClasses = "block text-sm font-medium text-foreground mb-1";
const descriptionClasses = "text-xs text-muted-foreground mb-2";
const checkboxLabelClasses = "ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
const checkboxClasses = "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground";


const CreateFollowUp: React.FC<CreateFollowUpProps> = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState<Omit<FollowUp, 'id'>>(() => {
    if (initialData) {
      if (initialData.actionType === ActionType.Message) {
        const details = initialData.actionDetails as any; // Allow checking old format
        // Backward compatibility: if top-level fields exist, migrate them to the first prompt
        if (details.hasOwnProperty('imageUrl')) {
          const migratedPrompt: PromptMessagePair = {
            ...defaultPrompt,
            ...(details.prompts && details.prompts[0] ? details.prompts[0] : {}),
            id: (details.prompts && details.prompts[0]?.id) || `pm-${Date.now()}`,
            imageUrl: details.imageUrl,
            isHandoverAgent: details.isHandoverAgent,
            isResolved: details.isResolved,
            isExactMessage: details.isExactMessage,
            getHistoryChat: details.getHistoryChat,
            getKnowledgeBase: details.getKnowledgeBase,
            knowledgeBases: details.knowledgeBases || [],
            assignedDivision: details.assignedDivision,
          };
          const otherPrompts = (details.prompts?.slice(1) || []).map((p: any) => ({ ...defaultPrompt, ...p }));
          return { ...initialData, actionDetails: { prompts: [migratedPrompt, ...otherPrompts] } };
        } else { // New format, just ensure defaults
          const promptsWithDefaults = (details.prompts || []).map((p: Partial<PromptMessagePair>) => ({ ...defaultPrompt, ...p }));
          return { ...initialData, actionDetails: { prompts: promptsWithDefaults } };
        }
      }
      return initialData;
    }
    return defaultFollowUp;
  });


  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const [kbSearchQueries, setKbSearchQueries] = useState<{ [promptId: string]: string }>({});
  const [collapsedPrompts, setCollapsedPrompts] = useState<Set<string>>(new Set());

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (initialData && (initialData.actionDetails as MessageActionDetails).prompts?.length > 1) {
      const idsToCollapse = (initialData.actionDetails as MessageActionDetails).prompts.slice(1).map(p => p.id);
      setCollapsedPrompts(new Set(idsToCollapse));
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(dropdownRefs.current).forEach(key => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key]!.contains(event.target as Node)) {
          setOpenDropdowns(prev => ({ ...prev, [key]: false }));
        }
      });
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const toggleCollapsePrompt = (id: string) => {
    setCollapsedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleChange = <K extends keyof Omit<FollowUp, 'id'>>(field: K, value: (Omit<FollowUp, 'id'>)[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleActionDetailsChange = (field: keyof WebhookActionDetails | 'prompts', value: any) => {
    setFormData(prev => ({ ...prev, actionDetails: { ...prev.actionDetails, [field as string]: value } }));
  };

  const handleActionTypeChange = (value: ActionType) => {
    handleChange('actionType', value);
    if (value === ActionType.Message) {
      handleChange('actionDetails', defaultMessageDetails);
    } else {
      handleChange('actionDetails', defaultWebhookDetails);
    }
  }

  const handlePromptDetailsChange = (id: string, field: keyof PromptMessagePair, value: any) => {
    const details = formData.actionDetails as MessageActionDetails;
    let newPrompts = details.prompts.map(p =>
      p.id === id ? { ...p, [field as string]: value } : p
    );

    if (field === 'isHandoverAgent' && !value) {
      newPrompts = newPrompts.map(p => p.id === id ? { ...p, assignedDivision: undefined } : p);
    }
    if (field === 'getKnowledgeBase' && !value) {
      newPrompts = newPrompts.map(p => p.id === id ? { ...p, knowledgeBases: [] } : p);
    }

    handleActionDetailsChange('prompts', newPrompts);
  };

  const handleAddPrompt = () => {
    const details = formData.actionDetails as MessageActionDetails;
    const newPrompt: PromptMessagePair = { ...defaultPrompt, id: `pm-${Date.now()}`, prompt: '', message: '' };
    const newPrompts = [...details.prompts, newPrompt];
    handleActionDetailsChange('prompts', newPrompts);
  };

  const handleRemovePrompt = (id: string) => {
    const details = formData.actionDetails as MessageActionDetails;
    if (details.prompts.length <= 1) return;
    const newPrompts = details.prompts.filter(p => p.id !== id);
    handleActionDetailsChange('prompts', newPrompts);
    setCollapsedPrompts(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleMovePrompt = (index: number, direction: 'up' | 'down') => {
    const details = formData.actionDetails as MessageActionDetails;
    const prompts = [...details.prompts];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= prompts.length) return;

    [prompts[index], prompts[targetIndex]] = [prompts[targetIndex], prompts[index]]; // Swap elements
    handleActionDetailsChange('prompts', prompts);
  };



  const availableChannels = Object.values(Channel);
  const availableKnowledgeBases = Object.values(KnowledgeBase);

  const toggleChannel = (channel: Channel) => {
    const currentChannels = formData.channels;
    if (currentChannels.includes(channel)) {
      handleChange('channels', currentChannels.filter(c => c !== channel));
    } else {
      handleChange('channels', [...currentChannels, channel]);
    }
  };

  const handleSelectAllChannels = (checked: boolean) => {
    if (checked) {
      handleChange('channels', availableChannels);
    } else {
      handleChange('channels', []);
    }
  };

  const toggleKnowledgeBase = (promptId: string, kb: KnowledgeBase) => {
    const details = formData.actionDetails as MessageActionDetails;
    const prompt = details.prompts.find(p => p.id === promptId);
    if (!prompt) return;

    const currentKBs = prompt.knowledgeBases;
    let newKBs;
    if (currentKBs.includes(kb)) {
      newKBs = currentKBs.filter(k => k !== kb);
    } else {
      newKBs = [...currentKBs, kb];
    }
    handlePromptDetailsChange(promptId, 'knowledgeBases', newKBs);
  };

  const handleSelectAllKnowledgeBases = (promptId: string, checked: boolean) => {
    if (checked) {
      handlePromptDetailsChange(promptId, 'knowledgeBases', availableKnowledgeBases);
    } else {
      handlePromptDetailsChange(promptId, 'knowledgeBases', []);
    }
  };

  const areAllChannelsSelected = availableChannels.length > 0 && formData.channels.length === availableChannels.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: initialData?.id || '' });
  };

  const getKnowledgeBaseDisplayText = (prompt: PromptMessagePair) => {
    const count = prompt.knowledgeBases.length;
    if (count === 0) return 'Select knowledge bases...';
    if (count === availableKnowledgeBases.length) return 'All KBs selected';
    if (count <= 2) return prompt.knowledgeBases.join(', ');
    return `${count} KBs selected`;
  };

  return (
    <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg border">
      <h1 className="text-2xl font-bold text-card-foreground">Create Idle</h1>
      <p className="text-muted-foreground mt-1 mb-6">Define what happens when nothing happens — automate decisions, trigger actions, and ensure idle moments don’t become missed opportunities.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={labelClasses}>Name*</label>
          <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} required className={formElementClasses} />
        </div>

        <div>
          <label className={labelClasses}>Assign channel*</label>
          <div className="relative" ref={ref => { dropdownRefs.current['channels'] = ref; }}>
            <div
              onClick={() => toggleDropdown('channels')}
              className={`${formElementClasses.replace('h-10', '')} min-h-[2.5rem] h-auto flex-wrap items-center gap-2 cursor-pointer relative`}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={openDropdowns['channels']}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown('channels'); } }}
            >
              {formData.channels.length === 0 ? (
                <span className="text-muted-foreground">Select channels...</span>
              ) : (
                formData.channels.map(channel => (
                  <span key={channel} className="flex items-center bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-medium">
                    {channel}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleChannel(channel);
                      }}
                      className="ml-1.5 p-0.5 rounded-full hover:bg-muted"
                      aria-label={`Remove ${channel}`}
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
              <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform absolute right-3 top-1/2 -translate-y-1/2 ${openDropdowns['channels'] ? 'rotate-180' : ''}`} />
            </div>

            {openDropdowns['channels'] && (
              <div className="absolute z-10 w-full mt-1 bg-card border border-input rounded-md shadow-lg" role="listbox">
                <div className="p-2">
                  <div className="flex items-center px-2 py-1.5 border-b mb-1">
                    <input
                      type="checkbox"
                      id="select-all-channels"
                      checked={areAllChannelsSelected}
                      onChange={(e) => handleSelectAllChannels(e.target.checked)}
                      className={checkboxClasses}
                    />
                    <label htmlFor="select-all-channels" className={`${checkboxLabelClasses} font-semibold cursor-pointer`}>
                      Select All
                    </label>
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1 mt-1">
                    {availableChannels.map(channel => (
                      <label key={channel} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-accent" role="option" aria-selected={formData.channels.includes(channel)}>
                        <input
                          type="checkbox"
                          checked={formData.channels.includes(channel)}
                          onChange={() => toggleChannel(channel)}
                          className={checkboxClasses}
                        />
                        <span className={`${checkboxLabelClasses} cursor-pointer`}>{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className={labelClasses}>Subject*</label>
          <p className={descriptionClasses}>Choose the idle subject to monitor: either an agent, an unserved customer, a served customer, or a combined group of both served and unserved customers.</p>
          <select value={formData.subject} onChange={e => handleChange('subject', e.target.value as Subject)} className={formElementClasses}>
            {Object.values(Subject).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Duration (minutes)*</label>
          <p className={descriptionClasses}>Define how long the idle subject should be inactive before triggering the rule.</p>
          <input type="number" value={formData.duration} onChange={e => handleChange('duration', parseInt(e.target.value, 10))} required min="1" className={formElementClasses} />
        </div>

        <div>
          <label className={labelClasses}>Max Recurring*</label>
          <p className={descriptionClasses}>Specify how many times the idle rule will trigger for the same subject within a session. Enter 0 to allow infinite triggers as long as the subject remains inactive.</p>
          <input type="number" value={formData.maxRecurring} onChange={e => handleChange('maxRecurring', parseInt(e.target.value, 10))} required min="0" className={formElementClasses} />
        </div>

        <div>
          <label className={labelClasses}>Action*</label>
          <p className={descriptionClasses}>Choose from several actions when idle is detected: send a webhook to an external service, send an alert to the chat room, or send a message on your behalf.</p>
          <select value={formData.actionType} onChange={e => handleActionTypeChange(e.target.value as ActionType)} className={formElementClasses}>
            {Object.values(ActionType).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {formData.actionType === ActionType.Message && (() => {
          const details = formData.actionDetails as MessageActionDetails;
          return (
            <div className="space-y-4 p-4 border border-input rounded-md">
              <div className="space-y-4">
                {details.prompts.map((p, index) => {
                  const isCollapsed = collapsedPrompts.has(p.id);
                  return (
                    <div key={p.id} className="border bg-background/50 border-input rounded-lg">
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent/50"
                        onClick={() => toggleCollapsePrompt(p.id)}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronDownIcon className={`w-5 h-5 text-muted-foreground transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
                          <h3 className="font-semibold text-foreground text-md">Prompt #{index + 1}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleMovePrompt(index, 'up'); }}
                            disabled={index === 0}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Move prompt up"
                          >
                            <ArrowUpIcon className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleMovePrompt(index, 'down'); }}
                            disabled={index === details.prompts.length - 1}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Move prompt down"
                          >
                            <ArrowDownIcon className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemovePrompt(p.id); }}
                            disabled={details.prompts.length <= 1}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Remove prompt"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {!isCollapsed && (
                        <div className="p-4 border-t border-input space-y-4 bg-background">
                          <div>
                            <label className={labelClasses}>Prompt (Instruction)*</label>
                            <textarea value={p.prompt} onChange={e => handlePromptDetailsChange(p.id, 'prompt', e.target.value)} required rows={3} className={`${formElementClasses} h-auto`} placeholder="e.g., Generate a cheerful follow-up message..."></textarea>
                          </div>

                          <div>
                            <label className={labelClasses}>Message*</label>
                            <textarea value={p.message} onChange={e => handlePromptDetailsChange(p.id, 'message', e.target.value)} required rows={4} className={`${formElementClasses} h-auto`} placeholder="Type your message."></textarea>
                          </div>
                          <div className="space-y-4 pt-4 border-t mt-4">
                            <div>
                              <label className={labelClasses}>Image URL</label>
                              <input type="url" value={p.imageUrl} onChange={e => handlePromptDetailsChange(p.id, 'imageUrl', e.target.value)} className={formElementClasses} />
                            </div>
                            <div className="space-y-2 pt-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-foreground">Get History Chat</label>
                                <ToggleSwitch
                                  checked={p.getHistoryChat}
                                  onChange={checked => handlePromptDetailsChange(p.id, 'getHistoryChat', checked)}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-foreground">Get Knowledge Base</label>
                                <ToggleSwitch
                                  checked={p.getKnowledgeBase}
                                  onChange={checked => handlePromptDetailsChange(p.id, 'getKnowledgeBase', checked)}
                                />
                              </div>
                              {p.getKnowledgeBase && (
                                <div className="pt-2">
                                  <label className={labelClasses}>Knowledge Base Selection*</label>
                                  <div className="relative" ref={ref => { dropdownRefs.current[`kb-${p.id}`] = ref; }}>
                                    <button
                                      type="button"
                                      onClick={() => toggleDropdown(`kb-${p.id}`)}
                                      className={`${formElementClasses} flex justify-between items-center text-left w-full`}
                                      aria-haspopup="listbox"
                                      aria-expanded={openDropdowns[`kb-${p.id}`]}
                                    >
                                      <span className={p.knowledgeBases.length === 0 ? "text-muted-foreground" : "text-foreground"}>
                                        {getKnowledgeBaseDisplayText(p)}
                                      </span>
                                      <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform ${openDropdowns[`kb-${p.id}`] ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openDropdowns[`kb-${p.id}`] && (
                                      <div className="absolute z-10 w-full mt-1 bg-card border border-input rounded-md shadow-lg">
                                        <div className="p-2 space-y-2">
                                          <div className="px-1">
                                            <input
                                              type="search"
                                              value={kbSearchQueries[p.id] || ''}
                                              onChange={(e) => setKbSearchQueries(prev => ({ ...prev, [p.id]: e.target.value }))}
                                              placeholder="Search KBs..."
                                              className={`${formElementClasses} h-9 text-sm`}
                                              autoFocus
                                              onClick={(e) => e.stopPropagation()}
                                            />
                                          </div>
                                          <div className="flex items-center px-2 py-1.5 border-t border-b">
                                            <input
                                              type="checkbox"
                                              id={`select-all-kb-${p.id}`}
                                              checked={p.knowledgeBases.length === availableKnowledgeBases.length}
                                              onChange={(e) => handleSelectAllKnowledgeBases(p.id, e.target.checked)}
                                              className={checkboxClasses}
                                            />
                                            <label htmlFor={`select-all-kb-${p.id}`} className={`${checkboxLabelClasses} font-semibold cursor-pointer`}>
                                              Select All
                                            </label>
                                          </div>
                                          {(() => {
                                            const searchQuery = (kbSearchQueries[p.id] || '').toLowerCase();
                                            const filteredKBs = availableKnowledgeBases.filter(kb =>
                                              kb.toLowerCase().includes(searchQuery)
                                            );

                                            if (filteredKBs.length === 0) {
                                              return <div className="text-center text-sm text-muted-foreground p-2">No results found.</div>;
                                            }

                                            return (
                                              <div className="max-h-40 overflow-y-auto space-y-1">
                                                {filteredKBs.map(kb => (
                                                  <label key={kb} className="flex items-center cursor-pointer p-2 rounded-md hover:bg-accent">
                                                    <input
                                                      type="checkbox"
                                                      checked={p.knowledgeBases.includes(kb)}
                                                      onChange={() => toggleKnowledgeBase(p.id, kb)}
                                                      className={checkboxClasses}
                                                    />
                                                    <span className={`${checkboxLabelClasses} cursor-pointer`}>{kb}</span>
                                                  </label>
                                                ))}
                                              </div>
                                            );
                                          })()}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="space-y-4 border-t pt-4">
                              <h2 className="text-lg font-semibold text-foreground">Action & Status</h2>
                              <div className="flex items-center justify-between py-2">
                                <label className="text-sm font-medium text-foreground flex items-center">
                                  Is Handover Agent
                                  <QuestionMarkCircleIcon className="w-4 h-4 ml-1.5 text-muted-foreground" />
                                </label>
                                <ToggleSwitch checked={p.isHandoverAgent} onChange={checked => handlePromptDetailsChange(p.id, 'isHandoverAgent', checked)} />
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <label className="text-sm font-medium text-foreground">Is Exact Message</label>
                                <ToggleSwitch checked={p.isExactMessage} onChange={checked => handlePromptDetailsChange(p.id, 'isExactMessage', checked)} />
                              </div>
                              <div className="flex items-center justify-between py-2">
                                <label className="text-sm font-medium text-foreground">Is Resolved</label>
                                <ToggleSwitch checked={p.isResolved} onChange={checked => handlePromptDetailsChange(p.id, 'isResolved', checked)} />
                              </div>
                              {p.isHandoverAgent && (
                                <div className="bg-secondary/50 p-4 rounded-lg">
                                  <label className="block text-sm font-medium text-foreground mb-2">Assign Division</label>
                                  <select
                                    value={p.assignedDivision || ''}
                                    onChange={e => handlePromptDetailsChange(p.id, 'assignedDivision', e.target.value as Division)}
                                    className={formElementClasses}
                                  >
                                    <option value="" disabled>Select a team</option>
                                    {Object.values(Division).map(d => <option key={d} value={d}>{d}</option>)}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <button type="button" onClick={handleAddPrompt} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2">
                + Add Another Prompt
              </button>
            </div>
          );
        })()}

        {formData.actionType === ActionType.Webhook && (
          <div className="space-y-4 p-4 border border-input rounded-md">
            <div>
              <label className={labelClasses}>Webhook URL*</label>
              <input type="url" value={(formData.actionDetails as WebhookActionDetails).url} onChange={e => handleActionDetailsChange('url', e.target.value)} required className={formElementClasses} placeholder="https://webhook.site/..." />
            </div>
          </div>
        )}

        <div className="flex items-center">
          <input type="checkbox" id="activate" checked={formData.isActive} onChange={e => handleChange('isActive', e.target.checked)} className={checkboxClasses} />
          <label htmlFor="activate" className={checkboxLabelClasses}>Activate this idle configuration</label>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Cancel</button>
          <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CreateFollowUp;
