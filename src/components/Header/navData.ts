export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Contribute',
    href: '#'
  },
  {
    label: 'GitHub',
    href: '#'
  },
  {
    label: 'Discord',
    href: '#'
  }
];
