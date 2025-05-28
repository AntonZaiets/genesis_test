# Description of extra tasks done

## Bulk Delete Functionality:
Added the ability to select multiple tracks or all tracks at once and delete them in a single action. This improves user experience by making mass deletion more efficient.

## Optimistic UI Updates:
Implemented optimistic updates to immediately reflect changes in the user interface (such as deletions) before receiving confirmation from the server. This ensures a faster and smoother experience for users by reducing perceived wait times.



# NOTE
While performing a task with files, I didn't notice any logic for saving files on the back end, so I used the DropBox API for this. The API key is automatically updated, so unfortunately, it will not be valid during your test. Please write to me in the telegram @quantumop to provide you with a valid key, you will only need to substitute it in the .env file.


# ADR 0001: Improving usability, maintainability, and scalability through a unified design system and development tooling




## Context

The project already supports key functionality such as adding, editing, deleting, sorting, and playing audio tracks. However, the current user experience suffers from several usability, maintainability, and scalability limitations:

- The UI is minimalistic but lacks clear visual hierarchy.

- No visual feedback is provided after user actions like saving or changing.

- The interface is not responsive well, limiting usability on mobile devices.

- Does not provide compatibility with programs for people with disabilities.

- Users cannot toggle between light and dark themes.

- Localization (i18n) is missing, limiting the application to a single language.

- There is no UI-kit, making it harder to reuse and maintain components.

- There is no CI/CD pipeline for validation and deployment automation.

- There is no Storybook setup for component isolation and documentation.

These issues make the system less intuitive and difficult to use effectively, especially for first-time users. It also affects the further expansion of the application and its maintain.




## Decision

To improve usability, maintainability, and scalability I propose implementing the following changes:

- Use contrast and layout to emphasize headings, buttons, and inputs.

- Add toast notifications for success and failure using libraries like react-hot-toast or notistack.

- Display loading during wait request from backed.

- Allow users to edit track properties like title or genre directly in the list view without opening a modal.

- Apply responsive styles using media queries or utility-first frameworks to support various screen sizes, especially mobile.

- Ensure the interface works well with screen readers and assistive technologies.

- Extract all UI elements (buttons, inputs, modals, etc.) into a central components/ui/ directory.

- Write test using Vite-Test.

- Set up Storybook for isolated component development, testing, and documentation.

- Use react-i18next to support multi-language capabilities (e.g., English and Ukrainian).

- Add theme toggling functionality using Tailwind theme configuration.

- Set up a GitHub Actions workflow to automatically run linting and testing on pull requests.



## Rationale

Improving the user experience along with introducing modern development tools transforms the project into a more scalable and production-ready solution.




## Status

Proposed




## Consequences

### Positive:

- Better overall user experience and satisfaction.

- Improved accessibility and mobile usability broaden the user base.

- A more professional, polished interface.

- Faster development through reusable components.

- Reduced risk of bugs and regressions via CI/CD.

- Enhanced developer documentation through Storybook.



### Negative:

- Additional development time and testing.

- Slightly increased complexity in the codebase.

- Team members may require onboarding for new tools and workflows.




### Negative:

- Additional development time and testing required for UI/UX improvements.

- Possible temporary misalignment between frontend and backend during transition.

- Increased complexity in the frontend codebase that may require more documentation and onboarding for new developers.
