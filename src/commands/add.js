import applescript from 'applescript-promise';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';

const tic = chalk.green('✓');
const tac = chalk.red('✗');

const spinner = ora();

const scriptPath = `${__dirname}/../scripts/add_reminder.applescript`;

const addReminder = async (providedArgs) => {
  let info = providedArgs;
  const questions = [];
  if (!providedArgs.name) {
    questions.push(
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of the reminder?',
      },
    );
  } else {
    console.log(`${tic} Creating ${info.name}...`);
  }

  if (!providedArgs.date) {
    questions.push(
      {
        type: 'input',
        name: 'date',
        message: 'What\'s the due date of the reminder?',
      },
    );
  }

  if (!providedArgs.time) {
    questions.push(
      {
        type: 'input',
        name: 'time',
        message: 'What\'s the time of the reminder?',
      },
    );
  }

  if (questions.length) {
    const response = await inquirer.prompt(questions);

    info = {
      ...info,
      ...response,
    };
  }

  spinner.start();

  spinner.text = 'Creating the new reminder...';

  try {
    await applescript.execFile(scriptPath, Object.values(info));

    spinner.stop();

    console.log(`${tic} Reminder added successfully!`);
  } catch (err) {
    spinner.stop();

    console.log(`${tac} There was an error while trying to add the reminder. 😕`);
  }
};

export default addReminder;
