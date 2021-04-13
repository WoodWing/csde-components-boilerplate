# `doc-link`

Creates an anchor element which is appended to the element of the directive.

```html
<div doc-link="hyperlink"></div>
```

The intended usage of `doc-link` is to turn an element with a background image into a clickable image redirecting to the link.
The component requires additional styling for the anchor element so it covers the full size of the directive element which needs to be provided by the component set.

For example a `div` element with a `doc-image` and `doc-link` might generate the following html:

```html
<div doc-image="image" doc-link="hyperlink"><a></a></div>
```

And have the following scss for the anchor element:

```scss
div > a {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
```

This directive cannot be combined with other directives that modify the content of the element, such as `doc-editable`.
