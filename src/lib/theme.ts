import { extendTheme, IconButton } from '@chakra-ui/react';

// @ts-ignore
export const theme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif'
  },
  colors: {
    discord: '#7289da',
    dark: {
      100: 'rgba(255, 255, 255, 0.08)',
      200: 'rgba(255, 255, 255, 0.16)',
      300: 'rgba(255, 255, 255, 0.24)',
      400: 'rgba(255, 255, 255, 0.32)'
    }
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;'
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 12
      }
    }
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
        height: '100%'
      },
      '.body': {
        overflowY: 'scroll' // Always show scrollbar to avoid flickering
      }
    }
  }
});
