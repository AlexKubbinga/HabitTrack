# HabitTrack

### Description
HabitTrack aims to make fitness trackers like Oura more useful by allowing users to experiment with habits and see if those habits are having a positive effect on their health metrics. Users can create habits and see how their activity, sleep and readiness scores are changing compared to their 3 month baseline scores.
<br/>
<br/>
**Where does the data come from?** <br/>
Currently only Oura ring integration is supported.
<br/>
<br/>
**Motivation** <br/>
Many people get wearable devices, but don’t actually make changes to improve their health. This app was created after I found trouble implementing and tracking my habits with my Oura ring.
<br/>
<br/>

Examples of potential habits include:
  - *Take 100mg of Magnesium Bisglycinate each night before bed.*
  - *Meditate every morning.*
  - *Go running every other day for 30 days.*

### Getting Started
 1. Create a Personal Access Token from the [Oura Cloud Dashboard](https://cloud.ouraring.com/personal-access-tokens).

 2. Fork the repo and rename `.env copy` to `.env` and add your PAT there. ⚠️ [Requires an Oura Ring] ⚠️

 3. ```cd client``` and ```npm run start``` to run the client then ```cd server``` and `nodemon .`
<br/>
<br/>

### The UI

![Main Dashboard of HabitTrack](/images/MainDashboard.png?raw=true "Habit Dashboard")
![List of Habits](/images/HabitList.png?raw=true "List of Habits")
![Form to create a new habit](/images/HabitForm.png?raw=true "Habit Form")





### TechStack <br/>
Front end <br/>
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

Back end <br/>
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

Data<br/>
<img src="./images/OuraDev.png" alt="Oura API" title="A cute kitten" width="100" height="100" />