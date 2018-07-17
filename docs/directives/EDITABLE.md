# `doc-editable`

Binds text to an html element.

```html
    <p doc-editable="key">*rendered-text-content*</p>
```

## Changing text color on empty image background
You can change the text color of the editable when the text is on top of a background image using the `data-doc-empty-bg-image-color`:

```html
    <p doc-editable="key" data-doc-empty-bg-image-color="black">*rendered-text-content*</p>
```

For an example of the usage, see the `hero` component in the boilerplate project.
