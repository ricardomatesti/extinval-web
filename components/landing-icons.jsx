import React from 'react'

function IconBase({ className = '', viewBox = '0 0 24 24', children }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

export const Download = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </IconBase>
)

export const ShieldCheck = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
)

export const Shield = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3l7 3v5c0 4.6-3 7.9-7 10-4-2.1-7-5.4-7-10V6l7-3Z" />
  </IconBase>
)

export const AlertTriangle = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 4 21 20H3L12 4Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </IconBase>
)

export const AlertOctagon = ({ className }) => (
  <IconBase className={className}>
    <path d="M10.5 2h3l6.5 6.5v3L13.5 22h-3L4 15.5v-3L10.5 2Z" />
    <path d="M12 8v5" />
    <path d="M12 17h.01" />
  </IconBase>
)

export const Anchor = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3v8" />
    <circle cx="12" cy="5" r="2" />
    <path d="M5 11h14" />
    <path d="M7 11a5 5 0 0 0 10 0" />
    <path d="M5 11a7 7 0 0 0 14 0" />
  </IconBase>
)

export const CheckCircle = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </IconBase>
)

export const FileText = ({ className }) => (
  <IconBase className={className}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
    <path d="M9 9h2" />
  </IconBase>
)

export const TrendingDown = ({ className }) => (
  <IconBase className={className}>
    <path d="M3 7h6v6" />
    <path d="m21 17-7-7-4 4-7-7" />
  </IconBase>
)

export const Info = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <path d="M12 7h.01" />
  </IconBase>
)

export const ClipboardList = ({ className }) => (
  <IconBase className={className}>
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4.5h6" />
    <path d="M9 10h6" />
    <path d="M9 14h6" />
    <path d="M9 18h4" />
  </IconBase>
)

export const Flame = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3c1.5 3-1 4.5-1 6.5 0 1.3 1 2.3 2.2 2.3 2 0 3.3-1.8 3.3-4.1C18.5 9 20 10.8 20 14a8 8 0 1 1-16 0c0-3.7 2.3-6 5.2-8.8.8 2.4 2.1 3.4 2.8 3.9" />
  </IconBase>
)

export const UserCheck = ({ className }) => (
  <IconBase className={className}>
    <circle cx="9" cy="8" r="4" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="m16 11 2 2 4-4" />
  </IconBase>
)

export const ChevronRight = ({ className }) => (
  <IconBase className={className}>
    <path d="m9 6 6 6-6 6" />
  </IconBase>
)

export const Ship = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 3v8l7 3-1 3H6l-1-3 7-3" />
    <path d="M4 18c1.2 1.3 2.6 2 4 2s2.8-.7 4-2c1.2 1.3 2.6 2 4 2s2.8-.7 4-2" />
  </IconBase>
)

export const LifeBuoy = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="m5.6 5.6 3 3" />
    <path d="m15.4 15.4 3 3" />
    <path d="m18.4 5.6-3 3" />
    <path d="m8.6 15.4-3 3" />
  </IconBase>
)

export const Zap = ({ className }) => (
  <IconBase className={className}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </IconBase>
)

export const Check = ({ className }) => (
  <IconBase className={className}>
    <path d="m5 12 5 5L20 7" />
  </IconBase>
)

export const Plus = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </IconBase>
)

export const Lock = ({ className }) => (
  <IconBase className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </IconBase>
)

export const Phone = ({ className }) => (
  <IconBase className={className}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.3 1.3a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
  </IconBase>
)

export const Mail = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </IconBase>
)

export const Globe = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14.5 14.5 0 0 1 0 18" />
    <path d="M12 3a14.5 14.5 0 0 0 0 18" />
  </IconBase>
)

export const Award = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="8" r="5" />
    <path d="m8.5 13.5-1 7 4.5-2.5 4.5 2.5-1-7" />
  </IconBase>
)

export const CheckSquare = ({ className }) => (
  <IconBase className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="m8 12 3 3 5-6" />
  </IconBase>
)

export const Building2 = ({ className }) => (
  <IconBase className={className}>
    <path d="M6 21V7l6-4 6 4v14" />
    <path d="M4 21h16" />
    <path d="M9 10h.01" />
    <path d="M15 10h.01" />
    <path d="M9 14h.01" />
    <path d="M15 14h.01" />
    <path d="M12 21v-4" />
  </IconBase>
)

export const Activity = ({ className }) => (
  <IconBase className={className}>
    <path d="M3 12h4l2-5 4 10 2-5h6" />
  </IconBase>
)

export const Layers = ({ className }) => (
  <IconBase className={className}>
    <path d="m12 3 9 4.5-9 4.5-9-4.5 9-4.5Z" />
    <path d="m3 12 9 4.5 9-4.5" />
    <path d="m3 16.5 9 4.5 9-4.5" />
  </IconBase>
)

export const Clock = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </IconBase>
)

export const Compass = ({ className }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m14.5 9.5-5 5 5-2.5 2.5-5-5 2.5Z" />
  </IconBase>
)

export const MapPin = ({ className }) => (
  <IconBase className={className}>
    <path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </IconBase>
)
