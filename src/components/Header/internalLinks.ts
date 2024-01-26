export type InternalLink = {
  displayName: string;
  link: `/${string}?hasData=true`;
};

export type AdminLinks = {
  displayName: string;
  link: `/admin/${string}?hasData=true`;
};

const internalLinks: InternalLink[] = [
  { displayName: 'library', link: '/cards?hasData=true' },
  { displayName: 'forge', link: '/forge?hasData=true' },
  { displayName: 'duel', link: '/game?hasData=true' }
];

const adminLinks: AdminLinks[] = [
  { displayName: 'cards', link: '/admin/cards?hasData=true' },
  { displayName: 'collector', link: '/admin/collector?hasData=true' },
  { displayName: 'icons', link: '/admin/icons?hasData=true' },
  { displayName: 'game', link: '/admin/game?hasData=true' }
];

export default { internalLinks, adminLinks };
