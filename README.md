<p align="center">
    <img src = "https://tc-unilodge.travelclick-websolutions.com/uploads/images/brand/001/562/719/unilodge-logo-2010-cmyk-white-border.png">
</p>

<i align="center">
  <h4>An Exclusive Accomodation Sharing Service for Students in Galway</h4>
</i>

| Details  |   |
| --- | --- |
| **Project Title** | UniLodge
| **Module**  | Applied Project & Minor Dissertation
| **Course** | BSc (Hons) in Software Development
| **Heroku** | [UniLodge](https://unilodge.herokuapp.com/)
| **Authors** | [Faris Nassif](https://github.com/farisNassif) & [Aaron Burns](https://github.com/aaronBurns59) |
| **Supervisors** | Dr. John French & Dr. Martin Kenirons |

## Contents
* [About](#about)
* [Running Locally and Requirements](#running-locally-and-requirements)
* [Goals and Features](#goals-and-features)
* [Relevant Links](#relevant-links)

### About	
**UniLodge** is a service exclusively for students that bridges the gap between those looking for accomodation and those looking to advertise a room or location.

### Requirements
* [NodeJS](https://nodejs.org/en/) 6.13.6 (<i>Or Higher)</i>
* [Python](https://www.python.org/downloads/) 3.7.1 (<i>Or Higher)</i>
* [Angular 7](https://angular.io/) (<i>8 and above may cause issues</i>)
<p align="center">
    <b>Note</b>: <i>You will <b>Not</b> be able to run the application locally if you do not generate a Mongo URI and place it within       the <b>backend</b> directory in a file called </i><b>mongo_uri.txt</b>. <br><br> See the Mongo<a href="https://docs.atlas.mongodb.com/driver-connection/"> Driver Guide</a> for an overview on how to generate a Mongo URI.
</p>

#### Running the Program
1. If you do <b>Not</b> have a Mongo URI or , see the Requirements section.
2. In your command line terminal: `git clone https://github.com/farisNassif/UniLodge`
3. Open two terminals, one for the Angular Client and one for the Flask Server
4. In your first terminal, navigate to the `/backend` folder and type `pip install -r requirements.txt`
5. Run the Flask Server `python runner.py`
6. In your second terminal, navigate to the `/client` folder and type `npm install`
7. Run the Client `npm start`
8. The application may be accessed at `http://localhost:4200/`

<i>Alternatively, the application may be accessed via [Heroku](https://unilodge.herokuapp.com/)</i>

#### Unit Tests
* `ng test`

#### End-to-End Tests
* `ng e2e`

### Goals and Features
For the team members initially, the end goal for the project was to create a platform for students in the Galway area to both advertise and search for accommodative services. 

#### Initial Goals 
At a minimum, the application would allow:

1. Student Login & Registration
2. Creation of Listings including full CRUD functionality
3. Communication with other users via messages or alternative means
4. Searching for listings based on specific paramaters

#### Main Implemented Features
* Secure Registration (<I>With a Galway college email address</i>)
* JWT Authenticated Routing / Login
* Creation of Listings with full CRUD functionality implemented
* User comments on Listings (<i>With authentication</i>)
* Searching for Listings based on price / location
* User profiles
* Encrypted user data
* Cloud hosted

### Relevant Links
* [Swagger API](https://app.swaggerhub.com/apis-docs/GMIT7/Unilodge-API/0.2-oas3#/)
* [Dissertation](https://github.com/farisNassif/UniLodge/blob/master/Dissertation.pdf)
* [Screencast](www.youtube.com)
