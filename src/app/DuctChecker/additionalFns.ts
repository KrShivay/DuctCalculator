export const calculateOutputData = (
  h1: string,
  h2: string,
  w1: string,
  w2: string,
  l: string,
  s: string,
  q: string,
) => {
  let peri = 0;
  let area = 0;
  let swg22 = 0;
  let swg24 = 0;
  if (s === 'Streight') {
    peri = (parseFloat(h1) + parseFloat(w1)) * 2;
    area = (2 * (parseFloat(h1) + parseFloat(w1)) * parseFloat(l)) / 1000000;
  } else if (s === 'Dropper') {
    peri = (parseFloat(h1) + parseFloat(w1)) * 2;
    area =
      (2 * (parseFloat(h1) + parseFloat(w1)) * peri +
        (parseFloat(h1) + parseFloat(w1))) /
      (1000000 * parseFloat(l));
  } else if (s === 'Taper') {
    peri =
      parseFloat(h1) + parseFloat(w1) + (parseFloat(h1) + parseFloat(w2)) * 2;
    area =
      ((parseFloat(h1) + parseFloat(w1) + parseFloat(h2) + parseFloat(w2)) *
        parseFloat(l)) /
      1000000;
  } else if (s === 'Elbow') {
    peri = (parseFloat(h1) + parseFloat(w1)) * 2;
    area = (2 * (parseFloat(h1) + parseFloat(w1)) * parseFloat(l)) / 1000000;
  } else if (s === 'End Piece') {
    peri =
      parseFloat(h1) + parseFloat(w1) + (parseFloat(h1) + parseFloat(w2)) * 2;
    area = (parseFloat(h1) * parseFloat(w1)) / (1000000 * parseFloat(q));
  } else {
    peri = (parseFloat(h1) + parseFloat(w1)) * 2;
    area = ((peri * parseFloat(l)) / 1000000) * parseFloat(q);
  }

  if (parseFloat(w1) > 751 && parseFloat(w1) <= 1500) {
    swg22 = area;
  } else if (parseFloat(w1) > 0 && parseFloat(w1) <= 750) {
    swg24 = area;
  } else {
    swg22 = 0;
    swg24 = 0;
  }
  const msAngle = (((peri + 170) * 1.8 * 2) / 1000) * parseFloat(q);

  return {
    Perimeter: peri.toFixed(2),
    Area: area.toFixed(2),
    'MS Angle': msAngle.toFixed(2),
    '22SWG': swg22.toFixed(2),
    '24SWG': swg24.toFixed(2),
  };
};
