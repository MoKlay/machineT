
import { useState, useRef, useEffect } from "react";
import useMachine from "../../hook/Config/useMachine";
import { Key } from "../../hook/Config/Context";


interface TapeProps {
  tapeData: string[] 
  headPosition: number,
}

export default function Tape({ tapeData, headPosition }: TapeProps) {
  const machine = useMachine()
  const [tape, setTape] = useState<string[]>([]);
  const [currHead, setHead] = useState(headPosition)
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null)
  const tapeConRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tapeConRef.current) {
      const width = tapeConRef.current.clientWidth
      let quantity = Math.floor(width / 40)
      if (quantity % 2 == 0)  quantity += 1
      const newTape = Array(quantity + 2).fill(machine ? machine[Key.blank] : '')
      const center = Math.floor(newTape.length / 2)
      const start = center - headPosition
      for (let i = Math.min(center, start), j = 0 ; i < newTape.length && j < tapeData.length; i++, j++) {
        if (tapeData[j])
        newTape[i] = tapeData[j]
      }
      setTape(newTape)
    }
  }, [headPosition, machine, tapeData])

  useEffect(() => {
    if (currHead > headPosition) {
      setAnimate('left')
    } else if ( currHead < headPosition) {
      setAnimate('right')
    }
  }, [currHead, headPosition])

  useEffect(() => {
    if (animate) {
      const animationTimeout = setTimeout(() => {
        setAnimate(null);
        setHead(headPosition);
      }, 300);

      return () => clearTimeout(animationTimeout);
    }
  }, [animate, headPosition]);

  return (
    <div className="tape-container" ref={tapeConRef}>
      <div className={`tape ${animate != null ? animate : ''}`}>
        {tape.map((symbol, index) => (
          <div key={index} className={`tape-cell${machine && symbol != machine[Key.blank] ? ' bold' : ''}`} onAnimationEnd={(e) => index != 0 && e.stopPropagation()}>
            {symbol}
          </div>
        ))}
      </div>
      <div className="head"></div>
    </div>
  );
}

