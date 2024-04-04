import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import preloadImages from './preloadImages';

function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [Math.abs(r), Math.abs(g), Math.abs(b)]
}
var colourIsLight = function (r:any, g:any, b: any) {
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return (a < 0.5);
}

const cacheImages = (images: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.values(images).map((image: any) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
};

const loadAssetsAsync = async () => {
  const imageAssets = cacheImages(preloadImages);
  return Promise.all([...imageAssets]);
};

const colorType = (code: any) => {
   const rgb = hex2rgb(code ?? '#343d50');
   const type = colourIsLight(rgb[0],rgb[1],rgb[2]) ? '#1e1e1e' : '#EAEAEA';
   return type
}

export default {
  cacheImages,
  loadAssetsAsync,
  colorType
};
