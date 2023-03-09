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
  const b = a / Friction;
  const DuctDia = Math.pow(b, 1 / 4.973);
  const VelocityCircle = Airvolume / (0.785398 * Math.pow(DuctDia, 2));
  const VelocityRectangle = Airvolume / (DuctHeight * DuctHeight * 2);

  if (units === 'siUnits') {
    return {
      ductDiamaeter: DuctDia.toFixed(2),
      ductWidth: (DuctHeight * 2).toFixed(2),
      velocityCircular: VelocityCircle.toFixed(2),
      velocityRectangular: VelocityRectangle.toFixed(2),
      mmHeight: (DuctHeight * 1000).toFixed(2),
      mmWidth: (DuctHeight * 2 * 1000).toFixed(2),
    };
  } else {
    return {
      ductDiamaeter: (DuctDia * 39.3701).toFixed(2),
      ductWidth: (DuctHeight * 2 * 39.3701).toFixed(2),
      velocityCircular: (VelocityCircle * 196.85).toFixed(2),
      velocityRectangular: (VelocityRectangle * 196.85).toFixed(2),
      mmHeight: (DuctHeight * 25.4).toFixed(2),
      mmWidth: (DuctHeight * 2 * 25.4).toFixed(2),
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
  const FrictionCircle =
    (0.01422 * Math.pow(Velocity, 1.852)) / Math.pow(DuctDia, 1.269);
  const f =
    FrictionCircle * (DuctDia / 2) * (1 / (1.2 * Math.pow(Velocity, 2)));
  const m = (DuctHeight * DuctWidth) / (2 * (DuctHeight + DuctWidth));

  const FrictionRectangle = (f * 1.2 * Math.pow(Velocity, 2)) / (2 * m);

  if (units === 'siUnits') {
    try {
      return {
        ductDiamaeter: DuctDia.toFixed(2),
        ductWidth: DuctWidth.toFixed(2),
        frictionCircular: FrictionCircle.toFixed(2),
        frictionRectangular: FrictionRectangle.toFixed(2),
        mmHeight: (DuctHeight * 1000).toFixed(2),
        mmWidth: (DuctHeight * 2 * 1000).toFixed(2),
      };
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      return {
        ductDiamaeter: (DuctDia * 39.3701).toFixed(2),
        ductWidth: (DuctWidth * 39.3701).toFixed(),
        frictionCircular: (FrictionCircle * 0.12).toFixed(2),
        frictionRectangular: (FrictionRectangle * 0.12).toFixed(2),
        mmHeight: (DuctHeight * 25.4).toFixed(2),
        mmWidth: (DuctHeight * 2 * 25.4).toFixed(2),
      };
    } catch (e) {
      console.log('e', e);
    }
  }
}
