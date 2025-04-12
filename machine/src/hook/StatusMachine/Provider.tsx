import React, { useEffect, useState } from 'react'
import useMachine from '../Config/useMachine'
import { Tape } from './Context'
import { Direction, Key, State, Symbol, TransitionKey } from '../Config/Context'
import context from './Context';

export default function MachineState({children}: React.PropsWithChildren) {
  const machine = useMachine()
  const [run, setRun] = useState(false)
  const [tape, setTape] = useState<Tape>([])
  const [headPosition, setHeadPosition] = useState<number>(0)
  const [currentState, setCurrentState] = useState<State>('')
  const symbol = tape[headPosition] ? tape[headPosition] : 'ε'

  useEffect(() => {
    if (machine) {
      setTape(machine[Key.input])
      setCurrentState(machine[Key.initialState])
    }
  }, [machine])

  function writeSymbol(symbol: Symbol): void {
    const newTape = [...tape]
    if (headPosition < 0) {
      newTape.unshift(symbol)
      moveHead('R')
    } else newTape[headPosition] = symbol
    setTape(newTape)
  }

  function moveHead(direction: Direction): void {
    if (direction === 'L') {
      setHeadPosition(headPosition-1)
    } else if (direction === 'R') {
      setHeadPosition(headPosition+1)
    }
  }
  function step() {
    if (machine[Key.acceptingState] == currentState) return false
    const transition = machine[Key.transitions][currentState][symbol]
    
    
    
    writeSymbol(transition[TransitionKey.write])
    moveHead(transition[TransitionKey.move])
    setCurrentState(transition[TransitionKey.nextState])
    return true
  }
  return (
    <context.Provider value={[{
      tape,
      currentState,
      headPosition,
      symbol,
      run
    }, {
      step,
      setRun
    }]}>{children}</context.Provider>
  )
}
