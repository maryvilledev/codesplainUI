# Codesplain UI  [![CircleCI](https://circleci.com/gh/maryvilledev/codesplainUI.svg?style=svg)](https://circleci.com/gh/maryvilledev/codesplainUI)

UI layer for Codesplain, an application to have your code explain itself to you.

## Features
### Integrated IDE
Codesplain utilizes [Codemirror](http://codemirror.com/) to provide an IDE experience to the user.
Paste in a code snippet, or write one right in the browser!
### Filtering by Concept
Codesplain analyzes your code and presents you with a list of language concepts present in it.
Pick out which concepts are important to you, and they will be highlighted in the IDE.
### Annotations in the Margins
Once your code is written, you can add an annotation to a line by clicking its number.
Say anything you want about it. Markdown is even supported.
### Save and Share
Once you are all done, save your code to a persistant URL, and we'll hold on to it for you or anyone you want to show it to.

## Serverless Application
This application is built as a React SPA and uses XHR for data requests to a REST API. As a result, the application can be deployed serverless. For a better idea of what that looks like, see https://github.com/maryvilledev/codesplain-lambdas.
