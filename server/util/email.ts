import SparkPost from 'sparkpost';
import chalk from 'chalk';

const key = process.env.SPARKPOST_API_KEY;
const client = new SparkPost(key);

interface IName {
  first: string;
  last: string;
}

export const sendEmail = function (email: string, name: IName, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let recipient;
    let baseUrl;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://skipg.me/';
      recipient = {
        address: {
          name: `${name.first} ${name.last}`,
          email: email
        }
      };
    } else {
      baseUrl = 'http://localhost:4200/';
      recipient = {
        address: {
          name: 'Joey G',
          email: process.env.MYEMAIL
        }
      };
    }
    client.transmissions
      // @ts-ignore
      .send({
        options: {
          // sandbox: true
        },
        content: {
          from: {
            email: 'admin@mail.skipg.me',
            name: 'Test'
          },
          subject: 'Skipg.me password reset requested',
          // this link should be handled by the Angular router to send the token to an endpoint, find user by reset token, check to make sure
          // it is not expired, then redirect them to a password change page
          html: `<html><body>Click on this link to reset your password: ${baseUrl}resetlink/${token}</body></html>`
        },
        recipients: [recipient]
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(chalk.red('ERROR SENDING EMAIL!'));
        reject(err);
      });
  });
};
