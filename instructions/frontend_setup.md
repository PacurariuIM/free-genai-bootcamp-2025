# Frontend technical spec

## Global components

Navigation bar will be horizontal, with the following links:
- dashboard
- study activities
- words
- groups
- settings

## Pages

Default route '/' will redirect to '/dashboard'.

### Dashboard Index `/dashboard`

#### Purpose:

The purpose of this page is to provide a summary of learning and act as the default page when a user visit the webapp.

#### Components:

- Last study session
  - show last activity used
  - show when last activity used
  - summarizes wrong vs correct from last activity

- Study progress
  - total words studied across all study sessions from db
  - display a mastery progress eg. 0%

- Quick Stats
  - success rate e.g. 80%
  - total study sessions eg. 4
  - total active groups eg. 2
  - study streak eg. 3 days

- Start studying button
  - goes to study activities page

#### API endpoints needed:

- GET /api/dashboard/last_study_session
- GET /api/dashboard/study_progress
- GET /api/dashboard/quick_stats



### Study Activities Index `/study_activities`


#### Purpose:

The purpose of this page is to show a collection of study activities with a thunmbail and its name, to either launch or view the study activity.


#### Components:

- Study activity card
    - thumbnail
    - name
    - launch button to take us to the launch page
    - the view page for more info about past study sessions


#### API endpoints needed:

- GET /api/study_activities


### Study Activity Show `/study_activities/:id`

#### Purpose:

The purpose of this page is to show a detailed view of a study activity, including past study sessions, mastery score, and other relevant metrics.

#### Components:


- name of the study activity
- Thumbnail of the study activity
- Description of the study activity
- Launch button
- Study activities paginated list:
  - id
  - activity name
  - group name
  - start time
  - end time (infered by the last word_review_item submitted)
  - number of review items


#### API endpoints needed:

- GET /api/study_activities/:id
- GET /api/study_activities/:id/study_sessions



### Study Activities Launch `/study_activities/:id/launch`


#### Purpose:

The purpose of this page is to launch a study activity, which will take the user to the study session page.

#### Components:


- name of the study activity
- Launch form
  - select field for group
  - launch now button

#### Behaviour

After the form is submitted a new tab opens with the study activity based on its URL provided in the database.

Also the after form is submitted the page will redirect to the study session show page.

#### API endpoints needed:

- POST /api/study_activities


### Words Index `/words`

#### Purpose:

The purpose of this page is to show a list of words in our db.

#### Components:

- Paginated word list:
  - Columns:
      German
      English
      Correct count
      Wrong count
  - Pagination with 100 items per page
  - Clicking the German word will take us to the word show page

#### API endpoints needed:

- GET /api/words

### Word Show `/words/:id`

#### Purpose:

The purpose of this page is to show a detailed view of a word

#### Components:

- German word
- English word
- Study statistics
  - Correct count
  - Wrong count
- Word groups
  - show a series of pills eg. tags
  - when a group name is clicked it will take us to the group show page

#### API endpoints needed:

- GET /api/words/:id

### Word Groups Index `/groups`

#### Purpose:

The purpose of this page is to show a list of word groups in db.

#### Components:

- Paginated group list:
  - Columns:
    - Group name
    - Word count
  - Clicking the group name will take us to the group show page

#### API endpoints needed:

- GET /api/groups

### Group Show `/groups/:id`

#### Purpose:

The purpose of this page is to show a detailed view of a word group.

#### Components:

- Group name
- Group statistics
  - Word count
- Words in group
  - Paginated word list:
    - Columns:
      - German
      - English
      - Correct count
      - Wrong count
- Study sessions
  - Paginated study session list:
    - Columns:
      - Start time
      - End time
      - Success rate
      - Word count

#### API endpoints needed:

- GET /api/groups/:id (the name and groups stats)
- GET /api/groups/:id/words
- GET /api/groups/:id/study_sessions


### Study Sessions Index `/study_sessions`

#### Purpose:

The purpose of this page is to show a list of study sessions in db.

#### Components:


- Paginated study session list:
    - Columns:
        - Id
        - Activity name
        - Group name
        - Start time
        - End time
        - Number of review items
    - Clicking the id will take us to the study session show page

#### API endpoints needed:

- GET /api/study_sessions

### Study Session Show `/study_sessions/:id`


#### Purpose:

The purpose of this page is to show a detailed view of a study session.

#### Components:
- Study session details
  - Activity name
  - Group name
  - Start time
  - End time
  - Number of review items
- Word review items
  - Should use the same component as the words index page

#### API endpoints needed:

- GET /api/study_sessions/:id
- GET /api/study_sessions/:id/words


### Settings Page `/settings`

#### Purpose:

The purpose of this page is to make configuration changes to the study portal.

#### Components:

- Theme selection eg. light and dark mode
- Reset history button
  - this will delete all study sessions and word review items
- Full Reset button
  - this will delete all tables and re-create with seed data

#### API endpoints needed:

- POST /api/settings/reset_history
- POST /api/settings/full_reset



