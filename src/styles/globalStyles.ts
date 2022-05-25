import colors from './colors';
import fonts from './fonts';

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
    backgroundColor: `rgb(${colors.background})`
  },
  textBox: {
    background: `rgba(${colors.hsb},0.8)`,
    padding: 20,
    fontSize: 40,
    fontFamily: fonts.AvenirNextCondensed,
    color:  colors.white
  }
};
