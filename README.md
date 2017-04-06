# Wattle_frontend

# Introduction to the Team

| collaborators |               |               |            |                         |
|---------------|---------------|---------------|------------|-------------------------|
| Ron Dunphy    | Kyle Winckler | Carolina Ceja | Dan Peters | Jessica Vasquez-Soltero |

# Project Objective

Our goal is to provide a project workflow that will easily couple tasks to the assignee and allow for those tasks to be placed into categories.  The work flows from google docs to the Wattle application where the tasks can be assigned, from an uncategorized list, to the categories that each user sets.

# Schemas Used

All data is stored using Mongo in the Backend of our Project

### -Category: 
The different naming conventions used for each container, whether it be
 for different project names, or to assign urgency ratings for unassigned tasks.

### -Document: 
googleID, name, array of tasks.

### -Tag: 
Tags will identify properties on the comment object so that we can create custom filters.

### -Task: 
All tasks to be completed. These tasks are imported from Google Docs, where the tasks are created.

### -User: 
All users that have created accounts.

### OAUTH:

The user is signed into Google already, and is using Google docs. Next, permission is granted by the user allowing google to share their information with the Wattle app. Then the Google OAuth API sends server code to the Wattle backend server. The Wattle backend server then sends the code back to the OAuth API with their 'secret' included. Then the Google OAuth API sends back an access token with the request token. Then a request, with the bearer authorization token in the header, is sent to the Google openid API, which will fetch a specific set of information about the user. The user is then placed into the application's database, and can begin using Wattle.

![googleoauth](https://cloud.githubusercontent.com/assets/15117936/24737861/b3d5819c-1a46-11e7-87f4-29f18c7c37dc.jpg)
