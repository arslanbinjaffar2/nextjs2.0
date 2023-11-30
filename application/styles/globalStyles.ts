
export default function gStyle (colors:any){
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      flex: 1,
      backgroundColor: `rgba(${colors.background},1)`,
      height: '100%'
    },
    bgContainer: {
      backgroundColor: `rgba(${colors.background},0.8)`,
    },
    flex1: {
      flex: 1
    },
    blur: {
      backdropFilter: 'blur(10px)'
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
}

