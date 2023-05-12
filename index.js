const express = require("express");
// const fs = require("fs");
const file = require("./clg collection.json");

// console.log(file)
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/course", async (req, res) => {
  try {
    const list = file;
    res.status(200).send(list);
    console.log(list);
  } catch (err) {
    console.log(err);
  }
});

app.get("/courses/:courseName", async (req, res) => {
  try {
    const courseName = req.params.course;
    // const course = file.filter((item) => item.name === course);
    const course = file.kalvium.filter((item) => item.name === courseName);
    res.status(200).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/courses/:courseName/rating", async (req, res) => {
  try {
    const courseName = req.params.averageRating;
    const course = file.kalvium.filter((item) => item.name === courseName);
    res.status(200).send(course);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/courses", async (req, res) => {
  try {
    const course = req.body;
    file.kalvium.push(course);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/courses/:courseName/rating", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const { averageRating } = req.params;

    const course = file.kalvium.find((item) => item.course === courseName);

    if (!course) {
      return res.status(400).json({ error: "No such course!" });
    }
    course.averageRating = averageRating;

    res.status(200).json({ message: "Rating added successfully", course });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/courses/:courseName", async (req, res) => {
  try {
    const courseName = req.params.course;
    const updatedCourse = req.body;
    const courseIndex = file.kalvium.find((item) => item.course === courseName);
    if (courseIndex === -1) {
      return res.status(404).json({ message: "Course not found" });
    }
    file.kalvium[courseIndex] = {
      ...file.kalvium[courseIndex],
      ...updatedCourse,
    };
    res
      .status(200)
      .json({
        message: "Course modified successfully",
        course: file.kalvium[courseIndex],
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// fs.readFile("./clg collection.json","utf8", (err, jsonString) => {
//   if (err) {
//     console.log("File read failed:", err);
//     return;
//   }
//   console.log("File data:", jsonString);
// });
