# Reddit Top Entries

A React app that displays the top 50 entries from Reddit.

The app was deployed using vercel and can be visited [here](https://reddit-posts-alfred.vercel.app/).

![reddit-top50](https://user-images.githubusercontent.com/51219653/116182761-6e671080-a6e2-11eb-8392-9b3023b47f36.png)

## Some development notes

### Task organization

Because of the simplicity of the project, I decided to organize my (initial) tasks in a [todo list](https://github.com/alewis729/reddit-posts/issues/1).

Initial commits have a 'task ID' before a descriptive message to make it easier to understand code changes in the future. The task IDs are from the todo list (for instance, `[i-7]` for Responsiveness).

### Library decisions

- For the main tech I felt that CRA was a safe bet to quickly set up the repo.
- I used typescript for its flexibility, and it's advantages over just prop-types or flow. However, I know I have some things to improve here.
- For styling I chose material-ui for it's ready to use components and quick and easy way to make a theme.
- Animation requirements weren't that complex, and I could have probably completed them using style properties, but I chose to use framer-motion. With framer-motion animations didn't take much time, and they can easily be improved and maintained.
- Usage of redux was a requirement. I thought of using redux-persist, but I preferred to manually persist data to localStorage.
- For tests I just used jest. I only wrote state changing tests for the time being.

### Additional thoughts

- All the [requirements](https://github.com/alewis729/reddit-posts/issues/1) have been fulfilled.
- Saving pictures in the gallery wasn't very clear, so I took the freedom to make a post gallery in order to make the app a bit more complete.

## How to run locally

1. Clone the repo

2. Install

```bash
yarn install
```

3. Run a dev environment

```bash
yarn start
```

4. Run tests

```bash
yarn test
```
