# Component Sets

A component set is a package of multiple files. It consists of a json file describing the components and properties, templates for renditions and required styling for the html rendition.

## Folder Structure
The structure of a component set is defined as:

| Path | Purpose |
| ------------- | ------------- |
| components-definition.json  | Describes components and properties  |
| icons/components/* | Icons of components, references from the component definition file. |
| icons/properties/* | Icons of properties, references from the component definition file. |
| templates/html/*.html | 	Templates for the HTML rendition of the article. Used in editor and for publishing html.  |
| templates/styles/*.scss | Default styling for this component set used with the html rendition. The customer may override this with custom styling. Styles folder may contain additional assets such as fonts and images. |
| templates/psv/*.html | Templates for PSV rendition of the article. Used for publishing PSV to Custom Channels. |
| templates/facebook/*.html | Templates for Facebook rendition of the article. Used for publishing to Facebook Instant Articles. |

## components-definition.json

Contains the configuration for components. For reference, the json schema can be found [here](https://github.com/WoodWing/csde-components-validator/blob/master/lib/components-schema-v1_0_x.ts).

The root of this file is defined as:
```
{
    // Description of this components definition
    "description": "Content Station Digital Editor components",

    // Version of model. Used by the validation service.
    "version": "1.0.0",

    // List with definitions of available components
    "components":[
        ...
    ],

    // List with group definitions shown in Component Chooser of editor.
    // Shown in order of this list.
    "groups": [
        ...
    ],

    // Definition of available properties for components
    "componentProperties": [
        ...
    ],

    // Definition of conversion rules, allowing to transform one component into another.
    "conversionRules": {
        ...
    },

    // Default component's name on pressing Enter
    defaultComponentOnEnter: 'component-identifier'
}
```

See the following sub sections for details:

* [Components](COMPONENTS.md)
* [Groups](GROUPS.md)
* [Component Properties](PROPERTIES.md)
* [Conversion Rules](CONVERSION_RULSE.md)
