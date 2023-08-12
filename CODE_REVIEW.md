---
# Code Review #
---
Kindly go through the below code review.

## Code Smell & Improvements ##
- State update for addition/removal of the books to the readinglist should happen once the api completes successfully inorder to prevent presenting false information to user. So replace `addToReadingList` & `removeFromReadingList` with the `confirmedAddToReadingList` & `confirmedRemoveFromReadingList` in the reading-list.reducer.ts file.[Fixed]
- Unit test case defined for an unimplemented code (`failedRemoveFromReadingList`, `failedAddToReadingList`), so need to exclude from running and include at later part of the development once it's implemented.[Fixed]
- Unsubscribe all the subscription during component destroy, that are taken part in the component code which will prevent the memory-leak.[Fixed]
- Add typing for the functions and variables - which would prevent us from accidental typo-errors/property access which is not present in it.[Fixed]
- Consider using the `track-by` angular directive along with `ng-for` attribute as it will optimise the listing querying activity.
- It's highly recommended to perform the `api call` and other related operations in a seprate service file and consume them in the *.effect.ts file by creating a instance on it.
- Test case code coverage needs to be improved for components files.
- NGRX/store-devtools module bundle will be imported during production build file. Kindly follow the steps stated in the [link](https://ngrx.io/guide/store-devtools/recipes/exclude) **minimize the build file size**.
- Set limit on the **maximum allowed actions** to be stored in history, since when the number of actions grows as the application grows will result in larger memory utilization and results in application stalling. [instrumentation configuration](https://ngrx.io/guide/store-devtools/config).
- Folder structure needs to be refactored for the files in `+state` folder in the way each feature specific folder and the files to be moved into it. Doing so will be highly maintainable.

---
## Accessbility ##
---

### LightHouse ###
- Buttons do not have an accessible name - When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers.[Fixed]
- Image elements do not have [alt] attributes - Alt text is needed for understanding the image content if it's not loaded/available also it helps screen reader to understand it.[Fixed]
- Background and foreground colors do not have a sufficient contrast ratio. - Low-contrast text is difficult or impossible for many users to read.[Fixed]

### Manual ###
- Role attribute as presentation/action/submit would help screen readers to better understand on the purpose of the element (button, image,..).[Fixed]
- The page has a logical tab order - Role attribute as tablist on the parent of book items element will better explain the screen readers as inex tab items are present in it.[Fixed]
- Arial-label is needed for the icon to define their purpose and action they will perform on.[Fixed]
