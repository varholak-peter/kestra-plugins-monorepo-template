import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { PluginGeneratorSchema } from './schema';

export async function pluginGenerator(
  tree: Tree,
  options: PluginGeneratorSchema
) {
  options.namespace = options.namespace.toLowerCase();
  options.name = options.name.toLowerCase();

  const projectRoot = `plugins/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });

  // Add root files
  generateFiles(tree, path.join(__dirname, 'root-files'), projectRoot, options);

  // Add namespaced files
  const namespacedJavaPath = path.join(
    projectRoot,
    'src/main/java',
    ...[...options.namespace.split('.'), 'plugin', options.name]
  );

  generateFiles(
    tree,
    path.join(__dirname, 'plugin-files'),
    namespacedJavaPath,
    options
  );

  // Include plugin in the root settings.gradle
  const settingsGradlePath = 'settings.gradle';
  const settingsGradleContent = tree.read(settingsGradlePath, 'utf-8');
  const newIncludeSegment = `include 'plugins:${options.name}'\n`;
  const updatedSettingsGradleContent = `${settingsGradleContent}${newIncludeSegment}`;
  tree.write(settingsGradlePath, updatedSettingsGradleContent);

  // Include plugin outputs in the Dockerfile
  const dockerfilePath = 'Dockerfile';
  const dockerfileContent = tree.read(dockerfilePath, 'utf-8');
  const newCopySegment = `COPY plugins/${options.name}/build/libs/* /app/plugins/\n`;
  const updatedDockerfileContent = `${dockerfileContent}${newCopySegment}`;
  tree.write(dockerfilePath, updatedDockerfileContent);

  await formatFiles(tree);
}

export default pluginGenerator;
