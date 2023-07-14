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
  SPIRAL_PARAMSW,
  RECTANGULAR_PARAMSW,
  OVAL_PARAMSW,
  PREINSULATED_PARAMSW,
  FABRIC_PARAMSW,
  SSDUCTING_PARAMSW,
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
  console.log('<<<<>>>>>>>>divisor', divisor);
  console.log('<<<<>>>>>>>>REACTANGLE_DUCT_MUL', formatter.format((REACTANGLE_DUCT_MUL * acLoad) / divisor));

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


export function getGiSubWeight(
  floorArea: number,
  airFlow: any,
  ductQnty: any,
  acLoad : any,
  unit : string,

) {
  return {
    Spiral: getGiSubWeight1(SPIRAL_PARAMSW,floorArea,airFlow,ductQnty['Spiral'],"Spiral",acLoad,unit,),
    Rectangle: getGiSubWeight1(RECTANGULAR_PARAMSW,floorArea,airFlow,ductQnty['Rectangle'],"Rectangle",acLoad,unit,),
    Oval: getGiSubWeight1(OVAL_PARAMSW,floorArea,airFlow,ductQnty['Oval'],"Oval",acLoad,unit,),
    Preinsulated: getGiSubWeight1(PREINSULATED_PARAMSW,floorArea,airFlow,ductQnty['Preinsulated'],"Preinsulated",acLoad,unit,),
    Fabric: getGiSubWeight2(FABRIC_PARAMSW,floorArea,airFlow,ductQnty['Fabric'],"Fabric",ductQnty['Rectangle'],acLoad,unit,),
    'SS Rectangle': getGiSubWeight1(SSDUCTING_PARAMSW,floorArea,airFlow,ductQnty['SS Rectangle'],"SS Rectangle",acLoad,unit,),
   
  };
}

export function getGiSubWeight1(
  obj: {
    Factory_fabricated_22: number;
    Material_Wastage_11: number;
    Factory_fabricated: number;
    Material_Wastage: number;
    mm13_thick_Nitrile: number;
    mm10_Nitrile_Rubber: number;
    SupplyAir_Diffusers: number;
    Volume_control_dampers: number;
    Painting: number;
    MS_Supports: number;
    Labour_for_installation: number;
  },
  floorArea: number,
  airFlow: number,
  ductQnty: string,
  ducttype: string,
  acLoad: any,
  unit: string,
) {
  const divisor = unit === 'SQ.M' ? SQM_DIV : 1;

 let ductQnty1= +ductQnty.replace(',','');
  let returnval=+((ductQnty1  / divisor) * .20 *0.578) + +((ductQnty1  / divisor) * .80 *0.459);

  if(ducttype == 'Preinsulated'){
    returnval=+((ductQnty1  / divisor)  *0.1);
  } if(ducttype == 'SS Rectangle'){
    returnval=+((ductQnty1  / divisor) * .20 *0.635) + +((ductQnty1  / divisor) * .80 *0.476);
  }  

// amount

  let amt = + ((ductQnty1 / divisor) * .20)  *  +((obj.Factory_fabricated * .25) +  +obj.Factory_fabricated);
  let amt1 = + (((ductQnty1 / divisor) * .20) * .11)   *  +((obj.Material_Wastage * .25) +  +obj.Material_Wastage);
  let amt2 = + ((ductQnty1 / divisor) * .80)    *  +obj.Factory_fabricated;
  let amt3 = + (((ductQnty1 / divisor) * .80) * .11)    *  +obj.Material_Wastage;
  let amt4 = + (((ductQnty1 / divisor) * .80) )    *  +obj.mm13_thick_Nitrile;
  let amt5 = + (((ductQnty1 / divisor) * .20) )    *  +obj.mm10_Nitrile_Rubber;
  let amt6 = + (((acLoad)) )    *  +obj.SupplyAir_Diffusers;
  let amt7 = + (((ductQnty1 / divisor) ) )    *  +obj.Volume_control_dampers;
  let amt8 = + (((ductQnty1 / divisor) ) )    *  +obj.Painting;
  let amt9 = + (((returnval) * 0.0412) )    *  +obj.MS_Supports;
  let amt10 = + (((ductQnty1 / divisor) ) )    *  +obj.Labour_for_installation;

  if(ducttype == 'Preinsulated'){
     amt = + ((ductQnty1 / divisor) )  *  + (obj.Factory_fabricated_22);
     amt1 = + (((ductQnty1 / divisor)) * .11)   *  +(obj.Material_Wastage_11);
     amt2 = + 0;
     amt3 = + 0;
     amt4 = + 0;
     amt5 = + 0;
     amt6 = + (((acLoad)) )    *  +obj.SupplyAir_Diffusers;
     amt7 = + (((ductQnty1 / divisor) ) )    *  +obj.Volume_control_dampers;
     amt8 = + 0;
     amt9 = + (((returnval) * 0.05) )    *  +obj.MS_Supports;
     amt10 = + (((ductQnty1 / divisor) ) )    *  +obj.Labour_for_installation;
  }else   if(ducttype == 'Fabric'){
    amt = + ((ductQnty1 / divisor) )  *  + (obj.Factory_fabricated_22);
    amt1 = + 0;
    amt2 = + 0;
    amt3 = + 0;
    amt4 = + 0;
    amt5 = + 0;
    amt6 = + 0;
    amt7 = + 0;
    amt8 = + 0;
    amt9 = + 0;
    amt10 = + (((ductQnty1 / divisor) ) )    *  +obj.Labour_for_installation;
 }
 
    return {
      "WEIGHT" : returnval,
      "AMOUNT" : Math.round(amt + amt1 + amt2 + amt3 + amt4 + amt5 + amt6 + amt7 + amt8 + amt9 + amt10),
    };

}

export function getGiSubWeight2(
  obj: {
    Factory_fabricated_22: number;
    Material_Wastage_11: number;
    Factory_fabricated: number;
    Material_Wastage: number;
    mm13_thick_Nitrile: number;
    mm10_Nitrile_Rubber: number;
    SupplyAir_Diffusers: number;
    Volume_control_dampers: number;
    Painting: number;
    MS_Supports: number;
    Labour_for_installation: number;
  },
  floorArea: number,
  airFlow: number,
  ductQnty: string,
  ducttype: string,
  ductQntyR: string,
  acLoad: any,
  unit: string,
) 
{
  const divisor = unit === 'SQ.M' ? SQM_DIV : 1;

  let ductQnty1= +ductQnty.replace(',','');
  let ductQntyR1= +ductQntyR.replace(',','');
  let returnval=+((ductQntyR1  / divisor) * .20 *0.578) + +((ductQntyR1  / divisor) * .80 *0.459);
  
  let amt = + ((ductQnty1 / divisor) )  *  + (obj.Factory_fabricated_22);
  let amt1 = +  0;
  let amt2 = + 0;
  let amt3 = + 0;
  let amt4 = + 0;
  let amt5 = + 0;
  let amt6 = + 0;
  let amt7 = + 0;
  let amt8 = + 0;
  let amt9 = + 0;
  let amt10 = + (((ductQnty1  / divisor) ) )    *  +obj.Labour_for_installation;

  return {
      "WEIGHT" : + returnval * .1,
      "AMOUNT" : Math.round(amt + amt1 + amt2 + amt3 + amt4 + amt5 + amt6 + amt7 + amt8 + amt9 + amt10),
    };

}


export function getGiConsting(
  floorArea: number,
  airFlow: any,
  ductQnty: any,
  ductWeight: any,
  unit : string,
): any {
  //console.log('<<<<>>>>>>>>', {ductQnty});
  console.log('<<<<>>>>>>>>', {ductWeight});
  console.log('<<<<>>>>>>>>', ductWeight['Fabric']);
  console.log('<<<<>>>>>>>>', ductWeight['Fabric']['AMOUNT']);

  const divisor = unit === 'SQ.M' ? SQM_DIV : 1;


  
  return {
    Rectangle: getGiSubCosting(RECTANGULAR_PARAMS,floorArea,airFlow,ductQnty['Rectangle'],ductWeight['Rectangle']['AMOUNT'],ductWeight['Rectangle']['WEIGHT'],unit),
    Oval: getGiSubCosting(OVAL_PARAMS, floorArea, airFlow, ductQnty['Oval'],ductWeight['Oval']['AMOUNT'],ductWeight['Oval']['WEIGHT'],unit),
    Spiral: getGiSubCosting(
      SPIRAL_PARAMS,
      floorArea,
      airFlow,
      ductQnty['Spiral'],ductWeight['Spiral']['AMOUNT'],ductWeight['Spiral']['WEIGHT'],unit,
    ),
    Preinsulated: getGiSubCosting(
      PREINSULATED_PARAMS,
      floorArea,
      airFlow,
      ductQnty['Preinsulated'],ductWeight['Preinsulated']['AMOUNT'],ductWeight['Preinsulated']['WEIGHT'],unit,
    ),
    Fabric: getGiSubCosting(
      FABRIC_PARAMS,
      floorArea,
      airFlow,
      ductQnty['Fabric'],ductWeight['Fabric']['AMOUNT'],ductWeight['Fabric']['WEIGHT'],unit,
    ),
    'SS Rectangle': getGiSubCosting(
      SSDUCTING_PARAMS,
      floorArea,
      airFlow,
      ductQnty['SS Rectangle'],ductWeight['SS Rectangle']['AMOUNT'],ductWeight['SS Rectangle']['WEIGHT'],unit,
    ),
  };
}

export function getGiSubCosting(
  obj: {
    RAW_MATERIAL_COST: number;
    INSULATION_COST: number;
    ADP_COST: number;
    LPS_COST: number;
    STORAGE_AREA: String;
    EASE_INST: String;
    INST_DURA: String;
    MAINTAN_COST: String;
  },
  floorArea: number,
  airFlow: number,
  ductQnty: string,
  amount: number,
  weight: number,
  unit : string,
) {

  let unit1="INR/" + unit ;

 let ductQnty1= +ductQnty.replace(',','');

if( unit === 'SQ.M'){
  return {
    'Total Duct Quantity': ductQnty,
    'INR/SQ.M': Math.round(amount / ductQnty1),
    'Weight(kg)': Math.round(weight),
    'INR/cmf': Math.round(amount / airFlow),
    'INR/SQ.M Floor Area': Math.round(amount / floorArea),
    'Storage Area': obj.STORAGE_AREA,
    'Ease of Installation': obj.EASE_INST,
    'Installation Duration': obj.INST_DURA,
    'Maintainance Cost': obj.MAINTAN_COST,
  };
} else{
    return {
      'Total Duct Quantity': ductQnty,
      'INR/SQ.FT': Math.round(amount / ductQnty1),
      'Weight(kg)': Math.round(weight),
      'INR/cmf': Math.round(amount / airFlow),
      'INR/SQ.FT Floor Area': Math.round(amount / floorArea),
      'Storage Area': obj.STORAGE_AREA,
      'Ease of Installation': obj.EASE_INST,
      'Installation Duration': obj.INST_DURA,
      'Maintainance Cost': obj.MAINTAN_COST,
    };
  }
}
export function calculateCosting(
  floorArea: string,
  ductType: string,
  unit: string,
): any {
  if (floorArea && isNumeric(floorArea)) {
    let airFlow = parseInt(floorArea, 10) * AIR_FLOW_MUL;
    let acLoad = airFlow / AC_LOAD_DIV;
    console.log('<<<<>>>>>>>>unit', unit);
    console.log('<<<<>>>>>>>>acLoad', acLoad);

    let ductQnty = getDuctQnty(acLoad, unit);

    let ductWeight =getGiSubWeight(parseFloat(floorArea), airFlow, ductQnty,acLoad,unit);

    const data = {
      airFlow: formatter.format(airFlow),
      acLoad: formatter.format(acLoad),
      hvacCosting: {
        ductQnty,
      },
      giCosting: getGiConsting(parseFloat(floorArea), airFlow, ductQnty,ductWeight,unit),
    };
    return data;
  } else {
    return;
  }
}
