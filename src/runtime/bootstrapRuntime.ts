import { RuntimeKernel } from './RuntimeKernel';

export async function bootstrapRuntime() {
  const kernel = new RuntimeKernel();
  const initial = await kernel.init();

  return {
    kernel,
    initial
  };
}

// Optional helper for manual boot usage
export async function createRuntime() {
  return await bootstrapRuntime();
}
