import { helper, toast } from '@/lib/helper';
import { Tooltip, Text } from '@mantine/core';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Copy as CopyIcon } from 'tabler-icons-react';
import * as clipboard from 'clipboard-polyfill/text';
import { from } from '@iotexproject/iotex-address-ts';

interface IProps {
  value: string;
}
export const Copy = observer(({ value }: IProps) => {
  const store = useLocalStore(() => ({
    isIOTipOpen: false,
    toggleIOTipOpen(val: boolean) {
      this.isTipOpen = val;
    }
  }));

  return (
    <Text
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      size="sm"
      onClick={async () => {
        let text: string;
        try {
          text = from(value)?.string();
        } catch (error) {
          text = value;
        }
        const [error] = await helper.promise.runAsync(clipboard.writeText(text));
        if (!error) {
          console.log('yes');
          toast.success('Copied!');
        }
      }}
    >
      <CopyIcon size={24}></CopyIcon>
    </Text>
  );
});
