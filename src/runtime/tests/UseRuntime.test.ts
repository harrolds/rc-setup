import { renderHook } from '@testing-library/react';
import { RuntimeProvider } from '../RuntimeContext';
import { useRuntime } from '../useRuntime';

test('useRuntime throws outside provider', () => {
  expect(() => renderHook(() => useRuntime())).toThrow();
});

test('useRuntime works inside provider', async () => {
  const wrapper = ({ children }: any) => (
    <RuntimeProvider>{children}</RuntimeProvider>
  );

  const { result } = renderHook(() => useRuntime(), { wrapper });
  expect(result.current.kernel).toBeDefined();
});
