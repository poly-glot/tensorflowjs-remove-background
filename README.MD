# tensorflowjs-remove-background
![CI/CD](https://github.com/poly-glot/tensorflowjs-remove-background/workflows/CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/poly-glot/tensorflowjs-remove-background/branch/master/graph/badge.svg)](https://codecov.io/gh/poly-glot/tensorflowjs-remove-background)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/poly-glot/tensorflowjs-remove-background)
[![Cypress.io Dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/projects/jp2thc/runs)
[![DeepScan grade](https://deepscan.io/api/teams/8408/projects/10623/branches/149386/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8408&pid=10623&bid=149386)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/poly-glot/tensorflowjs-remove-background)

Remove Background from picture using WebAssembly & TensorFlow.js

# Getting Started
```
npm install
npm start
```

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
