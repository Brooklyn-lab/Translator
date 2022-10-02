import { objectType } from '../types/types';

export function randomArrayItem(arr: objectType[], countItem: number): Array<objectType> {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, countItem);
}

export function randomArrayWords(arr: Array<string>, countItem: number, word: string): Array<string> {
  function arrRandomSort(arr: Array<string>) {
    return [...arr].sort(() => 0.5 - Math.random());
  }

  const filterArr = arrRandomSort(arr)
    .filter((w) => w !== word)
    .slice(0, countItem);
  const currentList = [...filterArr, word];

  return arrRandomSort(currentList);
}

export function getAllPropValues(arr: objectType[], prop: string): Array<string> {
  const arrayPropValues: Array<string> = [];

  arr.forEach((obj) => {
    for (let key in obj) {
      if (key === prop) arrayPropValues.push(obj[key]);
    }
  });

  return arrayPropValues;
}
