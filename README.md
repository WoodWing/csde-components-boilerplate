# csde-components-boilerplate
Boilerplate project for creating Content Station Digital Editor components.

## Setup
Install [NodeJS 8](https://nodejs.org/) or higher.

Next, run in the folder where this README is located:

```console
$ npm install
```

## Developing a component set

Download, clone or fork this repository. Follow the setup instructions listed in the previous section in the new folder. The run:

```console
$ npm run dev
```

This will watch for any changes in the components folder and run the validation logic.

Please see the [Documentation Components Model](docs/OVERVIEW.md) for more details.

## Package

To create a component set ready for usage, run:

```console
$ npm run build
```

This will validate the set and create a zip in the dist folder, which you can upload through the Content Station Management Console.

## Getting started guide

This quick guide shows the steps to create a new custom component based on the body component

1. Copy `components/styles/_body.scss` to `components/styles/_my_component.scss`
   * Edit the `scss` and change `.body` to `.my_component`
1. Edit `_my_component.scss` to make changes to the default style of your component
1. Copy `components/templates/html/body.html` to `components/templates/html/my_component.html`
   * Edit the html and change the class name `body` to `my_component`
1. Edit `components/styles/design.scss` and add `@import "_my_component.scss";`
1. Edit `components/components-definition.json` to define the new component
   * Copy & Paste the body component definition into the components section
   * Change the name to `my_component`
   * Change the label to `"my_component"`.
   * Scroll to the Groups section and add `my_component` to one of the groups, for example the text group
1. Run `npm run build` from the main dir to build your component set 
1. Upload the component set zip file found in the `dist` folder using the *Component sets* page in the the Content Station Management Console. The Console can be found in the *Integrations* section of the Enterprise admin pages
1. Create a new Digital Article template in Content Station and select your component set in the create dialog
1. Create a new Digital Article from the template
1. Add your component using the `+` button



