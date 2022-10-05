const background = hex2rgb('#000000');
const hsb = rgb2hsv(background[0], background[1], background[2]);
const box = hsbTorgb(hsb[0], hsb[1] / 2, hsb[2] + 30);
const darkbox = hsbTorgb(hsb[0], hsb[1] / 2, hsb[2] + 12);
const primary = '#1e938a';
const secondary = '#004884';
const white20 = 'rgba(255, 255, 255, 0.2)';
const dark = '#EAEAEA';
const light = '#1e1e1e';
const text = getColorByBgColor('#000000');

function getColorByBgColor(bgColor: string) {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? light : dark;
}

function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [Math.abs(r), Math.abs(g), Math.abs(b)]
}

function hsbTorgb(h: number, s: number, b: number) {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [Math.abs(Math.round(255 * f(5))), Math.abs(Math.round(255 * f(3))), Math.abs(Math.round(255 * f(1)))];
}

function rgb2hsv(r: number, g: number, b: number) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

export default {
  black: '#000000',
  white: '#ffffff',
  white20,
  background,
  primary,
  secondary,
  dark,
  light,
  box,
  darkbox,
  hsb,
  text
};