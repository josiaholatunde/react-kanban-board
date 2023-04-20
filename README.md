# Kanban Board

This Kanban board is an agile project management tool that helps visualize how has work been done. It can help an agile team establish order in their daily work. It uses cards, columns to visualize work been done in an agile team. The project with built with React (Typescript template) and Redux (State management). It also uses the browser's local storage API to persist/sync changes within the application to prevent data loss during page refresh.

Functional requirements:
- Ability to create columns in card design format, assign them names, rename and
delete like shown below.
  - The rename stage enables the user to assign a new name to a stage while handling the edge case where the new name belongs to a different stage
  - The delete stage and clear stage functionalities displays a modal or popup to notify the user of the implication of deleting the stage before going ahead to carry out the action if the user grants the prompt
- Ability to create tasks within the columns like the below: A user should be able to edit and delete as well.
- Ability to drag and drop tasks from one column to another. For example, moving a task named `Create a reusable button component task` to another stage named `In Progress` column.
- The app limits the number of columns or stages that can be added to 5 (which is configurable); Expected Result: The application hides the add column button and issues a message to the user once the 5 columns are exhausted alerting them that they can only create 5 columns.
- A service worker for the web app that ensures the web app is installable in a mobile or desktop device.
- Ability for users to create different dynamic stages as well as assign tasks to each stage. 
- Ability for users to move(drag) tasks across stages to show progress. 
- Ability for users to rename stages, clear items in a stage as well as delete a stage if no longer required in a workflow. The 
application confirms or verifies user's intention before carrying out any of these actions



# Installation Prerequisites:
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Improvements
- Represent the state as an object with the different state properties. This would make lookup faster and the overall app response time
