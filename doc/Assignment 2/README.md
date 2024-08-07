# CI/CD Pipeline for Project

This project uses GitLab CI/CD for continuous integration and deployment. The pipeline is divided into four stages: PreTest, Build, Deploy, and DeploymentTest. Each stage performs specific tasks to ensure the code is tested, built, deployed, and verified correctly.

## Workflow Implementation:
We began by creating the CI files containing the four stages. The stages:

## Stages Overview

1. **Pretest Stage:** This stage will run component and API tests locally using `npm test` for both the backend and frontend separately.

2. **Build Stage:** This stage will only run if the current new commit is to the master branch. We use the date as the version tag. During this stage, we push the new Docker images (i.e., new versions of the frontend and backend) to Docker Hub. Note: there are two images, one for the frontend and one for the backend.

3. **Deployment Stage:**  Inside the AWS EC2 machine, we pull the latest versions of the frontend and backend images and copy the content from `conf_aws` to `docker-compose` in the AWS EC2 machine so that we can run the frontend and backend images successfully inside AWS EC2.

4. **Deployment Test Stage:** This stage will try to connect to AWS EC2 and run tests to verify if the login is successful or not. This kind of test ensures the reliability of the deployment compared to the component test, which only ensures that there is a component in the pretest stage. Also, this test acts more like a human, which is more realistic.

## Detailed Stages and Jobs

### 1. PreTest

#### frontend_test
- **Image**: `node:20.16.0-alpine3.20`
- **Purpose**: Prepares and runs tests for the frontend.
- **Steps**:
  - Before script:
    - Navigate to the frontend directory.
    - Install dependencies.
  - Script:
    - Run frontend tests and save results to `frontend_test_results.txt`.
  - After script:
    - Clean up by removing `node_modules`.
  - Artifacts:
    - Save `frontend_test_results.txt` for 1 week.

#### backend_test
- **Image**: `node:20.16.0-alpine3.20`
- **Purpose**: Prepares and runs tests for the backend.
- **Steps**:
  - Before script:
    - Navigate to the backend directory.
    - Install dependencies.
  - Script:
    - Run backend tests and save results to `backend_test_results.txt`.
  - After script:
    - Clean up by removing `node_modules`.
  - Artifacts:
    - Save `backend_test_results.txt` for 1 week.

### 2. Build

#### build_image
- **Dependencies**: Needs `frontend_test` and `backend_test` to complete successfully.
- **Image**: `docker:24.0.5`
- **Services**: `docker:24.0.5-dind`
- **Variables**:
  - `DOCKER_TLS_CERTDIR`: "/certs"
  - `DOCKERFRONTEND`: "cscc01_assignment_2-frontend"
  - `DOCKERBACKEND`: "cscc01_assignment_2-backend"
- **Purpose**: Pushes new Docker images (of frontend and backend) to Docker Hub.
- **Steps**:
  - Before script:
    - Set the version using the current date and time.
    - Log in to Docker Hub.
  - Script:
    - Build Docker images.
    - Tag images with version and latest tags.
    - Push images to Docker Hub.

### 3. Deploy

#### deploy_image
- **Dependencies**: Needs `build_image` to complete successfully.
- **Image**: `docker:24.0.5`
- **Services**: `docker:24.0.5-dind`
- **Variables**:
  - `AWS_EC2_URL`: "ec2-user@ec2-54-167-41-40.compute-1.amazonaws.com"
  - `AWS_HOME`: "/home/ec2-user"
- **Purpose**: Deploys the Docker images to AWS EC2. Copy the content in 'conf_aws' to 'docker-compose' in AWS EC2 to sucessfully run both frontend and backend images in AWS EC2
- **Steps**:
  - Before script:
    - Prepare SSH keys for deployment.
  - Script:
    - Copy the config file to AWS EC2.
    - Log in to Docker Hub.
    - Stop running Docker containers.
    - Pull the latest images from Docker Hub.
    - Start containers using Docker Compose.
  - After script:
    - Confirm the deployment completion.

### 4. DeploymentTest

#### deploy_test
- **Dependencies**: Needs `deploy_image` to complete successfully.
- **Image**: `python:3.9`
- **Services**: `selenium/standalone-chrome:latest`
- **Purpose**: Runs automated tests to verify the deployment. Tries to connect to AWS EC2 and runs test to verify logins.
- **Steps**:
  - Before script:
    - Install testing dependencies.
  - Script:
    - Execute Selenium tests and generate test reports.
  - Artifacts:
    - Save the test results for one week.

## Citation

We learned some knowledge and partial code from the following sources:

1. [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
2. [YouTube Tutorial](https://www.youtube.com/watch?v=-4XT8-znkuc&list=PLBd8JGCAcUAEwyH2kT1wW2BUmcSPQzGcu)
3. [YouTube Tutorial](https://www.youtube.com/watch?v=qP8kir2GUgo)
4. Material from CSCC01 tutorial and lecture slides.
5. [GitLab CI/CD End-to-End Testing with WebDriverIO](https://docs.gitlab.com/ee/ci/examples/end_to_end_testing_webdriverio/)
6. [StackOverflow Discussion](https://stackoverflow.com/questions/72263278/running-ui-tests-with-chrome-driver-in-gitlab-ci-cd-pipeline)


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
