# Description of extra tasks done

## Bulk Delete Functionality:
Added the ability to select multiple tracks or all tracks at once and delete them in a single action. This improves user experience by making mass deletion more efficient.

## Optimistic UI Updates:
Implemented optimistic updates to immediately reflect changes in the user interface (such as deletions) before receiving confirmation from the server. This ensures a faster and smoother experience for users by reducing perceived wait times.



# NOTE
While performing a task with files, I didn't notice any logic for saving files on the back end, so I used the DropBox API for this. The API key is automatically updated, so unfortunately, it will not be valid during your test. Please write to me in the telegram @quantumop to provide you with a valid key, you will only need to substitute it in the .env file.
