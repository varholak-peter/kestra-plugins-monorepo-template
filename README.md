# Kestra Plugins Monorepo

This repository is a template for managing custom Kestra plugins in a monorepo structure. It uses Nix for environment setup, Gradle for building Java-based plugins, and Nx for monorepo orchestration.

## Prerequisites

We use [Nix](https://nix.dev/) for managing the development environment.

To [Get Nix running on your system](https://zero-to-nix.com/start/install) you can follow this guide by Determinate Systems.

Afterwards, you should be able to run `nix develop` to start your local environment.

> ℹ️ _Note_
> 
> Running `nix develop` for the first time takes some time as Nix has to build every package for the environment.
> 
> Subsequent runs will complete much faster.

### Recommended information

- [Kestra - Build a Custom Plugin](https://kestra.io/docs/developer-guide/plugins)

## Generators

To create a new plugin run `bunx nx g kestra:plugin`.

## Building

You can build all plugins by running `gradle build`.

Alternatively you can run `gradle :plugins:plugin_name:build` to build individual plugins.

## Publish

The plugins here are published by bundling them into a [custom Kestra docker image](https://kestra.io/docs/developer-guide/plugins#use-a-custom-docker-image-with-your-plugin).

You can build the custom image by running `docker build -t kestra-custom .` (You can replace "kestra-custom" with your own name)

Then run your custom Kestra image by following [Kestra Docker installation guide](https://kestra.io/docs/installation/docker).