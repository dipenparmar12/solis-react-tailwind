## PHP Laravel Front-end application

## Development 
1. Modify `src/config/config.dev.json` file as per requirement **REACT_APP_BASE_API** should must exact match with backend url
2. `yarn install`
3. `yarn start`

## Deployment, Production

## React App, features 

- [x] Tailwind Theme, Config
- [x] SASS with Tailwind
- [x] Responsive Sidebar
- [x] Dark Mode, +toggle button
- [x] Auth Service (Without API)
- [x] Private and Public routes
- [x] Prettier and EsLint
- [x] Custom dropdown button
- [ ] API 
- [ ] Forms And Input Controls  
- [ ] Notifications
- [ ] WebHook
- [ ] Redux
- [ ] filter 
- [ ] Table, Expandable, Sort, Search and Filters

### HOOKS
- [x] Use localStorage state 
- [x] Click outside event 

## 
- React Context
- Custom hooks

### Tailwind init
#### DOC: https://pomelozone.hashnode.dev/add-tailwind-jit-to-a-react-app-without-ejecting-or-using-craco 
1. `yarn add autoprefixer postcss postcss-cli postcss-import tailwindcss`
2. `yarn add cross-env` and `yarn add -D concurrently cssnano` 
3. Create two files `tailwind.config.js` and `postcss.config.js` in root
4. `tailwind.config.js`
```
module.exports = {
   mode: "jit",
   purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
   theme: {},
};
```
4. `postcss.config.js`
```
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
```
5. Create `tailwind.pcss` and `tailwind.css` inside it
```
src/
├── styles/
         ├── tailwind.css
         └── tailwind.pcss
├── App.js
└── index.js
```
6. `tailwind.pcss`
```css
@import "tailwindcss/base.css";
@import "tailwindcss/components.css";
@import "tailwindcss/utilities.css";
```
8. Include css import statement in `src/index.js`
```js
import './styles/tailwind.css'
```
9. Modify `package.json`
```
"dev": "concurrently --names 'REACT,TAILWIND' --prefix-colors 'green,magenta' --kill-others \"yarn start\" \"yarn watch:css\"",
"watch:css": "cross-env TAILWIND_MODE=watch postcss src/styles/tailwind.pcss -o src/styles/tailwind.css --watch",
"build:css": "cross-env NODE_ENV=production postcss build src/styles/tailwind.css -o src/styles/tailwind.prod.css"
```
8. > yarn run dev

### React Path alias with craco
 1. [Src Medium](https://jrpotatodev.medium.com/how-to-use-import-aliases-in-react-with-craco-2021-aaa3b4893dd) 
 2. [Src Stackoverflow](https://stackoverflow.com/a/65746792/8592918)

> `yarn add @craco/craco`

package.json
```json
"scripts": {
    "start": "craco start",
    "build": "craco build",
}
```
craco.config.js
```js
// craco.config.js
const path = require(`path`)
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}
```
jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": [ "./src/*"]}
  },
  "include": ["src" ],
  "exclude": [ "node_modules", "build",  "**/*.spec.ts"]
}
```
Optional config for `Eslint`
eslintrc.js
```js
module.exports = {
  // ...
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          // ['@/components, './src/components'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
}
```



### Netlify Deploy

1. `yarn global add netlify-cli`
2. `ntl help`
2. `ntl login`
3. `ntl link --name <app_name>`


### MarkDown Cheatsheet
Markdown Cheatsheet<a name="TOP"></a>
===================

- - - - 
# Heading 1 #

    Markup :  # Heading 1 #

    -OR-

    Markup :  ============= (below H1 text)

## Heading 2 ##

    Markup :  ## Heading 2 ##

    -OR-

    Markup: --------------- (below H2 text)

### Heading 3 ###

    Markup :  ### Heading 3 ###

#### Heading 4 ####

    Markup :  #### Heading 4 ####


Common text

    Markup :  Common text

_Emphasized text_

    Markup :  _Emphasized text_ or *Emphasized text*

~~Strikethrough text~~

    Markup :  ~~Strikethrough text~~

__Strong text__

    Markup :  __Strong text__ or **Strong text**

___Strong emphasized text___

    Markup :  ___Strong emphasized text___ or ***Strong emphasized text***

[Named Link](http://www.google.fr/ "Named link title") and http://www.google.fr/ or <http://example.com/>

    Markup :  [Named Link](http://www.google.fr/ "Named link title") and http://www.google.fr/ or <http://example.com/>

[heading-1](#heading-1 "Goto heading-1")
    
    Markup: [heading-1](#heading-1 "Goto heading-1")

Table, like this one :

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell
```

Adding a pipe `|` in a cell :

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | \|

```
First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  |  \| 
```

Left, right and center aligned table

Left aligned Header | Right aligned Header | Center aligned Header
| :--- | ---: | :---:
Content Cell  | Content Cell | Content Cell
Content Cell  | Content Cell | Content Cell

```
Left aligned Header | Right aligned Header | Center aligned Header
| :--- | ---: | :---:
Content Cell  | Content Cell | Content Cell
Content Cell  | Content Cell | Content Cell
```

`code()`

    Markup :  `code()`

```javascript
    var specificLanguage_code = 
    {
        "data": {
            "lookedUpPlatform": 1,
            "query": "Kasabian+Test+Transmission",
            "lookedUpItem": {
                "name": "Test Transmission",
                "artist": "Kasabian",
                "album": "Kasabian",
                "picture": null,
                "link": "http://open.spotify.com/track/5jhJur5n4fasblLSCOcrTp"
            }
        }
    }
```

    Markup : ```javascript
             ```

* Bullet list
    * Nested bullet
        * Sub-nested bullet etc
* Bullet list item 2

~~~
 Markup : * Bullet list
              * Nested bullet
                  * Sub-nested bullet etc
          * Bullet list item 2

-OR-

 Markup : - Bullet list
              - Nested bullet
                  - Sub-nested bullet etc
          - Bullet list item 2 
~~~

1. A numbered list
    1. A nested numbered list
    2. Which is numbered
2. Which is numbered

~~~
 Markup : 1. A numbered list
              1. A nested numbered list
              2. Which is numbered
          2. Which is numbered
~~~

- [ ] An uncompleted task
- [x] A completed task

~~~
 Markup : - [ ] An uncompleted task
          - [x] A completed task
~~~

- [ ] An uncompleted task
    - [ ] A subtask

~~~
 Markup : - [ ] An uncompleted task
              - [ ] A subtask
~~~

> Blockquote
>> Nested blockquote

    Markup :  > Blockquote
              >> Nested Blockquote

_Horizontal line :_
- - - -

    Markup :  - - - -

_Image with alt :_

![picture alt](http://via.placeholder.com/200x150 "Title is optional")

    Markup : ![picture alt](http://via.placeholder.com/200x150 "Title is optional")

Foldable text:

<details>
  <summary>Title 1</summary>
  <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
</details>
<details>
  <summary>Title 2</summary>
  <p>Content 2 Content 2 Content 2 Content 2 Content 2</p>
</details>

    Markup : <details>
               <summary>Title 1</summary>
               <p>Content 1 Content 1 Content 1 Content 1 Content 1</p>
             </details>

```html
<h3>HTML</h3>
<p> Some HTML code here </p>
```

Link to a specific part of the page:

[Go To TOP](#TOP)
   
    Markup : [text goes here](#section_name)
              section_title<a name="section_name"></a>    

Hotkey:

<kbd>⌘F</kbd>

<kbd>⇧⌘F</kbd>

    Markup : <kbd>⌘F</kbd>

Hotkey list:

| Key | Symbol |
| --- | --- |
| Option | ⌥ |
| Control | ⌃ |
| Command | ⌘ |
| Shift | ⇧ |
| Caps Lock | ⇪ |
| Tab | ⇥ |
| Esc | ⎋ |
| Power | ⌽ |
| Return | ↩ |
| Delete | ⌫ |
| Up | ↑ |
| Down | ↓ |
| Left | ← |
| Right | → |

Emoji:

:exclamation: Use emoji icons to enhance text. :+1:  Look up emoji codes at [emoji-cheat-sheet.com](http://emoji-cheat-sheet.com/)

    Markup : Code appears between colons :EMOJICODE:
