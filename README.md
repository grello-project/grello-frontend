# Wattle_frontend

# Introduction to the Team

| collaborators |               |               |            |                         |
|---------------|---------------|---------------|------------|-------------------------|
| Ron Dunphy    | Kyle Winckler | Carolina Ceja | Dan Peters | Jessica Vasquez-Soltero |

# Project Objective

Our goal is to provide a project workflow that will easily couple tasks to the assignee and allow for those tasks to be placed into categories.  The work flows from google docs to the Wattle application where the tasks can be assigned, from an uncategorized list, to the categories that each user sets.

# Schemas Used

All data is stored using Mongo in the Backend of our Project

-Category: The different naming conventions used for each container, whether it be
 for different project names, or to assign urgency ratings for unassigned tasks.

-Document: googleID, name, array of tasks.

-Tag: Tags will identify properties on the comment object so that we can create custom filters.

-Task: All tasks to be completed.

-User: All users that have created accounts.
