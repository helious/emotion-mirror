# Contributing

Thank you for wanting to contribute.

To help out, you can:

- get involved in any open [issue](https://github.com/helious/emotion-mirror/issues) or [pull request](https://github.com/helious/emotion-mirror/pulls)
- open [new issues](https://github.com/helious/emotion-mirror/issues/new/choose) about your ideas for making `helious/emotion-mirror` better

Not only will you help `helious/emotion-mirror` thrive, but you may learn a thing or two — about CSS, CSS-in-JS, Emotion, Node, Rollup.js, Stylelint, unit testing, open-source software, and more. We want to encourage contributions! If you want to participate but couldn't, please [give us feedback](https://github.com/helious/emotion-mirror/issues/new) about what we could do better.

## Code contributions

To start coding, you'll need the:

- `v16` release of [Node.js](https://nodejs.org/en/)
- `v8` release of [npm](https://www.npmjs.com/)

Then:

1. [Fork and clone](https://guides.github.com/activities/forking/) the `helious/emotion-mirror` repository.
2. Install all the dependencies with `npm ci`.
3. Run `npm start` to start up `Rollup` and start the web server.
4. You will be able to view `App.tsx` at `http://localhost:8080/`

### Write code

With the interactive testing prompt running, you can write code confident that things are working as expected.

- `App.tsx` - the React app that is running on `http://localhost:8080/`
- `src/` - contains the `styled` wrapper and `stylelint` integration

### Run tests

Next, you'll want to run the tests using `npm test` and make sure they all pass.
Make sure to adjust or add tests based on changes in functionality.
We currently use [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests.

### Format code

We use [Prettier](https://prettier.io/) to format code.

### Open a pull request

When you have something to share, it's time to [open a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

After we review and merge your pull request, I'll invite you to become a maintainer of the `helious/emotion-mirror` repository. You'll then be able to help manage issues, pull requests and releases. You'll also be able to work on the `helious/emotion-mirror` repository rather than your fork.
