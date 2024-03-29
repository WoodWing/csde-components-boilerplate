# Studio sample component sets

Boilerplate project for creating Studio Digital Editor component sets.

## Creating component sets

This section describes how to set up, develop and package component sets out of the boilerplate.

#### _Important: use a release of the boilerplate that is supported by the target Studio application. See the [Releases](/../../releases) page for an overview._

Download, clone or fork this repository from the desired release tag.

### Requirements

NodeJS 16 and NPM 8: [Node](https://nodejs.org/en/)

Consider using NVM to manage multiple versions of NodeJS and NPM, as sometimes projects may require different versions:

-   [Node Version Manager for Mac/Linux](https://github.com/nvm-sh/nvm)
-   [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows)

### Setup

Run in the folder where this README is located:

```console
npm install
```

### Develop

Follow the instructions listed in the [Setup section](#setup) and then, in the new folder, run:

```console
npm run dev
```

This will watch for any changes in the `component-sets` folder and run the validation logic. Watch mode does not rebuild vendor.js and design.css.

Please see the [Documentation Components Model](docs/OVERVIEW.md) for more details on the expected structure of a component set.

### Package

To create a component set ready for usage, run:

```console
npm run build
```

This will validate the set and create a zip in the `dist` folder, which you can upload through the Studio Management Console.

## Getting started guide

This quick guide shows the steps to create a new custom component based on the body component

1. Copy `component-sets/default-components/styles/_body.scss` to `component-sets/default-components/styles/_my_component.scss`
    - Edit the `scss` and change `.body` to `.my_component`
1. Edit `_my_component.scss` to make changes to the default style of your component
1. Copy `component-sets/default-components/templates/html/body.html` to `component-sets/default-components/templates/html/my_component.html`
    - Edit the html and change the class name `body` to `my_component`
1. Edit `component-sets/default-components/components-definition.json` to define the new component
    - Copy & Paste the body component definition into the components section
    - Change the name to `my_component`
    - Change the label to `"my_component"`.
    - Scroll to the Groups section and add `my_component` to one of the groups, for example the text group
1. Run `npm run build` from the main dir to build your component set
1. Upload the component set zip file found in the `dist` folder using the _Component sets_ page in the the Studio Management Console. The Console can be found in the _Integrations_ section of the Studio server admin pages
1. Create a new Digital Article template in Studio and select your component set in the create dialog
1. Create a new Digital Article from the template
1. Add your component using the `+` button

## Creating a new package release

To create a new stable release:

1. Update version in package.json & run `npm install`
1. Create Pull Request and merge to master
1. Create a new GitHub release
