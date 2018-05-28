# Component Conversion Rules

Defines rules for converting one component type into another.

Conversion rules have two ways of converting. One option is to automatically map based on matching keys. For example, here a component with the ID `body` can be automatically mapped to `title`.

```
"body": {
    "title": "auto",
}
```

Any matching content keys of directives are copied to the new component. Non matching directives are ignored and left empty.

Another option is use explicit mapping:

```
"body": {
    "headline": {
        "type": "simple",
        "map": {
            "title": "text",
        }
    }
}
```

Here the field with key "text" is copied to the field "title" of the headline component.

The other two available types are `from-container` and `to-container`, which mostly serve the purpose of transforming an image into a slideshow or turning a slideshow into images.