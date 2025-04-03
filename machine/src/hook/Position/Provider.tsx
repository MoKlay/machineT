import React, { PropsWithChildren, useEffect, useState } from 'react'
import context, { Position } from './Context';
import useConfig from '../Config/useConfig';
import { Key } from '../Config/Context';

export default function Provider({children}:PropsWithChildren) {
  const config = useConfig()

  const [position, setPosition] = useState<Position[]>([])

  useEffect(() => {
    const state = config[Key.states][0].filter(v => v != '')
    state.forEach((v, i) => {
      setPosition((preview) => {
        const newPos = [...preview]
        
      })
    })
  })

  return (
    <context.Provider>
      {children}
    </context.Provider>
  )
}
