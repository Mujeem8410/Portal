const mongoose = require('mongoose');
const Course = require('../models/CareerOpportunity'); 

mongoose.connect('mongodb://localhost:27017/samadhaan', { useNewUrlParser: true, useUnifiedTopology: true });

const courseData = [
  {
    name: "B.Tech",
    branches: [
      {
        name: "Computer Science Engineering",
        careers: [
          {
            title: "Frontend Developer",
            roadmap: "<ul><li>Learn HTML</li><li>Master CSS</li><li>Understand JavaScript</li><li>Frameworks like React/Vue</li><li>Build projects</li></ul>",
            freeResources: [
              { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
              { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" }
            ],
            paidResources: [
              { name: "Udemy - Web Development Bootcamp", url: "https://www.udemy.com/course/the-web-developer-bootcamp/" },
              { name: "Coursera - Meta Front-End Developer", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" }
            ]
          },
          {
            title: "Backend Developer",
            roadmap: "<ul><li>Learn Node.js</li><li>Databases (MongoDB/MySQL)</li><li>Authentication</li><li>APIs</li><li>Build projects</li></ul>",
            freeResources: [
              { name: "Node.js Official Docs", url: "https://nodejs.org/en/docs/" },
              { name: "MongoDB University", url: "https://university.mongodb.com/" }
            ],
            paidResources: [
              { name: "Udemy - Node.js Complete Guide", url: "https://www.udemy.com/course/nodejs-the-complete-guide/" },
              { name: "Coursera - Backend Specialization", url: "https://www.coursera.org/specializations/backend-development" }
            ]
          }
        ]
      },
      {
        name: "Electronics and Communication Engineering",
        careers: [
          {
            title: "Embedded Systems Engineer",
            roadmap: "<ul><li>C Programming</li><li>Microcontrollers</li><li>RTOS</li><li>Embedded Linux</li></ul>",
            freeResources: [
              { name: "YouTube - Neso Academy", url: "https://www.youtube.com/NesoAcademy" }
            ],
            paidResources: [
              { name: "Udemy - Embedded Systems", url: "https://www.udemy.com/course/embedded-systems/" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "BCA",
    branches: [
      {
        name: "Information Technology",
        careers: [
          {
            title: "Full Stack Developer",
            roadmap: "<ul><li>Frontend: HTML, CSS, JS</li><li>Backend: Node.js, Express</li><li>Database: MongoDB</li><li>Deploy on cloud</li></ul>",
            freeResources: [
              { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
              { name: "The Odin Project", url: "https://www.theodinproject.com/" }
            ],
            paidResources: [
              { name: "Coursera - Full Stack", url: "https://www.coursera.org/specializations/full-stack" }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "MBA",
    branches: [
      {
        name: "Marketing",
        careers: [
          {
            title: "Digital Marketer",
            roadmap: "<ul><li>SEO</li><li>Social Media Marketing</li><li>Google Ads</li><li>Email Marketing</li></ul>",
            freeResources: [
              { name: "HubSpot Academy", url: "https://academy.hubspot.com/" }
            ],
            paidResources: [
              { name: "Coursera - Digital Marketing", url: "https://www.coursera.org/specializations/digital-marketing" }
            ]
          }
        ]
      },
      {
        name: "Finance",
        careers: [
          {
            title: "Financial Analyst",
            roadmap: "<ul><li>Excel</li><li>Accounting</li><li>Financial Modeling</li><li>Forecasting</li></ul>",
            freeResources: [
              { name: "Corporate Finance Institute", url: "https://courses.corporatefinanceinstitute.com/" }
            ],
            paidResources: [
              { name: "Udemy - Financial Analyst", url: "https://www.udemy.com/course/the-complete-financial-analyst-course/" }
            ]
          }
        ]
      }
    ]
  }
];

async function insertData() {
  await Course.deleteMany({});
  await Course.insertMany(courseData);
  console.log('Courses inserted successfully ✅');
  mongoose.disconnect();
}

insertData();
