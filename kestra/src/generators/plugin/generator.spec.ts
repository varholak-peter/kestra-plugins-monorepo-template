import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { pluginGenerator } from './generator';
import { PluginGeneratorSchema } from './schema';

describe('plugin generator', () => {
  let tree: Tree;
  const options: PluginGeneratorSchema = {
    namespace: 'test.namespace',
    name: 'test',
    description: 'This is a test',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await pluginGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
