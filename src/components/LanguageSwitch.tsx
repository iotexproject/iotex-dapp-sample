import React from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';
import { Box, Button, createStyles, Menu } from '@mantine/core';
import { LanguageHiragana } from 'tabler-icons-react';
import { useStore } from '../store/index';
import { useTranslation } from 'react-i18next';

const BREAKPOINT = '@media (max-width: 755px)';
const useStyles = createStyles((theme) => ({
  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1
    }
  }
}));

export const LanguageSwitch = observer(() => {
  const { classes, cx } = useStyles();
  const { lang } = useStore();
  const { t } = useTranslation();
  const langList = [
    {
      label: '简体中文',
      value: 'zh_CN'
    },
    {
      label: 'English',
      value: 'en'
    },
    {
      label: '日本語',
      value: 'ja'
    },
    {
      label: '繁體中文',
      value: 'zh_TW'
    },
    {
      label: '한국어',
      value: 'ko'
    },
    {
      label: 'Deutsch',
      value: 'de'
    },
    {
      label: 'Español',
      value: 'es'
    },
    {
      label: 'русск',
      value: 'ru'
    }
  ];
  return (
    <Box>
      <Menu
        transition="rotate-right"
        transitionDuration={100}
        transitionTimingFunction="ease"
        control={
          <Button className={classes.control} size="xl" leftIcon={<LanguageHiragana></LanguageHiragana>}>
            {t('language')}
          </Button>
        }
      >
        {langList.map((v) => (
          <Menu.Item
            key={v.value}
            value={v.value}
            onClick={(e) => {
              // console.log(e.target.innerText)
              //@ts-ignore
              let index = langList.findIndex((item) => item.label === e.target.innerText);
              console.log(langList[index].value);
              lang.setLang(langList[index].value);
            }}
          >
            {v.label}
          </Menu.Item>
        ))}
      </Menu>
    </Box>
  );
});
