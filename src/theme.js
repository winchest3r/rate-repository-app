import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#929eaa',
    primary: '#0366d6',
    error: '#d73a4a',
  },
  backgroundColors: {
    appBarPrimary: '#24292e',
    mainPrimary: '#e1e4e8',
    primary: '#ffffff',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;
