### ABOUT StackOverflow Clone

This project is an Api based test project that focuses on some of the features of stackoverflow.

This project mimic some of the features of Stackoverflow like SignUp with JWT, ask Questions, if subscribe for notification you will get notification when your question is answered. Answer Question and you need your token to perform create,update and delete on Question and answer

*Features like:*

- User signup
- User sign in (using JWT)
- Ask Questions
- View Questions
- Upvote or downvote question
- Answer Question
- Search (Questions,Answers and Users)
- Finally subscribe to get notification when their question is answered

### HOW TO SET UP THE PROJECT

The project is built with *NodeJs, Express and Mongodb* to set it up in your system you need to follow this steps:

- Clone the project to any location in your local machine.
- Cd in to the project directory and run *npm install *to install all the packages used to develop the project
- In the root folder create a file with the name *.env *
- In the file create five variables all in cap *SECRET,* *DB_URL,* *PORT* *EMAIL* and *PASSWORD *and set them accordingly eg
like so:

  - SECRET=your secret word or sentence
  - DB_URL=Your database connection string
  - PORT=the port the application will be running on eg 3000
  - EMAIL=Your email provider
  - PASSWORD=your email password

   *NOTE:* I setup the project with yahoo smtp settings so if you chose to use any other mailing agents you need to the helper folder and inside the folder you will see a file called helper open the file and find this function *emailSubscription* 
and change the smtp configuration to your email smtp configuration. Finally Your .*env* configuration should not contain any *quote* around *variable* or *value. *If you are using are using gmail,yahoomail you need to go to your account settings to enable the option to *allow apps that use less secure sign in.*

5. You can now run the final command *npm start* to start the project.

[For the Api Documentation click here](https://documenter.getpostman.com/view/6648981/SWTD8wu2?version=latest)
