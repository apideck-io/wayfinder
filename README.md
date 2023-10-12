# WayFinder

WayFinder is a TypeScript-based application that helps you navigate through your JSON data. It provides a user-friendly interface for navigating / querying your JSON data and building JSONPath expressions.

## Running Locally

To run the WayFinder application locally, you need to have Node.js and Yarn installed on your machine. Once you have these prerequisites, follow the steps below:

1. Clone the repository to your local machine.

2. Navigate to the project directory and install the dependencies by running:

```bash
yarn install
```

## Storybook

This project includes Storybook for developing and testing UI components in isolation. To run Storybook, use the following command:

```bash
yarn storybook
```

This will start Storybook on a local server, typically `http://localhost:6006` and open a browser window with the Storybook UI. You can then navigate to the component you want to test and interact with it in isolation.

## Building the Project

To build the project for production, use the following command:

```bash
yarn build
```

This will create a `dist` folder in the project root directory with the compiled assets ready for deployment.

## Linting

The project uses ESLint for linting. To run the linter, use the following command:

```bash
yarn lint
```

This will run ESLint on the project and report any linting errors.

Remember to always follow the best practices and guidelines provided in the codebase when contributing to the project.
