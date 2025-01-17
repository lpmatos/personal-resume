#!/usr/bin/env node

import chalk from 'chalk';
import console from 'console';
import inquirer from 'inquirer';
import {createRequire} from 'module';

var response = chalk.bold.yellow;

const resume = createRequire(import.meta.url)('./assets/resume.json');

var resumePrompts = {
  type: 'list',
  name: 'resumeOptions',
  message: 'What do you want to know about me?',
  choices: [...Object.keys(resume), 'Exit'],
};

function resumeHandler() {
  inquirer
    .prompt(resumePrompts)
    .then((answer) => {
      if (answer.resumeOptions == 'Exit') return;
      let option = answer.resumeOptions;
      console.log(response('--------------------------------------------------'));
      resume[`${option}`].forEach((info) => {
        console.log(response('|   => ' + info));
      });
      console.log(response('--------------------------------------------------'));
      inquirer
        .prompt({
          type: 'list',
          name: 'exitBack',
          message: 'Go back or Exit?',
          choices: ['Back', 'Exit'],
        })
        .then((choice) => {
          if (choice.exitBack == 'Back') {
            resumeHandler();
          } else {
            return;
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function printWelcome() {
  console.log(chalk.green('┌──────────────────────────────────────────────────────────────┐'));
  console.log(chalk.green('│ Hello, my name is Lucca and welcome to my CLI resume!        │'));
  console.log(chalk.green('└──────────────────────────────────────────────────────────────┘'));
}

function main() {
  printWelcome();
  resumeHandler();
}

main();
