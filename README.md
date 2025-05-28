# Description of extra tasks done

## Bulk Delete Functionality:
Added the ability to select multiple tracks or all tracks at once and delete them in a single action. This improves user experience by making mass deletion more efficient.

## Optimistic UI Updates:
Implemented optimistic updates to immediately reflect changes in the user interface (such as deletions) before receiving confirmation from the server. This ensures a faster and smoother experience for users by reducing perceived wait times.



# NOTE
While performing a task with files, I didn't notice any logic for saving files on the back end, so I used the DropBox API for this. The API key is automatically updated, so unfortunately, it will not be valid during your test. Please write to me in the telegram @quantumop to provide you with a valid key, you will only need to substitute it in the .env file.


# ADR 0001: Improving usability through intuitive and accessible UI/UX




## Context

The project already supports key functionality such as adding, editing, deleting, sorting, and playing audio tracks. However, the current user experience suffers from several usability issues:

- The UI is minimalistic but lacks clear visual hierarchy.

- No visual feedback is provided after user actions like saving or changing.

- The interface is not responsive well, limiting usability on mobile devices.

- Does not provide compatibility with programs for people with disabilities

These issues make the system less intuitive and harder to use efficiently, particularly for non-technical or first-time users.




## Decision

To improve usability, I propose implementing the following UI/UX changes:

- Use contrast and layout to emphasize headings, buttons, and inputs.

- Add toast notifications for success and failure using libraries like react-hot-toast or notistack.

- Display loading spinners during deletions.

- Allow users to edit track properties like title or genre directly in the list view without opening a modal.

- Apply responsive styles using media queries or utility-first frameworks to support various screen sizes, especially mobile.

- Ensure the interface works well with screen readers and assistive technologies.



## Rationale

Improving usability directly enhances the product's effectiveness and user satisfaction. A more intuitive interface reduces the learning curve, minimizes user errors, and increases engagement. In projects involving content management (such as audio tracks), users expect quick, predictable interactions. Clear feedback, keyboard support, and mobile responsiveness are critical for creating a polished, professional application.

Furthermore, these improvements align with industry best practices and are relatively low-cost in terms of implementation, especially given the existing clean codebase. Enhancing usability now also reduces the risk of costly redesigns in the future.




## Status

Proposed




## Consequences

### Positive:

- Better overall user experience and satisfaction.

- Clearer user actions reduce mistakes and support task completion.

- Improved accessibility and mobile usability broaden the user base.

- A more professional, polished interface.



### Negative:

- Additional development time and testing required for UI/UX improvements.

- Possible temporary misalignment between frontend and backend during transition.

- Increased complexity in the frontend codebase that may require more documentation and onboarding for new developers.

















# ADR-001: Migration from Javascript to Typescript

## Context

Currently, our Task Management app is built using Javascript. As we plan to introduce more new features and improve existing ones, the size, and complexity of the application will increase. This leads us to face the following challenges: 

- **Maintainability**: Difficulty in the code refactoring, and understanding the data flow due to the dynamic nature of JavaScript.
- **Developer Productivity**: Increased time spent on debugging runtime errors.
- **Code Quality and Reliability**: Lack of type checking leads to potential bugs and unexpected application behavior.

## Decision

We will use Typescript as the primary language for all new features, and will gradually migrate existing features from Javascript to Typescript.

## Rationale
- *Improved Code Quality and Reliability*: Typescript is statically typed, allowing type checking at compile time. This helps catch errors early in the development process, reducing the runtime errors.
- *Enhanced Maintainability*: Explicit type definitions make the codebase easier to understand, navigate, and refactor. Developers can quickly understand the expected data structures, which reduces their workload.
- *Increased Developer Productivity*: Typescript type system enables better code completion, navigation, and refactoring in IDEs, improving developer productivity. Many common JavaScript errors are caught at compile time, saving debugging time.
- *Easier Onboarding*: New team members can understand the codebase more quickly by relying on type definitions, it can be used as a documentation.
- *Scalability*: Typescript features make it easier to scale applications, as the code is more organized and maintainable.

## Status
Proposed

## Consequences

#### Positive Consequences:

- *Better Maintainability*: Significant reduction in type-related bugs reaching production. Easier to refactor code with confidence, all breaking changes are surfaced by the type checker.
- *Improved Code Readability*: Clearer understanding of data structures and function contracts.
- *Faster Development*: Developers spend less time debugging and more time building features due to better tooling and early error detection.
- *Better Developer Experience*: Better onboarding for new developers via autocomplete and type hints.

#### Negative Consequences:
- *Increased Code Complexity*: Developers new to TypeScript will require time to learn the language and its concepts.
- *Increased Initial Setup*: Initial setup and configuration of TypeScript with various build tools require some effort.
- *Migration Effort*: Existing JavaScript code will need to be migrated, which can be a time-consuming process depending on the size and complexity of the codebase. This will be managed incrementally.


