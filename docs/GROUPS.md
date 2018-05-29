# Component Groups

Defines groups of components displayed in the components chooser.
The component chooser allows inserting new components into the article.

![Change Component](./images/groups.png)

An example of a group definition looks like:
```
{
    // Name of group displayed in Component Chooser
    "label": "MyComponents",

    // Unique identifier of this group
    "name": 'group-identifier',

    // List of Components, by id, to display in order they are defined
    "components": [
        "my-component-1",
        "my-component-1"
    ]
}
```