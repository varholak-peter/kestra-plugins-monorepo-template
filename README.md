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

