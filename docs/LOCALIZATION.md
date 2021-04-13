# Localization

The components in the boilerplate are fully localized for all languages supported by Enterprise Aurora. As such, all property labels, dropdown options, placeholders, etc. show up in the editor in the same language as the rest of the application. This chapter describes how localization in the component set has been implemented and how new custom components can leverage that same mechanism.

## Basics

Localization is based on the use of string keys instead of hardcoded values for properties in `components-definition.json` and on the use of interpolations in HTML templates. Translations for the keys are provided per language in the `localization` folder within the component set.

## Supported languages

Overview of the languages supported by Enterprise Aurora and their matching translation file names.

| Language            | Filename    |
| ------------------- | ----------- |
| Czech               | `csCZ.json` |
| German              | `deDE.json` |
| English             | `enUS.json` |
| Spanish             | `esES.json` |
| Finnish             | `fiFI.json` |
| French              | `frFR.json` |
| Italian             | `jaJP.json` |
| Korean              | `koKR.json` |
| Dutch               | `nlNL.json` |
| Polish              | `plPL.json` |
| Portuguese          | `ptBR.json` |
| Russian             | `ruRU.json` |
| Simplified Chinese  | `zhCN.json` |
| Traditional Chinese | `zhTW.json` |

## Localization of `components-definition.json`

### Component with a hardcoded UI string

The label property simply contains a string which will be shown directly.

```javascript
{
    "name": "body",
    "label": "Body",
    "icon": "icons/components/body.svg",
    // ...
},
```

### Component with a localized UI string

The label property contains an object containing a key property:

```javascript
{
    "name": "body",
    "label": { "key": "COMPONENT_BODY_LABEL" },
    "icon": "icons/components/body.svg",
    // ...
},
```

The key points to a translation in for example `enUS.json`:

```javascript
{
    // ...
    "COMPONENT_BODY_LABEL": "Body",
    // ...
}
```

Keys for which a translation has not been given will be replaced by the key itself.

### Translations with variable parts

Translations can contain interpolations that will be substituted by the values provided. The label property will have an object that besides a key property has a values property containing the variable names and replacement values:

```javascript
{
	"name": "style",
	// ...
	"control": {
		"type": "select",
		"options": [
			{
				"caption": { "key": "PROPERTY_STYLE_DEFAULT_OPTION" }
			},
			{
				"caption": { "key": "PROPERTY_VARIANT_STYLE_OPTION", "values": { "0" : "1"} },
				"value": "_option1"
			},
			{
				"caption": { "key": "PROPERTY_VARIANT_STYLE_OPTION", "values": { "0" : "2"} },
				"value": "_option2"
			},
			// ...
		]
	},
	"dataType": "styles"
},
```

The translation in for example `enUS.json` contains the interpolations:

```javascript
{
    // ...
    "PROPERTY_VARIANT_STYLE_OPTION": "Option {{0}}",
    // ...
}
```

Interpolations for which a value has not been given will be replaced by the content of the interpolation itself.

### Overview of all localizable fields

In the next sections all fields that can be localized are enumerated.

#### Component UI name

Used in the component chooser and as title in the properties side bar.

```javascript
{
    "name": "title",
    "label": { "key": "COMPONENT_TITLE_LABEL" },
    "icon": "icons/components/title.svg",
    // ...
},
```

#### Group UI name

Used in the component chooser and properties side bar.

```javascript
{
	"name": "text",
	"label": { "key": "GROUP_TEXT_LABEL" },
	"components": [
		// ...
	]
},
```

#### Component property name

Used as property label in the side bar.

```javascript
{
    "name": "position",
    "label": { "key": "PROPERTY_POSITION_LABEL" },
	"control": {
		"type": "select",
		"options": [
		    {
		        "caption": { "key": "PROPERTY_POSITION_MIDDLE_OPTION" }
		    },
		    {
		        "caption": { "key": "PROPERTY_POSITION_LEFT_OPTION" },
		        "value": "_left"
		    },
		    {
		        "caption": { "key": "PROPERTY_POSITION_RIGHT_OPTION" },
		        "value": "_right"
		    }
		]
    },
    "dataType": "styles"
},
```

#### Select and radio options

Used as label for an option in selects and radio controls.

```javascript
{
	"name": "position",
	// ...
	"control": {
		"type": "select",
		"options": [
		    {
		        "caption": { "key": "PROPERTY_POSITION_MIDDLE_OPTION" }
		    },
		    {
		        "caption": { "key": "PROPERTY_POSITION_LEFT_OPTION" },
		        "value": "_left"
		    },
		    {
		        "caption": { "key": "PROPERTY_POSITION_RIGHT_OPTION" },
		        "value": "_right"
		    }
		]
    },
    // ...
},
```

#### Placeholder for text controls

Used as label for an option in selects and radio controls.

```javascript
{
	"name": "letter-spacing",
	// ...
	"control": {
		// ...
		"inputPlaceholder": { "key": "PROPERTY_AUTO_NUMBER_PLACEHOLDER" }
	},
	// ...
},

```

## Localization of HTML Templates

HTML templates can be localized by using interpolations containing a string key in either element values or attribute values.

Example taken from `body.html`:

```html
<p class="text body" doc-editable="text">{{ COMPONENT_BODY_LABEL }}</p>
```

Example taken from `embed.html`:

```html
<div class="embed" data-doc-label="{{ COMPONENT_EMBED_LABEL }}">
    <div doc-html="html"></div>
</div>
```
