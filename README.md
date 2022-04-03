## PHP Laravel Front-end application

## Development

1. Modify `src/config/config.dev.json` file as per requirement **REACT_APP_BASE_API** should must exact match with backend url
2. `yarn install`
3. `yarn start`

## React App, features

- [x] Tailwind Theme, Config
- [x] SASS with Tailwind
- [x] Light/Dark mode
- [x] Responsive Sidebar
- [x] Dark Mode, +toggle button
- [x] Auth Service (Without API)
- [x] Private and Public routes
- [x] Prettier and EsLint
- [x] Custom dropdown button
- [x] API
- [x] React Query
- [x] Forms And Input Controls
- [x] Notifications
- [ ] WebHook
- [ ] Redux
- [x] filter
- [x] Table, Expandable, Sort, Search and Filters
- [ ] Permission based access control
- [ ] custom scroll bar
- [ ] tooltip
- [ ] responsive modal, Modal history api (navigation back/forward)
- [ ] ...

### HOOKS

- [x] Use localStorage state
- [x] Click outside event
- React Context
- Custom hooks

## Deployment, Production

### Deploy React app by using Firebase Hosting, Firebase deployment [Doc](https://hackernoon.com/how-to-deploy-a-react-application-with-firebase-hosting-p92m37b7)

- Login to Firebase in your terminal
  - `yarn global add firebase-tools`
  - `firebase login` login using google account.
  - `yarn run build`
  - Initialize Firebase in Your React App
    - `firebase init`
    - Select `Hosting: Configure and deploy Firebase Hosting sties ... and github page..`
    - For Configure as a single-page app question enter **y** for this option.
    - And the last part is the Hosting setup part here you will need to specify the folder where Firebase will look for assets to deploy. By default, the build folder will contain the production assets. So Enter build as an answer to this option.
    - The last question is whether to overwrite your existing build/index.htmlfile. So You'll want to enter N (No) for this option because we want actual index.html file that Reacts is generated while creating the build.
    - Once the initialization part is done you can check the directory, you should see two new files **.firebaserc**, **firebase.json**. These files are automatically generated.
  - Deploy React app
    1. `yarn build`
    2. `firebase deploy`
    3. Firebase will then give you a unique hosting URL where your deployed app is located. For example https://reactdemo-f8d87.web.app

```json
// firebase.json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

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

- Install build `heroku plugins:install heroku-builds`
- `heroku builds:cancel -a your-app-name`
- `heroku builds:cancel -a solis-react-app-test`

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
- [x] React modal, Dialog [Doc](https://react-responsive-modal.leopradel.com)
- Date Picker [Doc](https://reactdatepicker.com/)
- Yup, Validation [Doc](https://github.com/jquense/yup)
- Formik handling forms [Doc](https://formik.org/docs/guides/validation)
- Date helper methods [Doc](https://date-fns.org/v2.28.0/docs/format)
- Table [doc](https://react-table.tanstack.com/)
- React-select [doc](https://sanusart.github.io/react-dropdown-select)
- React Router [Doc](https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/overview)

### External resources and references

- markdown.md [cheat-sheet](https://www.markdownguide.org/cheat-sheet/)
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
- Tailwind Badge https://codepen.io/oidre/pen/jOqNpKQ
- React Toggle Animation https://medium.com/clever-franke/create-a-react-slidetoggle-component-with-hooks-and-react-spring-748919c38667
- Table custom pagination example https://react-table.tanstack.com/docs/examples/pagination-controlled
- React table sorting logic: https://github.com/tannerlinsley/react-table/discussions/2033
- Tab styles: https://tailwindcomponents.com/component/tab-navigation
- React-Table sub components: https://react-table.tanstack.com/docs/examples/sub-components-lazy
- Permission based access control: https://levelup.gitconnected.com/access-control-in-a-react-ui-71f1df60f354
