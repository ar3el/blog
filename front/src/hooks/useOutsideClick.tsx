import { useEffect, RefObject } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement | null>, cb: () => void) {
    useEffect(() => {
        function clickHandler(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (target && ref.current && !ref.current.contains(target)) {
                cb();
            }
        }

        window.addEventListener('click', clickHandler)
        return () => window.removeEventListener('click', clickHandler)
    }, [ref, cb]);
}