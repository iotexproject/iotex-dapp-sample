import { observer } from 'mobx-react-lite';
//@ts-ignore
import { Box, Center, createStyles, Menu, Link } from '@mantine/core';
import { useRouter } from 'next/router';
import { useStore } from '@/store/index';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25) : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7]
        }
      }
    }
  };
});

export const Links = observer(() => {
  const { classes, cx } = useStyles();
  const { t } = useTranslation();
  const { user, god } = useStore();
  const router = useRouter();

  return (
    <>
      {user.layout?.router?.map((item) => (
        <Box
          className={cx(classes.link, { [classes.linkActive]: item.link === router.route })}
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            if (item.link) {
              if (item.__blank) {
                window.open(item.link, '_blank');
              } else {
                router.push(item.link);
              }
            }
          }}
        >
          <item.icon className={classes.linkIcon} />
          <span>{t(item.label)}</span>
        </Box>
      ))}
    </>
  );
});
