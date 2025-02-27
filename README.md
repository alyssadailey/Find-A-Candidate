# <#Find-A-Candidate>

## Description

Find-A-Candidate is a web application designed to help recruiters and hiring managers discover potential software developers using GitHub's API. With a private GitHub API token, users can browse developer profiles, save promising candidates, and remove those who don't fit their criteria.

## Table of Contents

Table of contents to make it easy for users to find what they need:

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Features](#features)
- [Questions](#questions)

## Installation

Prerequisites:

Ensure you have the following installed:

-Node.js

-GitHub Personal Access Token

Set Up:

1. Clone the Repo: 

git clone https://github.com/alyssadailey/Find-A-Candidate.git

2. Navigate to the project folder:

cd Develop

3. Install dependencies:

npm i

4. Create a .env file in the root directory and add your GitHub API token:

VITE_GITHUB_TOKEN=ACCESS_TOKEN_HERE

5. Start the developement server:

npm run dev

## Usage

Live Site: https://find-a-candidate.onrender.com

-Open the app in your browser (http://localhost:3000 by default).

photo reference:![Alt text](../Develop/src/assets/SS-1.png)

-View developer profiles fetched from GitHub.

photo reference:![Alt text](../Develop/src/assets/SS-2.png)

-Use the green plus (+) button to save a candidate.

-Use the red minus (-) button to skip a candidate.

-When the user has gone through all available candidates, it will display that there are no new candidates to view

photo reference:![Alt text](../Develop/src/assets/SS-3.png)

-Navigate to the Potential Candidates page to review saved developers.

photo reference:![Alt text](../Develop/src/assets/SS-4.png)

-Click the Remove button to discard a saved candidate if necessary.

## Credits

-Colaberated with instructor Aaron Brown during office hours to answer any questions I had throughout this project.

-Also used Xpert Learning Assistance and ChatGBT to assist me in answering any questions I had throughout this project.

## Features

-Browse Developers: Fetch potential software developers' information from GitHub.

-View Candidate Profiles: Access key details such as name, username, avatar, email, company, GitHub URL, and location.

-Save Candidates: Click the green plus (+) button to add a developer to the "Potential Candidates" page.

-Reject Candidates: Click the red minus (-) button to dismiss a developer and move to the next profile.

-Manage Potential Candidates: View saved candidates on a dedicated page and remove them if necessary.

## Questions

If you have any questions, please reach out to me at [alyssadailey28@gmail](mailto:alyssadailey28@gmail).
You can find more of my work at [Github.com/alyssadailey](https://github.com/Github.com/alyssadailey).

