import {
  allSorted,
  swapElements,
  ObjectArray,
  moveElement,
  goodPair,
  wrongPair,
} from "../store/arraySlice";
import { mainTheme } from "../theme";

export const generateArray = (length: number) => {
  const newArray = [];
  for (let i = 0; i < length; i++) {
    // 20-460 numbers
    const number = Math.random() * 440 + 20;
    newArray.push({ value: number, color: mainTheme.mainColor });
  }
  return newArray;
};

export type AnimationsArray = {
  type: string;
  payload: any;
}[];

export const bubbleSort = (arr: ObjectArray, animations: AnimationsArray) => {
  const array = arr.slice();
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let didSwap = false;
    for (let j = 0; j < length - i - 1; j++) {
      animations.push(
        goodPair({
          idx1: j,
          idx2: j + 1,
          deactivateAll: true,
          justChecking: true,
        })
      );
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        didSwap = true;
        animations.push(wrongPair({ idx1: j, idx2: j + 1 }));
        animations.push(swapElements({ idx1: j, idx2: j + 1 }));
        animations.push(goodPair({ idx1: j, idx2: j + 1 }));
      }
    }
    if (!didSwap) {
      animations.push(allSorted());
      return array; // return earlier if already sorted
    }
  }
  animations.push(allSorted());
  return animations;
};

export const getBubbleSortAnimations = (array: ObjectArray) => {
  const animationArr: AnimationsArray = [];
  bubbleSort(array, animationArr);
  return animationArr;
};

export const mergeSort = (
  fullArray: ObjectArray,
  array: ObjectArray,
  animationArray: AnimationsArray
): ObjectArray => {
  if (array.length < 2) return array;

  const middleIdx = Math.ceil(array.length / 2);
  const firstHalf = array.slice(0, middleIdx);
  const secondHalf = array.slice(middleIdx);

  return merge(
    mergeSort(fullArray, firstHalf, animationArray),
    mergeSort(fullArray, secondHalf, animationArray),
    fullArray,
    animationArray
  );
};

// Helper mutable function for merge sort
const moveItem = (array: ObjectArray, itemIdx: number, toIdx: number) => {
  const item = array[itemIdx];
  array.splice(itemIdx, 1);
  array.splice(toIdx, 0, item);
};

const merge = (
  lArr: ObjectArray,
  rArr: ObjectArray,
  fullArray: ObjectArray,
  animationArray: AnimationsArray
) => {
  const result = [];
  let lIdx = 0,
    rIdx = 0;

  while (lIdx < lArr.length && rIdx < rArr.length) {
    // Get the current comparing pair's index in the full array
    const firstIdx = fullArray.indexOf(lArr[lIdx]),
      secondIdx = fullArray.indexOf(rArr[rIdx]);
    // The comparing pair is assumed to be correctly sorted initially
    animationArray.push(
      goodPair({
        idx1: firstIdx,
        idx2: secondIdx,
        deactivateAll: true,
        justChecking: true,
      })
    );
    if (lArr[lIdx].value < rArr[rIdx].value) {
      result.push(lArr[lIdx]);
      lIdx++;
    } else {
      // The left item is bigger than the right one, so the pair is wrongly sorted
      animationArray.push(wrongPair({ idx1: firstIdx, idx2: secondIdx }));
      // Move the right item in the left item's position, and push everything one position to the right
      animationArray.push(moveElement({ itemIdx: secondIdx, toIdx: firstIdx }));
      // Now the former wrong pair is correctlu sorted
      // The right item got the left item's index, and the left item's position is +1 to the right
      animationArray.push(goodPair({ idx1: firstIdx, idx2: firstIdx + 1 }));
      // Move the item in the full array used for generating the animations
      moveItem(fullArray, secondIdx, firstIdx);
      result.push(rArr[rIdx]);
      rIdx++;
    }
  }

  const sortedArr = result.concat(lArr.slice(lIdx), rArr.slice(rIdx));
  return sortedArr;
};

export const getMergeSortAnimations = (array: any) => {
  const animationArr: AnimationsArray = [];
  mergeSort(array.slice(), array, animationArr);
  animationArr.push(allSorted());
  return animationArr;
};
