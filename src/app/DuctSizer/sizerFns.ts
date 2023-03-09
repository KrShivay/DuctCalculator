import {
  AC_LOAD_DIV,
  AIR_FLOW_MUL,
  FABRIC_DUCT_MUL,
  FABRIC_PARAMS,
  OVAL_DUCT_MUL,
  OVAL_PARAMS,
  PREINSULATED_DUCT_MUL,
  PREINSULATED_PARAMS,
  REACTANGLE_DUCT_MUL,
  RECTANGULAR_PARAMS,
  SPIRAL_DUCT_MUL,
  SPIRAL_PARAMS,
  SQM_DIV,
  SSDUCTING_PARAMS,
  SS_RECTANGULAR_DUCT_MUL,
} from '../../data/ductSizerData';

export type sData = {
  airFlow: string;
  acLoad: string;
  hvacCosting: {
    ductQnty: string;
  };
  giCosting: {
    rawMaterial: string;
    insulation: string;
    adp: string;
    lps: string;
    totalCost: string;
  };
};

export type hvacData = {
  ductQnty: string;
};
export type giData = {
  rawMaterial: number;
  insulation: number;
  adp: number;
  lps: number;
};

export const labelArr = [
  'Tentative Air Flow',
  'AC Load',
  'Spiral Duct Quantity',
  'Oval Duct Quantity',
  'Rectangular Duct Quantity',
  'PreInsulated Duct Quantity',
  'Fabric Duct Quantity',
  'SS Rectangular Duct Quantity',
];

export const ductTypeArr = [
  'Rectangle',
  'Oval',
  'Spiral',
  'Preinsulated',
  'Fabric',
  'SS Rectangle',
];

export const GIDuctLabel = [
  'Raw Material Cost',
  'Insulation Cost',
  'ADP (SA,RA,VCD) Cost',
  'Labour, Painting and Supports Cost',
  'Total Cost',
];

export const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatter = new Intl.NumberFormat('en-IN');

export function isNumeric(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  } // we only process strings!
  return (
    !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

export function getDuctQnty(acLoad: number, unit: string): any {
  const divisor = unit === 'SQ.M' ? SQM_DIV : 1;
  return {
    Rectangle: formatter.format((REACTANGLE_DUCT_MUL * acLoad) / divisor),
    Oval: formatter.format((OVAL_DUCT_MUL * acLoad) / divisor),
    Spiral: formatter.format((SPIRAL_DUCT_MUL * acLoad) / divisor),
    Preinsulated: formatter.format((PREINSULATED_DUCT_MUL * acLoad) / divisor),
    Fabric: formatter.format((FABRIC_DUCT_MUL * acLoad) / divisor),
    'SS Rectangle': formatter.format(
      (SS_RECTANGULAR_DUCT_MUL * acLoad) / divisor,
    ),
  };
}

export function getGiSubCosting(
  obj: {
    RAW_MATERIAL_COST: number;
    INSULATION_COST: number;
    ADP_COST: number;
    LPS_COST: number;
  },
  floorArea: number,
) {
  // const totalCost =
  //   obj.RAW_MATERIAL_COST * floorArea ??
  //   0 + obj.INSULATION_COST * floorArea ??
  //   0 + obj.ADP_COST * floorArea ??
  //   0 + obj.LPS_COST * floorArea ??
  //   0;
  // 'Total Cost': inrFormatter.format(totalCost),
  return {
    'INR/SQ.FT': inrFormatter.format(obj.RAW_MATERIAL_COST * floorArea ?? 0),
    'Weight(kg)': inrFormatter.format(obj.INSULATION_COST * floorArea ?? 0),
    'INR/cmf': inrFormatter.format(obj.ADP_COST * floorArea ?? 0),
    'INR/SQ.FT floor area': inrFormatter.format(obj.LPS_COST * floorArea ?? 0),
    'Storage Area': '',
    'Ease of Installation': '',
    'Installation Duration': '',
    Maintainance: '',
  };
}

export function getGiConsting(floorArea: number): any {
  return {
    Rectangle: getGiSubCosting(RECTANGULAR_PARAMS, floorArea),
    Oval: getGiSubCosting(OVAL_PARAMS, floorArea),
    Spiral: getGiSubCosting(SPIRAL_PARAMS, floorArea),
    Preinsulated: getGiSubCosting(PREINSULATED_PARAMS, floorArea),
    Fabric: getGiSubCosting(FABRIC_PARAMS, floorArea),
    'SS Rectangle': getGiSubCosting(SSDUCTING_PARAMS, floorArea),
  };
}

export function calculateCosting(
  floorArea: string,
  ductType: string,
  unit: string,
): any {
  if (floorArea && isNumeric(floorArea)) {
    let airFlow = parseInt(floorArea, 10) * AIR_FLOW_MUL;
    let acLoad = airFlow / AC_LOAD_DIV;
    let ductQnty = getDuctQnty(acLoad, unit);

    const data = {
      airFlow: formatter.format(airFlow),
      acLoad: formatter.format(acLoad),
      hvacCosting: {
        ductQnty,
      },
      giCosting: getGiConsting(parseFloat(floorArea)),
    };
    return data;
  } else {
    return;
  }
}
