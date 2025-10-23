import React from 'react';

const createIcon = (path: React.ReactNode, viewBox = "0 0 24 24") => {
  const IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
  IconComponent.displayName = 'Icon';
  return IconComponent;
};

// --- General & Card Headers ---
const User = createIcon(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);
const Pencil = createIcon(<><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></>);
const PencilLine = createIcon(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>);
const Ban = createIcon(<><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></>);
const AlertCircle = createIcon(<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>);
const Pill = createIcon(<><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></>);
const Macros = createIcon(<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />);
const Timer = createIcon(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);
const CheckCircle = createIcon(<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>);
const Info = createIcon(<><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>);
const Zap = createIcon(<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />);
const Loader2 = createIcon(<path d="M21 12a9 9 0 1 1-6.219-8.56" />);
const Utensils = createIcon(<><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" /></>);
const Upload = createIcon(<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></>);
const Plus = createIcon(<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />);
const Trash2 = createIcon(<><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></>);
const Play = createIcon(<polygon points="5 3 19 12 5 21 5 3" />);


// --- Workout Icons ---
const Workout = createIcon(<path d="M11 5.266a2 2 0 0 1 2 0l7.5 4a2 2 0 0 1 1.5 1.8V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.934a2 2 0 0 1 1.5-1.8l7.5-4zM8 19v-5" />);
const Arm = createIcon(<><path d="M12 12h2a2 2 0 1 0 0-4h-2v4Z" /><path d="M12 10V8a2 2 0 1 0-4 0v2" /><path d="M14 14v2a2 2 0 1 0 4 0v-2" /><path d="M4 14a2 2 0 1 0 4 0v-2a2 2 0 1 0-4 0Z" /></>);
const Leg = createIcon(<><path d="M12 22v-6" /><path d="M12 10V4" /><path d="m4.5 10.5 3 3" /><path d="M19.5 10.5_1.5 3-3" /><path d="M18 16h-4.26a2 2 0 0 1-1.79-1.09l-1.9-3.81A2 2 0 0 1 11.74 8H12" /><path d="m6 16 1.74-3.47a2 2 0 0 1 1.79-1.09L12 11" /></>);
const Body = createIcon(<><circle cx="12" cy="5" r="1" /><path d="M9 20h6" /><path d="M9 16.5v-4l-2-6" /><path d="M15 16.5v-4l2-6" /></>);
const Core = createIcon(<><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 22a10 10 0 0 0 10-10" /><path d="M2 12a10 10 0 0 0 10 10" /><path d="M22 12a10 10 0 0 1-10 10" /></>);
const Cardio = createIcon(<><path d="M10 2H6v2H4v2h2v4h2V6h2V4h-2z" /><path d="M14 10h4v4h2v-4h2v-2h-2V6h-2v2h-4z" /><path d="M5 14H4v2h1v4h2v-4h1v-2H5z" /></>);


export const Icons = {
    User, Pencil, PencilLine, Ban, AlertCircle, Pill, Macros, Timer, CheckCircle, Info, Zap, Loader2, Utensils,
    Upload, Plus, Trash2, Play,
    Workout, Arm, Leg, Body, Core, Cardio
};