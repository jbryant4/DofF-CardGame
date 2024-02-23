export type InternalLink = {
  displayName: string;
  link: `/${string}`;
};

export type AdminLinks = {
  displayName: string;
  link: `/admin/${string}`;
};

const internalLinks: InternalLink[] = [
  { displayName: 'library', link: '/cards' },
  { displayName: 'forge', link: '/forge' },
  { displayName: 'duel', link: '/game' }
];

const adminLinks: AdminLinks[] = [
  { displayName: 'cards', link: '/admin/cards' },
  { displayName: 'collector', link: '/admin/collector' },
  { displayName: 'icons', link: '/admin/icons' },
  { displayName: 'game', link: '/admin/game' }
];

export default { internalLinks, adminLinks };
