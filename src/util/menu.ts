import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export default function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    items?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      items,
      label,
      type,
    } as MenuItem;
}