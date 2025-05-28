# Description of extra tasks done

## Bulk Delete Functionality:
Added the ability to select multiple tracks or all tracks at once and delete them in a single action. This improves user experience by making mass deletion more efficient.

## Optimistic UI Updates:
Implemented optimistic updates to immediately reflect changes in the user interface (such as deletions) before receiving confirmation from the server. This ensures a faster and smoother experience for users by reducing perceived wait times.



# NOTE
While performing a task with files, I didn't notice any logic for saving files on the back end, so I used the DropBox API for this. The API key is automatically updated, so unfortunately, it will not be valid during your test. Please write to me in the telegram @quantumop to provide you with a valid key, you will only need to substitute it in the .env file.


# ADR 0001: Improving Usability Through Intuitive and Accessible UI/UX Enhancements




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
