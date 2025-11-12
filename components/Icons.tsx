

import React from 'react';
import { Channel } from '../types';

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

export const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

export const XMarkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
);

export const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.486 2 2 6.486 2 12C2 14.12 2.66 16.095 3.821 17.728L2 22L6.44 20.245C7.994 21.28 9.866 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z" fill="#25D366"/>
        <path d="M17.238 14.262C16.96 14.122 15.657 13.473 15.378 13.371C15.1 13.268 14.925 13.22 14.75 13.473C14.575 13.725 14.071 14.373 13.902 14.558C13.732 14.743 13.563 14.765 13.284 14.625C12.398 14.167 11.236 13.562 10.324 12.36C9.914 11.758 9.57 11.088 9.475 10.835C9.38 10.583 9.489 10.46 9.601 10.34C9.7 10.233 9.83 10.05 9.97 9.889C10.088 9.749 10.13 9.646 10.225 9.451C10.32 9.256 10.273 9.081 10.203 8.94C10.133 8.799 9.629 7.544 9.424 7.03C9.219 6.516 9.014 6.574 8.854 6.564C8.709 6.553 8.534 6.553 8.359 6.553C8.184 6.553 7.914 6.621 7.682 6.873C7.45 7.125 6.876 7.657 6.876 8.82C6.876 9.983 7.704 11.101 7.844 11.286C7.984 11.471 9.475 13.89 11.854 14.9C13.88 15.748 14.288 15.622 14.75 15.58C15.254 15.532 16.42 14.927 16.652 14.302C16.884 13.676 16.884 13.144 16.814 13.028C16.744 12.912 16.592 12.844 16.313 12.704" fill="white"/>
    </svg>
);
// Simplified icons for others
const GenericIcon: React.FC<{ color: string } & React.SVGProps<SVGSVGElement>> = ({ color, ...props }) => (
    <svg viewBox="0 0 10 10" {...props}><circle cx="5" cy="5" r="5" fill={color} /></svg>
);


export const ChannelIcon: React.FC<{ channel: Channel } & React.SVGProps<SVGSVGElement>> = ({ channel, ...props }) => {
    switch (channel) {
        case Channel.Glasius:
        case Channel.Playground:
        case Channel.Demo:
            return <GenericIcon color="#1ABD9D" {...props} />
        case Channel.WhatsApp:
            return <WhatsAppIcon {...props} />;
        case Channel.Instagram:
            return <GenericIcon color="#E1306C" {...props} />;
        case Channel.TikTok:
            return <GenericIcon color="#000000" {...props} />;
        default:
            return <GenericIcon color="#808080" {...props} />;
    }
};

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5"/> </svg> );
export const BarChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /> </svg> );
export const InboxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.12-1.588H6.88a2.25 2.25 0 00-2.12 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"/> </svg> );
export const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /> </svg> );
export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-.95.27.032.518.11.728.265A7.488 7.488 0 0115.75 8.25c.665.665 1.125 1.519 1.272 2.457.146.938-.03 1.953-.598 2.766a7.525 7.525 0 01-4.242 4.242c-.813.568-1.828.744-2.766.598a7.489 7.489 0 01-2.457-1.272A7.489 7.489 0 013 15.75c-.665-.665-1.125-1.519-1.272-2.457-.146-.938.03-1.953.598-2.766a7.525 7.525 0 014.242-4.242zM9.594 3.94L8.25 3.51a.75.75 0 00-.53.16L5.16 6.22a.75.75 0 00.16.53l.432 1.344m5.253-3.845l1.344-.432a.75.75 0 01.53-.16l2.559 2.559a.75.75 0 01-.16.53l-1.344.432m-3.846 5.253l.432 1.344a.75.75 0 00.53.16l2.559-2.559a.75.75 0 00-.16-.53l-1.344-.432m-5.253 3.845l-.432-1.344a.75.75 0 01-.16-.53L6.22 20.84a.75.75 0 01-.53.16l-2.559-2.559a.75.75 0 01.16-.53l1.344-.432"/> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> );
export const QuestionMarkCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /> </svg> );
export const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /> </svg> );
export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a.75.75 0 01-1.06 0l-3.72-3.72C9.347 17.1 8.5 16.136 8.5 15v-4.286c0-.97.616-1.813 1.5-2.097.568-.182 1.158-.248 1.76-.193l.175.032c.16.028.322.052.485.071l.17.019c.178.02.357.034.538.041l.19.007c.18.006.36.008.54.008h.01c.18.002.358 0 .538-.007l.19-.008c.18-.007.36-.02.538-.04l.17-.019c.163-.018.325-.043.485-.071l.175-.032c.602-.055 1.192.01 1.76.193zM9.5 9.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm3 0a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm3 0a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z" /> </svg> );
export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.964c.373.056.745.111 1.122.164m-2.244-.227a9.043 9.043 0 013.295-2.006 3 3 0 00-4.682-2.72m-7.5-2.964A12.01 12.01 0 003.75 11.231 3 3 0 007.5 15.013m12-2.274c.373.056.745.111 1.122.164m-2.244-.227a9.043 9.043 0 013.295-2.006 3 3 0 00-4.682-2.72m-7.5-2.964A12.01 12.01 0 003.75 11.231 3 3 0 007.5 15.013" /> </svg> );
export const ViewColumnsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.5-15h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 014.5 4.5z" /> </svg> );
export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /> </svg> );
export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /> </svg> );
export const AdjustmentsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /> </svg> );
export const PowerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}> <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" /> </svg> );