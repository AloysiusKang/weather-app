import { useEffect, useRef } from "react";

export type WithIsHidden<T = {}> = T & { is_hidden: boolean };

export function useOutsideAlerter<T extends Object>(ref:any, setIsOutside:React.Dispatch<React.SetStateAction<WithIsHidden<T>>>) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        return setIsOutside((prev) => ({
            ...prev, 
            is_hidden:true
        }));
      }
      return;
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
