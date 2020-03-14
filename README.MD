# front-end-starter-kit
![CI/CD](https://github.com/poly-glot/vanilla-front-end-starter/workflows/CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/poly-glot/vanilla-front-end-starter/branch/master/graph/badge.svg?token=K6AIDS2WN8)](https://codecov.io/gh/poly-glot/vanilla-front-end-starter)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/poly-glot/vanilla-front-end-starter)
[![Cypress.io Dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/projects/8joug9/runs)
[![DeepScan grade](https://deepscan.io/api/teams/8408/projects/10599/branches/148870/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8408&pid=10599&bid=148870)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/poly-glot/vanilla-front-end-starter)

A vanilla front-end starter kit with tools to support code quality, accessibility, unit testing, end to end testing, 
continuous integration setup and feature branch testing.

## Who it is for
Suitable for responsive sites or simple applications in a fast pace delivery environment with 
shared nothing front-end architecture using vanilla js. However, code should be isolated & independent where possible to allow us to
take benefits of previous projects and experience.

## List of tools
- Code Quality: Eslint, Stylelint & Deepscan
- Unit Testing: Jest + Enzyme
- End to End testing: Cypress.io + Percy.io
- CI: Github Actions

# Getting Started
```
npm install
npm start
```

## Adding a new Feature
- Familiarise yourself with Gitflow and checkout a feature branch from master e.g. feature/awesome-feature.
- Keep your feature branch upto date with master.
- Use <a href="https://www.conventionalcommits.org/">Conventional Commits spec</a> e.g. (fix/feat/refactor/refactor!) | Component | Task ID - Small Description

## Manual Review Guidelines
<table width="100%">
    <tr>
        <td width="100">CSS</td>
        <td>Use BEM naming convention </td>
    </tr>
    <tr>
        <td width="100">JS</td>
        <td>Prefix DOM Element class name or ID with "js-" to indicate element is linked to Javascript</td>
    </tr>    
    <tr>
        <td width="100">JS</td>
        <td>Use Async/Await over promises</td>
    </tr>        
    <tr>
        <td width="100">JS</td>
        <td>Keep Code branching to one level and reduce nested if/else statements</td>
    </tr>
    <tr>
        <td width="100">JS</td>
        <td>Leverage Modern Browser API's instead of bloated libraries or framework e.g. use fetch instead of axios</td>
    </tr>                            
</table>

# Estimation Guide for Static Projects
(TODO)

# Local Development

### Running Github Action
```
# https://github.com/nektos/act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
act pull_request
act --job ci
```

### Running Sonar
```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
docker run -ti -v $(pwd)/src:/root/src --link sonarqube newtmitch/sonar-scanner
```

### Docker
```
docker build -t vanilla-front-end-starter .
docker run -it --rm -p 5000:5000 vanilla-front-end-starter
```

# Browser Support
2 most recent versions of Chrome, Firefox, Safari & MS Edge.

# Todo 
- Feature : CI/CD - Add Docker preview.
- Feature : CI/CD - Add automatic release after every two weeks.

# Github Secrets
- ZEIT_TOKEN
- NOW_ORG_ID
- NOW_PROJECT_ID_STATIC
- PERCY_TOKEN
- CYPRESS_RECORD_KEY
- CODECOV_TOKEN

# Non functional Requirements
