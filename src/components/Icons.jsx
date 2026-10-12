/** Inline SVG icons - keeps the site free of any icon-font or icon-library dependency. */
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

function Svg({ children, size = 22, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {children}
    </svg>
  );
}

export const WhatsAppIcon = ({ size = 22, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
    {...rest}
  >
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.86 9.86 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.03-.19-.31a8.13 8.13 0 0 1-1.25-4.34c0-4.51 3.67-8.18 8.19-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.68 8.18-8.19 8.18Zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.26-.01-.4.11-.52.11-.11.25-.29.37-.44.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.02 0 1.18.86 2.33.98 2.49.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.58.19 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.06-.11-.22-.18-.47-.3Z" />
  </svg>
);

export const CakeIcon = (p) => (
  <Svg {...p}>
    <path d="M4 20h16v-6a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 14v6Z" />
    <path d="M4 17.2c1.3 0 1.3 1 2.6 1s1.3-1 2.7-1 1.3 1 2.7 1 1.3-1 2.7-1 1.3 1 2.6 1 1.3-1 2.7-1" />
    <path d="M12 11.5V7M12 4.2v.6M8 11.5V9M16 11.5V9" />
  </Svg>
);

export const RingsIcon = (p) => (
  <Svg {...p}>
    <circle cx="8.6" cy="14.4" r="5.4" />
    <circle cx="15.4" cy="14.4" r="5.4" />
    <path d="M12 4.2l1.7 2.1h-3.4L12 4.2Z" />
  </Svg>
);

export const HeartIcon = (p) => (
  <Svg {...p}>
    <path d="M12 20.3S3.6 15.5 3.6 9.9A4.6 4.6 0 0 1 12 7.3a4.6 4.6 0 0 1 8.4 2.6c0 5.6-8.4 10.4-8.4 10.4Z" />
  </Svg>
);

export const FlowerIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2.4" />
    <path d="M12 9.6c0-2.6-.9-4.4 0-5.9.9 1.5 0 3.3 0 5.9ZM14.4 12c2.6 0 4.4-.9 5.9 0-1.5.9-3.3 0-5.9 0ZM12 14.4c0 2.6.9 4.4 0 5.9-.9-1.5 0-3.3 0-5.9ZM9.6 12c-2.6 0-4.4.9-5.9 0 1.5-.9 3.3 0 5.9 0Z" />
    <path d="M13.7 10.3c1.8-1.8 3.5-2.6 4.2-4-1.6-.2-3 1.3-4.2 4ZM13.7 13.7c1.8 1.8 2.6 3.5 4 4.2.2-1.6-1.3-3-4-4.2ZM10.3 13.7c-1.8 1.8-3.5 2.6-4.2 4 1.6.2 3-1.3 4.2-4ZM10.3 10.3C8.5 8.5 6.8 7.7 6.1 6.3c1.6-.2 3 1.3 4.2 4Z" />
  </Svg>
);

export const StageIcon = (p) => (
  <Svg {...p}>
    <path d="M3 20h18M5.2 20V8.6l6.8-4 6.8 4V20" />
    <path d="M5.2 12.6c1.6 0 1.6 1.4 3.4 1.4s1.8-1.4 3.4-1.4 1.6 1.4 3.4 1.4 1.8-1.4 3.4-1.4" />
    <path d="M12 4.6v3.2M9.4 20v-3.4a2.6 2.6 0 0 1 5.2 0V20" />
  </Svg>
);

export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M6.5 3.5h2.8l1.6 4-2 1.4a11 11 0 0 0 5.2 5.2l1.4-2 4 1.6v2.8a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
);

export const PinIcon = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </Svg>
);

export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </Svg>
);

export const SparkleIcon = (p) => (
  <Svg {...p}>
    <path d="M12 3.5l1.6 4.6 4.6 1.6-4.6 1.6L12 15.9l-1.6-4.6L5.8 9.7l4.6-1.6L12 3.5Z" />
    <path d="M18.4 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
  </Svg>
);

export const MenuIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const ChevronLeftIcon = (p) => (
  <Svg {...p}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </Svg>
);

export const ChevronRightIcon = (p) => (
  <Svg {...p}>
    <path d="M9.5 5.5 16 12l-6.5 6.5" />
  </Svg>
);

export const ArrowUpIcon = (p) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="M5 12.6 9.5 17 19 7.4" />
  </Svg>
);

export const GridIcon = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.4" />
    <rect x="13" y="4" width="7" height="7" rx="1.4" />
    <rect x="4" y="13" width="7" height="7" rx="1.4" />
    <rect x="13" y="13" width="7" height="7" rx="1.4" />
  </Svg>
);

export const zoomIcon = GridIcon;

export const SERVICE_ICONS = {
  cake: CakeIcon,
  rings: RingsIcon,
  heart: HeartIcon,
  flower: FlowerIcon,
  stage: StageIcon,
};
