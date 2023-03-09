import {
  AC_LOAD_DIV,
  AIR_FLOW_MUL,
  DEFAULT_PARAMS,
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

export function getDuctQnty(type: string, acLoad: number): number {
  switch (type) {
    case 'Rectangle':
      return REACTANGLE_DUCT_MUL * acLoad;
    case 'Oval':
      return OVAL_DUCT_MUL * acLoad;
    case 'Spiral':
      return SPIRAL_DUCT_MUL * acLoad;
    case 'Preinsulated':
      return PREINSULATED_DUCT_MUL * acLoad;
    case 'Fabric':
      return FABRIC_DUCT_MUL * acLoad;
    case 'SS Rectangle':
      return SS_RECTANGULAR_DUCT_MUL * acLoad;
    default:
      return 0;
  }
}

export function getGiSubCosting(obj: {
  RAW_MATERIAL_COST: number;
  INSULATION_COST: number;
  ADP_COST: number;
  LPS_COST: number;
}) {
  const totalCost =
    obj.RAW_MATERIAL_COST ??
    0 + obj.INSULATION_COST ??
    0 + obj.ADP_COST ??
    0 + obj.LPS_COST ??
    0;
  return {
    rawMaterial: inrFormatter.format(obj.RAW_MATERIAL_COST ?? 0),
    insulation: inrFormatter.format(obj.INSULATION_COST ?? 0),
    adp: inrFormatter.format(obj.ADP_COST ?? 0),
    lps: inrFormatter.format(obj.LPS_COST ?? 0),
    totalCost: inrFormatter.format(totalCost),
  };
}

export function getGiConsting(type: string): {
  rawMaterial: string;
  insulation: string;
  adp: string;
  lps: string;
  totalCost: string;
} {
  switch (type) {
    case 'Rectangle':
      return getGiSubCosting(RECTANGULAR_PARAMS);
    case 'Oval':
      return getGiSubCosting(OVAL_PARAMS);
    case 'Spiral':
      return getGiSubCosting(SPIRAL_PARAMS);
    case 'Preinsulated':
      return getGiSubCosting(PREINSULATED_PARAMS);
    case 'Fabric':
      return getGiSubCosting(FABRIC_PARAMS);
    case 'SS Rectangle':
      return getGiSubCosting(SSDUCTING_PARAMS);
    default:
      return getGiSubCosting(DEFAULT_PARAMS);
  }
}

export function calculateCosting(
  floorArea: string,
  ductType: string,
  unit: string,
):
  | undefined
  | {
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
    } {
  if (floorArea && isNumeric(floorArea)) {
    let airFlow = parseInt(floorArea, 10) * AIR_FLOW_MUL;
    let acLoad = airFlow / AC_LOAD_DIV;
    let ductQnty = getDuctQnty(ductType, acLoad);
    if (unit === 'SQ.M') {
      ductQnty = ductQnty / SQM_DIV;
    }
    const data = {
      airFlow: formatter.format(airFlow),
      acLoad: formatter.format(acLoad),
      hvacCosting: {
        ductQnty: formatter.format(ductQnty),
      },
      giCosting: getGiConsting(ductType),
    };
    return data;
  } else {
    return;
  }
}
