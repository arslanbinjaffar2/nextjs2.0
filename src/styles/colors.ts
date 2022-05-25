/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
const background = hex2rgb('#3d4a61');
const hsb = rgb2hsv(background[0],background[1],background[2]);
//const box = hsbTorgb(hsb[0],hsb[1]/2,hsb[2]+20);
const primary = '#1C9DE0';
const secondary = '#d0ccd0';
const white20 = 'rgba(255, 255, 255, 0.2)';
const dark = '#dedede';
const light = '#1e1e1e';
const text = getColorByBgColor(`rgb(${background})`);

export default {
  black: '#000000',
  white: '#ffffff',
  white20,

  background,
  primary,
  secondary,
  dark,
  light,
  //box,
  hsb,
  text
};


function getColorByBgColor(bgColor: string) {
  if (!bgColor) { return ''; }
  return (parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2) ? light : dark;
}
function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  // return {r, g, b} // return an object
  return [r, g, b]
}
const hsbTorgb = (h: number, s: number, b: number) => {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [Math.round(255 * f(5)), Math.round(255 * f(3)), Math.round(255 * f(1))];
};
function rgb2hsv(r: number, g: number, b: number) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v: number, diff: number, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
  diff = v - Math.min(rabs, gabs, babs);
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num: number) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)]
}