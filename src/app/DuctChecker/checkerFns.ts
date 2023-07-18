import Complex from 'complex.js';
import math from 'math.js';

export const SolveCubic = (a, b, c, d) => {
  const NRoots = 3;

  const SquareRootof3 = Math.sqrt(3);

  const List = [
    new Complex(1, 0),
    new Complex(-0.5, -SquareRootof3 / 2.0),
    new Complex(-0.5, SquareRootof3 / 2.0),
  ];

  console.log({SquareRootof3});

  const DELTA =
    18 * a * b * c * d -
    4 * b * b * b * d +
    b * b * c * c -
    4 * a * c * c * c -
    27 * a * a * d * d;
  const DELTA0 = b * b - 3 * a * c;
  const DELTA1 = 2 * b * b * b - 9 * a * b * c + 27 * a * a * d;
  const DELTA2 = new Complex(-27 * a * a * DELTA);

  console.log({DELTA});
  console.log({DELTA0});
  console.log({DELTA1});
  console.log({DELTA2});

  console.log({DELTA, DELTA0, DELTA1, DELTA2});

  //const C =  Complex.ZERO.pow((DELTA1 + Complex.ZERO.pow(DELTA2, 0.5)) / 2, 1 / 3.0);
  const C = math.pow(parseFloat(DELTA1 + math.pow(DELTA2, 0.5)) / 2, 1 / 3.0);

  console.log({C});

  const r = [];
  for (var i = 0; i < 3; i++) {
    const M = new Complex(List[i] * C);
    const Root = new Complex((-1.0 / (3 * a)) * (b + M + DELTA0 / M));
    r.push(Root);
  }
  return r;
};

export default function calculateChecker(
  units: string,
  calMethod: string,
  airVolume: string,
  frictionRate: string,
  velocity: string,
  ductHeight: string,
) {
  // SolveEquation(-1, 0, c, d);

  let aV = parseFloat(airVolume);
  let fR = parseFloat(frictionRate);
  let vR = parseFloat(velocity);
  let dH = parseFloat(ductHeight);
  if (calMethod === 'frictionRate') {
    if (units === 'siUnits') {
      const data = fricationMethodCalculation(aV, fR, dH, units);
      return data;
    }
    if (units === 'britishUnits') {
      aV = aV / 2118.88;
      fR = fR / 0.12;
      dH = dH / 39.3701;
      const data = fricationMethodCalculation(aV, fR, dH, units);
      return data;
      // txt_Width1 = parseFloat(txt_DuctWidth) * 25.4;
      // txt_Height1 = parseFloat(txt_DuctHeight) * 25.4;
    }
  }

  if (calMethod === 'velocity') {
    if (units === 'siUnits') {
      const data = velocityMethodCalculation(aV, vR, dH, units);
      return data;
      // txt_Width1 = parseFloat(txt_DuctWidth) * 1000;
      // txt_Height1 = parseFloat(txt_DuctHeight) * 1000;
    }
    if (units === 'britishUnits') {
      aV = aV / 2118.88;
      vR = vR / 196.85;
      dH = dH / 39.3701;
      const data = velocityMethodCalculation(aV, vR, dH, units);
      return data;
    }
  }
}

export function fricationMethodCalculation(
  airVol: number,
  frcRt: number,
  dctHt: number,
  units: string,
) {
  const Airvolume = airVol;
  const Friction = frcRt;
  const DuctHeight = dctHt;
  const a = 0.022243 * Math.pow(Airvolume, 1.852);
  const b = (a / Friction).toExponential();
  const DuctDia = Math.pow(b, 1 / 4.973);
  const z = Math.pow(DuctDia / 1.265, 5).toExponential();

  const c = (z / Math.pow(DuctHeight, 3)).toExponential();

  const d = (z / Math.pow(DuctHeight, 2)).toExponential();
  console.log({DuctDia, a, z, c, d});

  const root = SolveCubic(-1, 0, c, d);
  console.log({root});
  const Re = Math.abs(root[0]);
  console.log({Re});

  const DuctWidth = Re?.toString();
  console.log({DuctWidth});

  const VelocityCircle = Airvolume / (0.785398 * Math.pow(DuctDia, 2));
  const VelocityRectangle = Airvolume / (DuctHeight * DuctWidth);
  console.log('fricationMethodCalculation', {
    Airvolume,
    Friction,
    DuctHeight,
    DuctWidth,
    VelocityCircle,
    VelocityRectangle,
  });
  if (units === 'siUnits') {
    console.log(
      "('<<<<<<<<<>>>>>>>>>>>' +fricationMethodCalculation",
      'siUnits',
    );

    return {
      ductDiamaeter: DuctDia.toFixed(2),
      ductWidth: (DuctHeight * 2).toFixed(2),
      velocityCircular: VelocityCircle.toFixed(2),
      velocityRectangular: VelocityRectangle.toFixed(2),
      mmHeight: (DuctHeight * 1000).toFixed(2),
      mmWidth: Number(DuctWidth)?.toFixed(2),
    };
  } else {
    console.log(
      "('<<<<<<<<<>>>>>>>>>>>' +fricationMethodCalculation",
      'siUnits else',
    );

    return {
      ductDiamaeter: (DuctDia * 39.3701).toFixed(2),
      ductWidth: (DuctHeight * 2 * 39.3701).toFixed(2),
      velocityCircular: (VelocityCircle * 196.85).toFixed(2),
      velocityRectangular: (
        (Airvolume / (DuctHeight * DuctWidth)) *
        196.85
      ).toFixed(2),
      mmHeight: (DuctHeight * 1000).toFixed(2),
      mmWidth: (Number(DuctWidth) * 39.3701)?.toFixed(2),
    };
  }
}

export function velocityMethodCalculation(
  airVol: number,
  vc: number,
  dctHt: number,
  units: string,
) {
  const AirVolume = airVol;
  const Velocity = vc;
  const DuctHeight = dctHt;
  const DuctDia = Math.pow(1.2732 * (AirVolume / Velocity), 0.5);
  const DuctWidth = AirVolume / Velocity / DuctHeight;

  console.log('velocityMethodCalculation', {
    AirVolume,
    Velocity,
    DuctWidth,
    DuctHeight,
    DuctWidth,
  });

  const FrictionCircle =
    (0.01422 * Math.pow(Velocity, 1.852)) / Math.pow(DuctDia, 1.269);
  const f =
    FrictionCircle * (DuctDia / 2) * (1 / (1.2 * Math.pow(Velocity, 2)));
  const m = (DuctHeight * DuctWidth) / (2 * (DuctHeight + DuctWidth));

  const FrictionRectangle = (f * 1.2 * Math.pow(Velocity, 2)) / (2 * m);
  if (units === 'siUnits') {
    try {
      console.log(
        "('<<<<<<<<<>>>>>>>>>>>' +velocityMethodCalculation",
        'siUnits',
      );
      return {
        ductDiamaeter: DuctDia.toFixed(2),
        ductWidth: DuctWidth.toFixed(2),
        frictionCircular: FrictionCircle.toFixed(2),
        frictionRectangular: FrictionRectangle.toFixed(2),
        mmHeight: (DuctHeight * 1000).toFixed(2),
        mmWidth: DuctWidth?.toFixed(2),
      };
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      console.log(
        "('<<<<<<<<<>>>>>>>>>>>' +velocityMethodCalculation",
        'siUnits else',
      );
      return {
        ductDiamaeter: (DuctDia * 39.3701).toFixed(2),
        ductWidth: (DuctWidth * 39.3701).toFixed(2),
        frictionCircular: (FrictionCircle * 0.12).toFixed(2),
        frictionRectangular: (FrictionRectangle * 0.12).toFixed(2),
        mmHeight: (DuctHeight * 1000).toFixed(2),
        mmWidth: (Number(DuctWidth) * 39.3701)?.toFixed(2),
      };
    } catch (e) {
      console.log('e', e);
    }
  }
}
