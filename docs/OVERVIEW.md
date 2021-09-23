# Component Sets

A component set is a package of multiple files. It consists of a json file describing the components and properties, localization, templates for renditions and required styling for the html rendition.

## Folder structure

The folder structure of a component set is defined as:

| Path                         | Purpose                                                                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components-definition.json` | Describes components and properties.                                                                                                                                                           |
| `custom/*`                   | Custom data folder. Typically used to store information on how to post-process articles to Custom Channels.                                                                                    |
| `icons/components/*`         | Icons of components, references from the component definition file.                                                                                                                            |
| `icons/properties/*`         | Icons of properties, references from the component definition file.                                                                                                                            |
| `localization/*.json`        | Translations of the keys used in the component definition and templates.                                                                                                                       |
| `templates/html/*.html`      | Templates for the HTML rendition of the article. Used in editor and for publishing html.                                                                                                       |
| `templates/styles/*.scss`    | Default styling for this component set used with the html rendition. The customer may override this with custom styling. Styles folder may contain additional assets such as fonts and images. |
| `templates/psv/*.html`       | Templates for PSV rendition of the article. Used for publishing PSV to Custom Channels.                                                                                                        |

## components-definition.json

Contains the configuration for components. For reference, the json schema can be found [here](https://github.com/WoodWing/studio-component-set-tools/tree/master/lib).

The root of this file is defined as:

```javascript
{
    // Description of this components definition.
    "description": "Content Station Digital Editor components",

    // Version of model. Used by the validation service.
    "version": "1.0.0",

    // List with definitions of available components.
    "components":[
        ...
    ],

    // List with group definitions shown in Component Chooser of editor.
    // Shown in order of this list.
    "groups": [
        ...
    ],

    // Definition of available properties for components.
    "componentProperties": [
        ...
    ],

    // Definition of conversion rules, allowing to transform one component into another.
    "conversionRules": {
        ...
    },

    "shortcuts": {
        // Define keyboard shortcuts for changing a component to a different type.
        // A keyboard shortcut consists of the modifier key Cmd (MacOS) or Ctrl (Windows) plus a number from 0 to 9.
        // The first item in the list will have Cmd+1 or Ctrl+1 assigned,
        // the second item in the list will have Cmd+2 or Ctrl+2 assigned, and so on.
        // A maximum of 10 keyboard shortcuts can be defined.
        "conversionComponents": [
            "component-identifier-1",   // <- Cmd+0
            "component-identifier-2",   // <- Cmd+1
            ...                         // <- etc...
        ],
    },

    // Javascript files included in the HTML rendition of the article (editor and published html articles).
    // These scripts provide additional functionality for components (for example the slideshow).
    "scripts": {
        "scripts/vendor.js"
    },

    // Custom publish channel specific styles
    "customStyles": [
        {
            "type": "JSON",
            "label": "Apple News",
            "key": "apple-news",
            "default": "custom-styles/apple-news/styles.json"
        }
    ]

    // Default component's name on pressing Enter.
    "defaultComponentOnEnter": "component-identifier"
}
```

See the following subsections for details:

-   [Components](COMPONENTS.md)
-   [Groups](GROUPS.md)
-   [Component Properties](PROPERTIES.md)
-   [Conversion Rules](CONVERSION_RULES.md)
-   [Scripts](SCRIPTS.md)
-   [Localization](LOCALIZATION.md)
-   [Custom Data](CUSTOM_DATA.md)
-   [Custom Styles](CUSTOM_STYLES.md)

## Limitations

The following limits are in place for component sets:

-   Maximum number of files: 5000.
-   Maximum total file size (uncompressed): 100MB.
