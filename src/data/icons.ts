/**
 * Lijn-iconen (24×24, stroke) in de stijl van de huisstijl: rustig en dun.
 * Gebruikt door src/components/Icon.astro.
 */
export const icons = {
  ledger:
    '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v15H5.5A1.5 1.5 0 0 0 4 19.5v-15Z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3"/><path d="M8 7h7M8 10.5h7M8 14h4"/>',
  payroll:
    '<path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z"/><path d="M9 7.5h6M9 11h6M9 14.5h3.5"/>',
  tax: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="m10 16.5 5-5"/><circle cx="10.5" cy="12" r=".9"/><circle cx="14.5" cy="16" r=".9"/>',
  report:
    '<path d="M12 4v16M8 20h8M4.5 7h15"/><path d="M4.5 7 2 13a2.5 2.5 0 0 0 5 0z"/><path d="M19.5 7 17 13a2.5 2.5 0 0 0 5 0z"/>',
  advice:
    '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z"/>',
  automation:
    '<rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><path d="M6 9v3.5a2 2 0 0 0 2 2h7"/><path d="m13 12.5 2 2-2 2"/><circle cx="18" cy="6.5" r="2.5"/><path d="M9 6.5h6.5"/>',
  globe:
    '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.3 3.5 5.2 3.5 8.5s-1.2 6.2-3.5 8.5c-2.3-2.3-3.5-5.2-3.5-8.5S9.7 5.8 12 3.5Z"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.8"/><path d="M17 7v.01"/>',
  linkedin:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M8 10.5V16M8 7.5v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.5 2.3-2.5 1.3 0 2.2.9 2.2 2.5V16"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  whatsapp:
    '<path d="M4 20.5 5.3 16A8.5 8.5 0 1 1 8.4 19l-4.4 1.5Z"/><path d="M9.2 8.6c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.7l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.2.5-.2.7-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.6.3-1.4.5-2.1.3-2.4-.7-4.4-2.7-5.1-5.1-.2-.7 0-1.5.3-2.1Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  phone:
    '<path d="M5 3.5h3l1.5 4.5-2 1.5a12 12 0 0 0 7 7l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  handshake:
    '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3 3 0 0 1 3.6-.5l.5.3a2 2 0 0 0 1.4.2L21 6"/><path d="m21 15-1 1"/><path d="M3 6l1.8-.4a2 2 0 0 1 1.4.2L8 7"/><path d="m3 14 6.5 6.5a1.4 1.4 0 0 0 2-2"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  store: '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5.5 11.5V20h13v-8.5M10 20v-5h4v5"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  building:
    '<path d="M4 20.5h16M6 20.5V4h8v16.5M14 9h4v11.5"/><path d="M9 8h2M9 11.5h2M9 15h2"/>',
  utensils: '<path d="M7 3v8a2 2 0 0 0 2-2V3M7 11v10M5 3v6a2 2 0 0 0 2 2"/><path d="M17 21V3c-2 1-3 3.5-3 6.5V13h3"/>',
  sprout: '<path d="M12 21v-8"/><path d="M12 13C12 9 9.5 6.5 5 6.5 5 10.5 7.5 13 12 13Z"/><path d="M12 11c0-3.5 2.5-6 7-6 0 3.5-2.5 6-7 6Z"/>',
  truck: '<path d="M3 6h11v10H3zM14 9.5h4l3 3.5v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M9 7V5h6v2M3 12.5h18"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.8a3 3 0 0 1 0 5.4M17.5 14.5a5.5 5.5 0 0 1 3 5"/>',
} as const;

export type IconName = keyof typeof icons;
