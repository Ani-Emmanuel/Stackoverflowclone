ABOUT

This project is an Api based test project that focuses on some of the features of stackoverflow.

**Features like:**

- User signup
- User sign in (using JWT)
- Ask Questions
- View Questions
- Upvote or downvote question
- Answer Question
- Search (Questions,Answers and Users)
- Finally subscribe to get notification when their question is answered

HOW TO SET UP THE PROJECT

The project is built with **NodeJs, Express and Mongodb** to set it up in your system you need to follow this steps:

1. Clone the project to any location in your local machine.
2. Cd in to the project directory and run **npm install **to install all the packages used to develop the project
3. In the root folder create a file with the name **.env **
4. In the file create five variables all in cap **SECRET,** **DB_URL,** **PORT** **EMAIL** and **PASSWORD **and set them accordingly eg

   1. SECRET = your secret word or sentence
   2. DB_URL = Your database connection string
   3. PORT = the port the application will be running on eg 3000
   4. EMAIL = Your email provider
   5. PASSWORD = your email password

   **NOTE:** I setup the project with yahoo smtp settings so if you chose to use any other mailing agents you need to the heeper folder and inside the folder you will see a file called helper open the file and find this function **emailSubscription **and change the smtp configuration to your email smtp configuration. Finally Your .**env** configuration should not contain any **quote** around **variable** or **value. **If you are using are using gmail,yahoomail you need to go to your account settings to enable the option to **allow apps that use less secure sign in.**

5. You can now run the final command **npm start** to start the project.
