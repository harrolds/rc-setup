import { RuntimeKernel } from '../RuntimeKernel';

test('RuntimeKernel initializes correctly', async () => {
  const kernel = new RuntimeKernel();
  const init = await kernel.init();

  expect(init.device).toBeDefined();
  expect(init.resources).toBeDefined();
  expect(init.network).toBeDefined();
  expect(init.lifecycle).toBeDefined();

  expect(kernel.device).toBeDefined();
  expect(kernel.network).toBeDefined();
  expect(kernel.resources).toBeDefined();
  expect(kernel.lifecycle).toBeDefined();
  expect(kernel.multitab).toBeDefined();
});
