export const AIR_FLOW_MUL = 3;
export const AC_LOAD_DIV = 400;
export const SPIRAL_DUCT_MUL = 55;
export const OVAL_DUCT_MUL = 60;
export const REACTANGLE_DUCT_MUL = 65;
export const PREINSULATED_DUCT_MUL = 400;
export const FABRIC_DUCT_MUL = 40;
export const SS_RECTANGULAR_DUCT_MUL = 400;

export const SPIRAL_PARAMS = {
  RAW_MATERIAL_COST: 1808652,
  INSULATION_COST: 609235,
  ADP_COST: 399190,
  LPS_COST: 547000,
  STORAGE_AREA: 'Medium',
  EASE_INST: 'Medium',
  INST_DURA: 'Medium',
  MAINTAN_COST: 'Medium',
};
export const OVAL_PARAMS = {
  RAW_MATERIAL_COST: 2630767,
  INSULATION_COST: 664620,
  ADP_COST: 401280,
  LPS_COST: 596727,
  STORAGE_AREA: 'Medium',
  EASE_INST: 'Medium',
  INST_DURA: 'Medium',
  MAINTAN_COST: 'Higher',
};
export const RECTANGULAR_PARAMS = {
  RAW_MATERIAL_COST: 1583332,
  INSULATION_COST: 720005,
  ADP_COST: 340670,
  LPS_COST: 646454,
  STORAGE_AREA: 'Higher',
  EASE_INST: 'Higher',
  INST_DURA: 'Higher',
  MAINTAN_COST: 'Higher',
};
export const PREINSULATED_PARAMS = {
  RAW_MATERIAL_COST: 1206348,
  INSULATION_COST: 0,
  ADP_COST: 340670,
  LPS_COST: 298870,
  STORAGE_AREA: 'Medium',
  EASE_INST: 'Medium',
  INST_DURA: 'Medium',
  MAINTAN_COST: 'Higher',
};
export const FABRIC_PARAMS = {
  RAW_MATERIAL_COST: 1567500,
  INSULATION_COST: 0,
  ADP_COST: 0,
  LPS_COST: 188100,
  STORAGE_AREA: 'Low',
  EASE_INST: 'Low',
  INST_DURA: 'Low',
  MAINTAN_COST: 'HiLowgher',
};
export const SSDUCTING_PARAMS = {
  RAW_MATERIAL_COST: 9499991,
  INSULATION_COST: 720005,
  ADP_COST: 681340,
  LPS_COST: 617583,
  STORAGE_AREA: 'Medium',
  EASE_INST: 'Medium',
  INST_DURA: 'Medium',
  MAINTAN_COST: 'Medium',
};

export const DEFAULT_PARAMS = {
  RAW_MATERIAL_COST: 0,
  INSULATION_COST: 0,
  ADP_COST: 0,
  LPS_COST: 0,
  STORAGE_AREA: '',
  EASE_INST: '',
  INST_DURA: '',
  MAINTAN_COST: '',
};

export const WEIGHT_KG = {
  Spiral: 5550,
  Oval: 6054,
  Rectangle: 6559,
  Preinsulated: 1359,
  Fabric: 656,
  'SS Rectangle': 6898,
};

export const SQM_DIV = 10.76;

export const UNIT_ARR = ['SQ.FT', 'SQ.M'];
