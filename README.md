## PHP Laravel Front-end application

## Development

1. Modify `src/config/config.dev.json` file as per requirement **REACT_APP_BASE_API** should must exact match with backend url
2. `yarn install`
3. `yarn start`

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
- React Context
- Custom hooks

## Deployment, Production

### Heroku deployment

Modify `src/config/config.prod.json` or `src/config/config.dev.json`

Create a heroku app

> `heroku git:remote -a solis-test1`

Add buildpack to heroku app

> `heroku buildpacks:add mars/create-react-app`

Push the latest code to heroku

> `git push heroku main`

or

> `git push heroku yourBranch:main`

Deploy react app on heroku more info: https://github.com/mars/create-react-app-buildpack

View Heroku logs

> `heroku logs --tail`

Cancel heroku running build

> `heroku builds:cancel -a your-app-name`

Url: https://solis-react-app-test.herokuapp.com/

### Netlify Deploy

1. `yarn global add netlify-cli`
2. `ntl help`
3. `ntl login`
4. `ntl link --name <app_name>`

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
@import 'tailwindcss/base.css';
@import 'tailwindcss/components.css';
@import 'tailwindcss/utilities.css';
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

1.  [Src Medium](https://pomelozone.hashnode.dev/add-tailwind-jit-to-a-react-app-without-ejecting-or-using-craco)
2.  [Src Stackoverflow](https://stackoverflow.com/a/65746792/8592918)

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
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "exclude": ["node_modules", "build", "**/*.spec.ts"]
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

### libraries

- Animation, Transitions [Doc](https://react-spring.io/basics)
- React modal, Dialog [Doc](https://reach.tech/dialog/)
- Date Picker [Doc](https://github.com/Hacker0x01/react-datepicker)
- Yup, Validation [Doc](https://github.com/jquense/yup)
- Formik handling forms [Doc](https://formik.org/docs/guides/validation)
- Date helper methods [Doc](https://date-fns.org/v2.28.0/docs/format)

### External resources and references

- Icons: https://heroicons.dev/
- How to use variants: https://gist.github.com/RobinMalfait/490a0560a7cfde985d435ad93f8094c5
- Tailwindcss Overrides, Merge classes:
  - https://github.com/dcastil/tailwind-merge
  - https://github.com/richardgill/tailwind-override#readme
- Atomic Design Pattern: https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97
- Tailwind Spinner: https://larainfo.com/blogs/tailwind-css-loading-spinner-example
- Pagination Logic: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
- React modal
  - https://imranhsayed.medium.com/create-modal-in-react-using-portal-48b3662a28b9
  - https://blog.bitsrc.io/understanding-react-portals-ab79827732c7
  - https://codesandbox.io/s/react-portals-l0sy5?file=/src/App.js:803-811
  - https://dev.to/link2twenty/react-using-portals-to-make-a-modal-2kdf
- React Portal with hooks: https://www.jayfreestone.com/writing/react-portals-with-hooks/
- Modal https://jasonwatmore.com/post/2018/01/23/react-custom-modal-window-dialog-box
- Tailwind config reference https://github.com/tailwindlabs/tailwindcss/blob/v1/stubs/defaultConfig.stub.js#L5
