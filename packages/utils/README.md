# Utils

A small package that contains common utilities used in all my projects.

## 📃 Prerequisites
- **[Node.js](https://nodejs.org/en/)**: >= v23.11.1

## 💻 Installation

### Step 1
Install the package using your package manager of choice.
```shell
bun add @almighty-shogun/utils
yarn add @almighty-shogun/utils
npm install @almighty-shogun/utils
pnpm install @almighty-shogun/utils
```

### Step 2
Import a utility function from the package and use it.
```ts
import { getWeather } from '@almighty-shogun/utils'

const weatherData = await getWeather(52.374, 4.8897);

console.log(`Current weather in Amsterdam: ${weatherData.current.temperature.current} °C`);
```

## 📦 Building
- Use the command `bun install` in the root directory to install the required dependencies.
- Run `bun --cwd packages/utils build` to build the package.
