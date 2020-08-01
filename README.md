# Budget app
[![license](https://img.shields.io/github/license/DAVFoundation/captain-n3m0.svg?style=flat-square)](https://github.com/DAVFoundation/captain-n3m0/blob/master/LICENSE)
The budget app is a web app that provide to the client an easy and a quick way to track his monthly **incomes** and **expenses**  

![Preview](https://media.giphy.com/media/fxZ7abRtiLXJ8MEdvj/giphy.gif)
## Setup

1. Either fork or download the app and open the folder in your ide of choice 
2. You need to install Nodejs: https://nodejs.org/en/
3. Write these commands in your CLI 
    ##### Install the dependencies in the local node_modules folder
    ```bash
    $ npm istall 
    ```
    ##### Set up a new or existing npm package
    ```bash
    $ npm init
    ```
      ##### Install Express.js, a Node js web application server framework
    ```bash
    $ npm install express
    ```
   ##### Install The last version of nedb which is the Js database used in this app 
    ```bash
    $ npm install nedb
    ```
    ##### Install json 
    ```bash
    $ npm install -g json
    ```
4. Start your local server 
   ```bash
    $ node app.js
    ```
5. Now if everything is installed correctly you can open the app by clicking this link http://localhost:8000/ and 8000 is the port i chose so if you change it in app.js you need to put the exact port in the link: "http://localhost:port/"
## How to use the budget app 
* It is pretty simple your have one __drop down__ to choose between (-) expenses and (+) incomes, also two text boxes one for a __description__ and the other for the __amount__ plus a blue submit button to save your data by clicking it
## Featurs

* You can add your expenses and incomes of the month 
* All data of the month are listed in two separated tables, one for your _Expenses_ and the other for the _Incomes_
* The head_bar containes month's name which is dynamic, it means it changes according to the current month 
* Under the head bar you have four sections:
    * First one it displays the total of your expenses and incomes "_incomes - expenses_", so it makes it easier for you to see your gains or losses of the month 
    * Second section is for the total of your incomes of the month 
    * Third one displays the total of your expenses of the month
    * Last section is your input space 
    * All your data is saved in database.db so even when you stop the server you will not lose your data
## Contact
Oussama Alaoui Ismaili - ousalis99@gmail.com
Project Link: https://github.com/OussamaAlaoui/Budget-app

