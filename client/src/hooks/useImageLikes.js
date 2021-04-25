import { useState } from "react";
import {increaseImageLikes} from "../api/imageAPI";
import debounce from "lodash.debounce";

let counter = 0;
export default function useImageLikesCounter(id, likes, timer=1500) {
  const [likesCounter, setLikesCounter] = useState(likes);

  const onDoubleClick = () => {
    counter += 1;
    const count = counter;

    debounce(() => {
      if (count !== counter) return;

      increaseImageLikes({id, count})
        .then(res => {
          setLikesCounter(res.data.likes);
          counter = 0;
        })
    }, timer)();
  }

  return {onDoubleClick, likesCounter};
}