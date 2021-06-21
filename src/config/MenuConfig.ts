export const MenuConfig = [
    {
        name: '测试',
        type: 'group',
        key: '测试',
        children: [
          {
            name: '测试1',
            key: '测试1',
            extraData: {
              path: '/test'
            }
          },
          {
            name: '测试2',
            key: '测试2'
          }
        ]
      }
]

export interface MenuDataType {
    name?: string;
    key: string;
    children?: MenuDataType[];
    icon?: React.ReactNode;
    type?: 'group' | 'list';
    extraData?: Record<string, any>;
}