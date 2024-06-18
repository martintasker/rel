import {useContext, useMemo} from 'react';
import {URFigureContext} from './URFigure';

export default function useGetStrokeWidth(w: 0 | 1 | -1): number {
  const {unitStrokeWidth} = useContext(URFigureContext);
  return useMemo(() => {
    switch (w) {
      case 1:
        return unitStrokeWidth * 3;
      case -1:
        return unitStrokeWidth * 0.25;
      case 0:
        return unitStrokeWidth;
    }
  }, [unitStrokeWidth, w]);
}
