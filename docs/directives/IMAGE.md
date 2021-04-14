# `doc-image`

Binds an image to an html element. For `IMG` tag elements the image url is automatically bound to the `src` attribute:

```html
<img doc-image="key" src="bound-image-url" />
```

For other html elements `background-image` is automatically set as an inline style:

```html
    <div doc-image="key" style="background-image: url('bound-image-url')></div>
```

Inside the editor the element with the doc-image directive is turned into a droppable zone for images. This allows the user to drag and drop images from the desktop or from the attachments panel for example.

## Changing the droppable zone

In some cases you may want to change the target html element for the droppable zone inside the editor. You can do this by adding `data-dropzone-target="key"` to the target element:

```html
<div data-dropzone-target="image">
    <div doc-image="image"></div>
</div>
```

The value of this attribute must match the directive key.

For an example of the usage, see the `author` component in the boilerplate project.

## Altering the droppable placeholder style

A placeholder overlay is shown while dragging an image and hovering the mouse over the droppable target element of the directive, informing the user an image can be dropped and what type of images are accepted.

For some images this droppable placeholder is too big to display properly inside the editor. You can hide this placeholder by adding the attribute `data-placeholder-style` to the element with the `doc-image` directive and setting the value to `hidden`:

```html
<div doc-image="image" data-placeholder-style="hidden"></div>
```

You can also use a smaller variant by setting the value to `small`. This will only display the component icon to the full size of the element:

```html
<div doc-image="image" data-placeholder-style="small"></div>
```

In other cases the placeholder may overlap with editable text, in which case you can alter the position by setting the value `top-left`:

```html
<div doc-image="image" data-placeholder-style="top-left"></div>
```

For an example of the usage, see the `author` and `hero` components in the boilerplate project.
