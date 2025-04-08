
import { useState, useRef, useEffect } from "react";


interface TapeProps {
  tapeData: string[] 
  headPosition: number,
  animate?: 'left' | 'right' | null
  onAnimationEnd?: () => void
}

export default function Tape({ tapeData, headPosition, animate, onAnimationEnd }: TapeProps) {
  const [tape, setTape] = useState<string[]>([]);
  const tapeConRef = useRef<HTMLDivElement>(null);

  



  useEffect(() => {
    if (tapeConRef.current) {
      const width = tapeConRef.current.clientWidth
      let quantity = Math.floor(width / 40)
      if (quantity % 2 == 0)  quantity += 1
      const newTape = Array(quantity + 2).fill('')
      for (let i = Math.floor(newTape.length / 2) - headPosition, j = 0 ; i < newTape.length; i++, j++) {
        newTape[i] = tapeData[j]
      }
      
      setTape(newTape)
    }
  }, [headPosition, tapeData])

  return (
    <div className="tape-container" ref={tapeConRef}>
      <div className={`tape ${animate != null ? animate : ''}`} onAnimationEnd={onAnimationEnd}>
        {tape.map((symbol, index) => (
          <div key={index} className="tape-cell" onAnimationEnd={(e) => index != 0 && e.stopPropagation()}>
            {symbol}
          </div>
        ))}
      </div>
      <div className="head"></div>
    </div>
  );
}

