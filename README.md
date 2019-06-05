
# Angular Authentication & CRUD with Firebase
Angular 7 CRUD (Create, Read, Update and Delete) app with Angular Material 7 and Firebase real-time NoSQL database (version 6.0.2).

This is an example with a Book Store, but you can adapt it to your purpose.

## Intructions to configurate application:
### First of all do this:
- __npm install__ to install node modules in the project.
### Firebase configuration:
-  First create a free account in [https://firebase.google.com](https://firebase.google.com) but if you already got one go to the next step.
-   As second step __Add a new proyect__ , and name it as you want.
-  Third create a __database__ for this project.
- Click on __Storage__ option and in __Rules__ you need to add the next code lines:

	>  match /b/{bucket}/o {
     match /{allPaths=**} {
	     allow read, write: if request.auth != null;
	   }
	   }
	 }

- This to agree all incoming connections and give all rights to write and read.

#### Authentication part in firebase
- Go to Authentication option in firebase.
- Login method you just need to enable the next optios:
	> E-mail: Password
	> Google
	> Facebook

## Angular project configuration

#### API Firebase SDK confifuration:

- To link the Angular application with Firebase service you must add the red CDN with the following format on this file __src/enviroment/enviroment.ts__  & __enviroment.prod.ts__  only if you going to use this project in production :
	> export const environment = {
		  production: false,
		  firebase: {
		    apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		    appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
		  }
		};


__ If you like this project please follow me in my github__
