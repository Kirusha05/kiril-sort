import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetInfo, RootState, setArray, setHeader } from "../../store";
import {
  AnimationsArray,
  generateArray,
  getBubbleSortAnimations,
  getMergeSortAnimations,
  getQuickSortAnimations,
} from "../../utils/utils";
import {
  SortingBars,
  SortingControls,
  Button,
  Slider,
  SliderTitle,
  SliderWrapper,
  SortingActions,
} from "./SortingArea.styles";

let sliderTimeout: null | NodeJS.Timeout = null;
let animationDelayDefault = 10;
let barsNumDefault = 20;

let defaultBarWidth = 500 / barsNumDefault + "px";

let animationTimersArray: NodeJS.Timeout[] = [];

function SortingArea() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(animationDelayDefault);
  const [barsNum, setBarsNum] = useState(barsNumDefault);
  const [barWidth, setBarWidth] = useState(defaultBarWidth);

  const sortingArray = useSelector((state: RootState) => state.array.array);
  const dispatch = useDispatch();

  useEffect(() => {
    const arrayToSort = generateArray(barsNumDefault);
    dispatch(setArray(arrayToSort));
  }, [dispatch]);

  const resetArray = () => {
    animationTimersArray.forEach((timer) => clearTimeout(timer));
    animationTimersArray = [];

    const arrayToSort = generateArray(barsNum);
    dispatch(setArray(arrayToSort));
    dispatch(setHeader("*Waiting*"));
    dispatch(resetInfo());
    setIsSorted(false);
    setIsRunning(false);
  };

  const animateSort = (algorithm: "bubble" | "merge" | "quick-lomuto" | "quick-hoare") => {
    let animations: AnimationsArray = [];
    switch (algorithm) {
      case "bubble":
        animations = getBubbleSortAnimations(sortingArray);
        dispatch(setHeader("BubbleSort *Running*"));
        break;
      case "merge":
        animations = getMergeSortAnimations(sortingArray);
        dispatch(setHeader("MergeSort *Running*"));
        break;
      case "quick-lomuto":
        animations = getQuickSortAnimations(sortingArray, 'lomuto');
        dispatch(setHeader("QuickSort *Running*"));
        break;
      case "quick-hoare":
        animations = getQuickSortAnimations(sortingArray, 'hoare');
        dispatch(setHeader("QuickSort *Running*"));
        break;
    }
    const startTime = new Date().getTime();

    setIsRunning(true);
    for (let i = 0; i < animations.length; i++) {
      const animationTimer = setTimeout(() => {
        dispatch(animations[i]);

        if (i === animations.length - 1) {
          // The sorting is done, we can display the total time it took :)
          const endTime = new Date().getTime();
          const totalTime = (endTime - startTime) / 1000;
          dispatch(setHeader(`Finished in ${totalTime.toFixed(2)}s`));
          setIsRunning(false);
          setIsSorted(true);
        }
      }, i * animationDelay);
      animationTimersArray.push(animationTimer);
    }
  };

  const countSliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (sliderTimeout) return;
    // don't generate new arrays too early, it decreases performance

    sliderTimeout = setTimeout(() => {
      const newCount = parseInt(event.target.value);
      setBarsNum(newCount);
      setIsSorted(false);

      const newBarWidth = Math.floor(500 / newCount);
      setBarWidth(`${newBarWidth}px`);

      const arrayToSort = generateArray(newCount);
      dispatch(setArray(arrayToSort));
      sliderTimeout = null;
    }, 50);
  };

  const delaySliderHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnimationDelay(parseInt(event.target.value));
  };

  return (
    <>
      <SortingBars>
        {sortingArray.map((el) => (
          <div
            key={el.value}
            style={{
              height: el.value,
              backgroundColor: el.color,
              width: barWidth,
              marginLeft: "2px",
            }}
          />
        ))}
      </SortingBars>
      <SortingControls>
        <SliderWrapper>
          <SliderTitle>Bar Count: {barsNum}</SliderTitle>
          <Slider
            type="range"
            min="10"
            max="100"
            defaultValue={barsNum}
            onChange={!isRunning ? countSliderHandler : undefined}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderTitle>Animation Delay: {animationDelay}ms</SliderTitle>
          <Slider
            type="range"
            min="10"
            max="500"
            step="5"
            defaultValue={animationDelay}
            onChange={!isRunning ? delaySliderHandler : undefined}
          />
        </SliderWrapper>
        <Button onClick={resetArray}>Reset</Button>
      </SortingControls>
      <SortingControls>
        <Button
          onClick={
            !isRunning && !isSorted ? () => animateSort("bubble") : undefined
          }
          title="BubbleSort - the least efficient of them all"
        >
          BubbleSort
        </Button>
        <Button
          onClick={
            !isRunning && !isSorted ? () => animateSort("merge") : undefined
          }
          title="MergeSort - the hardest to animate :)"
        >
          MergeSort
        </Button>
        <Button
          onClick={
            !isRunning && !isSorted ? () => animateSort("quick-lomuto") : undefined
          }
          title="QuickSort w/ Lomuto - simpler & less efficient than Hoare - partitioning scheme"
        >
          QuickSort (Lomuto)
        </Button>
        <Button
          onClick={
            !isRunning && !isSorted ? () => animateSort("quick-hoare") : undefined
          }
          title="QuickSort w/ Hoare - the OG & the most efficient - partitioning scheme"
        >
          QuickSort (Hoare)
        </Button>
      </SortingControls>
    </>
  );
}

export default SortingArea;
