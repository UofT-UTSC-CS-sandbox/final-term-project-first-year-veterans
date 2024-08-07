# Briefly Description of this Project
What is the purpose of our project?

Our project is designed for a university student who is willing to :
1. find a mentor for academic purposes
2. find a mentor or see someone's experience in a career (i.e. include internship)
3. find a teammate or colleague to attend an event
4. find a teammate to build a project together.

Why does this project come out?

We intend to create a website to create a better social networking platform for students in any university worldwide. Due to COVID-19, we observe that people have less chance to connect with others.

How will this project work?

We will build a website that includes four main categories: academic, career, project, and event. Each category will provide specific information and resources tailored to the needs of university students.
Students can find some information based on their interest in these four categories.
  
# Motivation
Recently, the job market has not been good. Students may need a referral to get a job. However, due to COVID-19 and online courses, many students did not have the chance to make friends or connect with colleagues. Therefore, this project comes to mind as we would like to provide a platform for students to broaden their social network as well as offer guidance with career choices, academics, and allowing students to work on projects together.

# Installation
Currently, our product is held on the internet. 

There is no download required.

Therefore, there is no installation required.

# Contribution:
## Workflow & Branch Naming
This project will use the "Git flow" workflow.
This means that we will have the following branches:

1. Main branch: A branch that deploys websites.

2. Hotfix branch: A branch to fix an emergency bug from the Main branch.

3. Release branch: A branch pre-processes and tests the deployment code before merging into the Main branch.

4. Development branch: A branch that stores collections of change or adds new features.

5. Feature branch: A branch that creates a new feature or modifies an existing branch. 

Format of each branch:

Main branch: 
- version[number] 
  - For example, version1.0

Release branch: 
- release/[future version number]  
  -  For example, release/1.0
- We will add the subsequence number if a bug is found during code integration or automated testing. 
  - For example, release/1.1

Development branch:
- DEV-[number of sprint] 
  - For example, if this is the first sprint, then the number will be DEV-1.0
- If there is a bug found in the release branch and merged back to the Development branch, then we will add the number to the Development version.
  - For example, DEV-1.1

Feature branch:
- DEV-1-[feature name]. 
  - For example, if we implement the login feature, the possible feature branch will be DEV-1-LoginPage.
## Issues
We will use the git issue to mention a potential question.

## Before Merge to Development Branch
We will use the git pull request before merging to the Development branch. So that, everyone can use the pull request from development branch to their local branch after new change.

# CI Pipeline Overview

This project uses GitLab CI/CD for continuous integration and deployment. The pipeline consists of four main stages:

1. **PreTest**: Runs tests for the frontend and backend.
2. **Build**: Builds Docker images for the application.
3. **Deploy**: Deploys the Docker images to the target environment.
4. **DeploymentTest**: Runs tests to verify the deployment.

## Stages and Jobs

### 1. PreTest

#### frontend_test
- **Image**: `node:20.16.0-alpine3.20`
- **Purpose**: Prepares and runs tests for the frontend.
- **Steps**:
  - **Before script**:
    - Navigate to the frontend directory.
    - Install dependencies.
  - **Script**: Runs frontend tests.
  - **After script**:
    - Cleans up by removing `node_modules`.

#### backend_test
- **Image**: `node:20.16.0-alpine3.20`
- **Purpose**: Prepares and runs tests for the backend.
- **Steps**:
  - **Before script**:
    - Navigate to the backend directory.
    - Install dependencies.
  - **Script**: Runs backend tests.
  - **After script**:
    - Cleans up by removing `node_modules`.

### 2. Build

#### build_image
- **Dependencies**: Needs `frontend_test` and `backend_test` to complete successfully.
- **Image**: `docker:24.0.5`
- **Services**: `docker:24.0.5-dind`
- **Variables**:
  - `DOCKER_TLS_CERTDIR`: "/certs"
- **Purpose**: Builds Docker images for the frontend and backend.
- **Steps**:
  - **Before script**:
    - Sets the version.
    - Logs into the Docker registry.
  - **Script**:
    - Builds Docker images and tags them with the current timestamp and latest.
    - Pushes the images to the Docker registry.

### 3. Deploy

#### deploy_image
- **Image**: `docker:24.0.5`
- **Services**: `docker:24.0.5-dind`
- **Purpose**: Deploys the Docker images to the target environment.
- **Steps**:
  - **Before script**: Prepares SSH keys for deployment.
  - **Script**:
    - Pulls the latest Docker images.
    - Updates the running containers on the target server.
  - **After script**: Confirms the deployment completion.

### 4. DeploymentTest

#### deploy_test
- **Image**: `python:3.9`
- **Services**: `selenium/standalone-chrome:latest`
- **Purpose**: Runs automated tests to verify the deployment.
- **Steps**:
  - **Before script**: Installs testing dependencies.
  - **Script**: Executes Selenium tests and generates test reports.
  - **Artifacts**: Saves the test results for one week.