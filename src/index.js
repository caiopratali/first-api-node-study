const express = require('express');
const { v4 } = require('uuid');

const app = express();

app.use(express.json());

const courses = [
  {
    "id": "1",
    "name": "ReactJs",
    "duration": "3 meses",
    "hasCertificate": true
  },
  {
    "id": "2",
    "name": "Node.js",
    "duration": "5 meses",
    "hasCertificate": true
  },
];

app.get('/courses', (req, res) => {
  return res.status(200).json(courses)
});

app.get('/courses/:id', (req, res) => {
  const { id } = req.params;

  const course = courses.find(item => item.id === id);

  if(!course) return res.status(400).json({ message: 'Course not found' });

  return res.status(200).json(course);
});

app.post('/courses', (req, res) => {
  const { name, duration, hasCertificate  } = req.body;

  const newCourse = {
    id: v4(),
    name,
    duration,
    hasCertificate
  }

  courses.push(newCourse);

  return res.status(201).json(newCourse);
});

app.put('/courses/:id', (req, res) => {
  const { id } = req.params;
  const { name, duration, hasCertificate } = req.body;

  const courseIndex = courses.findIndex(item => item.id === id);

  if(courseIndex < 0) return res.status(400).json({ message: 'Course not found' });

  const course = courses[courseIndex];

  const newCourse = {
    id: course.id,
    name: name ?? course.name,
    duration: duration ?? course.duration,
    hasCertificate: hasCertificate ?? course.hasCertificate
  }

  courses[courseIndex] = newCourse;

  return res.status(201).json(newCourse);

});

// app.patch('/courses/:id', (req, res) => {
  
// });

app.delete('/courses/:id', (req, res) => {
  const { id } = req.params;

  const courseIndex = courses.findIndex(item => item.id === id) ?? false;

  if(courseIndex < 0) return res.status(400).json({ message: 'Course not found' });

  courses.splice(courseIndex, 1);

  return res.status(201).json({ message: 'Course successfully deleted' });
});

app.listen(3333);