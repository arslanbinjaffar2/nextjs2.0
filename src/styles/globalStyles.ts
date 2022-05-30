/* eslint-disable @typescript-eslint/restrict-template-expressions */
import colors from './colors';
// utility styles
// /////////////////////////////////////////////////////////////////////////////
export default {
  // containers
  // ///////////////////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: `rgba(${colors.background},1)`,
    hheight: '100%'
  },
  bgContainer: {
    backgroundColor: `rgba(${colors.background},0.8)`,
  },
  flex1: {
    flex: 1
  },
  flex: {
    display: 'flex'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  alignCenter: {
    alignItems: 'center'
  },
  text: {
    color: colors.text
  },
  textBox: {
    backgroundColor: `rgba(${colors.box},0.8)`,
  }
};
