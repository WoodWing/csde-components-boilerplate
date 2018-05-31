# csde-components-boilerplate
Boilerplate project for creating Content Station Digital Editor components.

## Setup
Install [NodeJS 8](https://nodejs.org/) or higher.

Next, in this folder run:

```npm install```

## Developing a component package
Download, clone or fork this repository.

Follow the setup instructions in the new folder.

Next run:

```npm run dev```

This will watch for any changes in the components folder and run the validation logic.

TBD documentation components model.

## Package
To create a components package, run:

```npm run build```

This will create a zip in the dist folder, which you can upload through the Content Station Management Console.

## Getting started guide

This quick guide shows the steps to create a new custom component based on the body component

1. Copy **components/styles/_body.scss** to **components/styles/_my_component.scss**
   * Edit the scss and change .body to .my_component
2. Edit **_my_component.scss** to make changes to the default style of your component
3. Copy **components/templates/html/body.html** to **components/templates/html/my_component.html** 
   * Edit the html and change the class name body to my_component
5. Edit **components/styles/design.scss** and add **@import "_my_component.scss";**
6. Edit **components/components-definition.json** to define the new component
  * Copy & Paste the body component definition into the components section
  * Change the name to my_component
  * Change the label to "my_component" (remove the {{}} this is used for translating default components) 
  * Scroll to the Groups section and add my_component to one of the groups, for example the text group
7. Run ```npm run build``` from the main dir to build your component set 
8. Upload the components set found in the dist folder using the Content Station Management Console found under integrations in the Enterprise admin pages
9. Create a new Digital Article template in Content Station and select your component set in the create dialog
10. Create a new Digital Article from the template
11. Add your component using the + button



