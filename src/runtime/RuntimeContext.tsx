import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { RuntimeKernel } from './RuntimeKernel';

export const RuntimeContext = createContext<any>(null);

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const kernelRef = useRef<RuntimeKernel | null>(null);
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const kernel = new RuntimeKernel();
    kernelRef.current = kernel;

    kernel.init().then((initial) => {
      setState({
        kernel,
        initial
      });
    });
  }, []);

  if (!state) return null;

  return (
    <RuntimeContext.Provider value={state}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntimeContext() {
  return useContext(RuntimeContext);
}
