# Workflow:
This project will focus on the "Git flow" workflow.
This means that we will have the following branches:

1. Main branch: A branch that deploys websites.

2. Hotfix branch: A branch to fix an emergency bug from the Main branch.

3. Release branch: A branch pre-processes and tests the deployment code before merging into the Main branch.

4. Development branch: A branch that stores collections of change or adds new features.

5. Feature branch: A branch that creates a new feature or modifies an existing branch. 

Format of each branch:
Main branch: 
version[number] 
For example, version1.0

Release branch: 
release/[future version number] 
For example, release/1.0
We will add the subsequence number if a bug is found during code integration or automated testing. For example, release/1.1

Development branch:
DEV-[number of sprint] 
For example, if this is the first sprint, then the number will be DEV-1.0
If there is a bug found in the release branch and merged back to the Development branch, then it will become DEV-1.1

Feature branch:
DEV-1-[feature name]. 
For example, if we implement the login feature, the possible feature branch will be DEV-1-LoginPage.
