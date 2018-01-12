# Real Time application example in Total.js

#### Description:

Implementation of realtime data from ticker and share the data to diffrent apps using socket.

#### Technology Stack:

 * [Node.js](https://nodejs.org/en/) (7.10.0)
 * [NPM](https://www.npmjs.com/) (5.5.1)
 * [Total.js](https://www.totaljs.com/)
 * [AngularJS](https://angularjs.org/)
 * [BootStrap 4 BETA](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
 
Database:

  ```
  Note: We can decide which datasource we need to use, right now we don't have any database integrated.
  ```


#### Requirements:

 * Should have NodeJS/NPM installed.

#### Development Environment:

I have made sure that the project behaves similarly on all the platforms.
But, I have used macOS Sierra system (10.12.6) and tested on Google Chrome(62.0.3202.89)

#### Project Setup:

##### Setup ticker app:

* The ```ticker app``` is responsible for fetching and broadcasting the data through the socket.
* To start the ```ticker app``` we need to follow the below steps.
* ```IMP Note:``` Always run ticker first before running brower app

```

1. Open First Terminal and Follow Step

$cd ticker/

$npm install

$npm start
```
* ``` npm start ``` will run the server once, and if we do any modification in ```ticker app code``` we need to run the server again to reflect the changes. So we can also run the server by ``` nodemon ``` by using the command as below.

```
$npm install -g nodemon <run if you don't have nodemon>
$nodemon
```
* You can decide if you want to use ``` npm start ``` or ``` nodemon ```.
* If everything is fine, you will see the ```ticker app``` is running on ```http://localhost:8000/```.


##### Setup browser app:

* The ```browser app``` is responsible for showing the coins information by using web socket with good UI/UX to the user and also it will provide the control over data to manipulation.
* To start the ```browser app``` we need to follow the below steps.

```
1. Open Second Terminal and Follow Step.

$cd browser/

$npm install

$npm start
```

* If everything is fine, you will see the ```browser app``` is running on ```http://localhost:9000/```.
* In order to run the application, you need to run both the apps ```(ticker and broswer)``` simultaneously.


#### How it works?

* When the ```ticker app``` start, it fetch the coins information from API and share the data using socket.
* The ```broswer app``` will fetch the data from socket and show on the Table.
* ```ticker app``` Will Fetch the data again and again on 30 Seconds interval.

#### Author:

* Praivn Tiwari
* Mail:  pravintiwari1992@gmail.com
