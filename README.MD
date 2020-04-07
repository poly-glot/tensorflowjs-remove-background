# tensorflowjs-remove-background
![CI/CD](https://github.com/poly-glot/tensorflowjs-remove-background/workflows/CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/poly-glot/tensorflowjs-remove-background/branch/master/graph/badge.svg)](https://codecov.io/gh/poly-glot/tensorflowjs-remove-background)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/poly-glot/tensorflowjs-remove-background)
[![Cypress.io Dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/projects/jp2thc/runs)
[![DeepScan grade](https://deepscan.io/api/teams/8408/projects/10623/branches/149386/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8408&pid=10623&bid=149386)
[![Maintainability](https://api.codeclimate.com/v1/badges/e9ab18c4667689e347de/maintainability)](https://codeclimate.com/github/poly-glot/tensorflowjs-remove-background/maintainability)
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/poly-glot/tensorflowjs-remove-background)

Remove Background from the picture using WebAssembly & TensorFlow.js

# Getting Started
```
npm install
npm start
```

# How it is pieced together
<img src="https://removebg.junaid.eu/assets/diagram.svg" alt="Flow diagram" />

## Demonstration
<table width="100%">
    <tr>
        <td width="100">Canvas</td>
        <td>How to manipulate <a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData" target="_blank">ImageData</a> to build a new image.</td>
    </tr>
    <tr>
        <td width="100">Canvas</td>
        <td><a href="https://github.com/poly-glot/tensorflowjs-remove-background/blob/00b6333c660ea1ecf7d1562dae56b68eea137041/src/component/output/events.js#L42" target="_blank">Save Canvas image.</a></td>
    </tr>    
    <tr>
        <td width="100">SEO</td>
        <td><a href="https://support.google.com/gsa/answer/6329153?hl=en#82542">Excluding Unwanted Text from the Google Index</a> <code>&lt;!--googleoff: index--&gt;</code></td>
    </tr>        
    <tr>
        <td width="100">HTML</td>
        <td>Use <code>referrerpolicy="no-referrer"</code> to disable hotlink protection.</td>
    </tr>
    <tr>
        <td width="100">HTML</td>
        <td>Use accept attribute e.g. <code>accept=".jpg,.png,.jpeg"</code> to allow users to select required file type.</td>
    </tr>  
    <tr>
        <td width="100">JS</td>
        <td>Handle events using <a href="https://javascript.info/bubbling-and-capturing">Event Bubbling</a>.</td>
    </tr>                                
    <tr>
        <td width="100">Accessibility</td>
        <td>A small &amp; Accessible Collapse implementation.</td>
    </tr>                                    
</table>

# Browser Support
2 most recent versions of Chrome, Firefox, Safari & MS Edge.
