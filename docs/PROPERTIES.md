# Component Properties

Component properties are displayed in the side bar when a component is selected. They allow changing data of the directives (see below in HTML templates), style and inline style data.

The general definition of a property looks like:

```
{
    // Property identifier
    "name": "property",

    // Name displayed for property in side bar
    "label": "Property Name",

    // Type of UI control element
    // See later sections for all available control types
    "control": {
        ...
    }
    // Kind of data property
    // When stored as "styles", the property value is added as css class to the main element.
    // When stored as "inlineStyles", the property value is directly used as inline style.
    // When stored as 'data", the property is free data (TBD)
    // When stored as a directive (for example, doc-media), the property can be used to modify content data of a directive.
    "dataType": "styles" | "inlineStyles" | "data" | "<directive>:<content-key>",

    // Optional css selector key, it may be used if property should be applied to some nested html element instead of main component element
    "selector": "css-selector",

    // Name of Enterprise Feature flag that should be present for the property to show up.
    // Always show if not specified.
    "featureFlag": "..."
}
```

## Data types


## Generic Controls


## Specialized Controls