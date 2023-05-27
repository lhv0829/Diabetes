export const APP_ID = 'b9605800';
// export const API_KEY = 'abddbd433e34500cb14222d89970de2e';
export const NUT_API_KEY = '16d2939aea4ec0e0b8c5b540dfb8026a';
export const SPOON_API_KEY = '6a397dc240e6428fb2c9d950c2e2e0b8';

export type sort = 'bloodSugar' | 'food' | 'exercise' | 'total';

export type food = {
  name:string,
  calories:number,
}

export type exercise = {
  name:string,
  calories:number,
}