# Interview Scheduler

Interview Scheduler is a single page application (SPA) built using React.
Data is persisted by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests and cypress are used through the development of the project.

## Final Product
!["Screenshot of an appointment form with happy Archie Cohen who passed so many tests during development process :)"](https://github.com/code-driving/scheduler-/blob/master/docs/initial.png?raw=true)
!["Screenshot of editing the appointment"](https://github.com/code-driving/scheduler-/blob/master/docs/edit.png?raw=true)
!["Screenshot of a form after editing name"](https://github.com/code-driving/scheduler-/blob/master/docs/after_edit.png?raw=true)
!["Screenshot of a confirmation to delete the appointment"](https://github.com/code-driving/scheduler-/blob/master/docs/confirm_cancel.png?raw=true)
!["Screenshot of an error while saving the appointment"](https://github.com/code-driving/scheduler-/blob/master/docs/error_save.png?raw=true)
!["Screenshot of an error while deleting the appointment"](https://github.com/code-driving/scheduler-/blob/master/docs/error_cancel.png?raw=true)

## Dependencies

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest Testing Library, Cypress.

## Stretch Features

- Using Reducers with React.
- The client application communicates with a WebSocket server.
- When a user books or cancels an interview, all connected users see the update in their browser.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
