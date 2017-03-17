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
Once you are all done, save your code to a persistant URL, and we'll hold on to it for you or anyone you want ot show it to.

## Running it yourself

1. Clone this repository `git clone https://github.com/maryvilledev/codeplainUI`
2. Download [Docker](https://docs.docker.com/engine/installation/) and [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
3. Run `./devstack`
4. Create a file called `.env` that sets `PORT=8080` and `REDIS_URL=localhost`
5. Run `heroku local`
6. Navigate to `http//localhost:8080`
