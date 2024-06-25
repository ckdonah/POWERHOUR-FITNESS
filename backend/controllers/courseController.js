import Course from "../models/course.js";

const postNewCourse = async (req, res) => {
  try {
    const {
      name,
      picture,
      description,
      trainerName,
      capacity,
      activities,
      date,
      duration,
    } = req.body;

    const newCourse = new Course({
      name,
      picture,
      description,
      trainerName,
      capacity,
      activities,
      date,
      duration,
    });

    await newCourse.save();
    res.json(newCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving course", details: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching courses", details: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching course", details: error.message });
  }
}

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      picture,
      description,
      trainerName,
      capacity,
      activities,
      date,
      duration,
    } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        name,
        picture,
        description,
        trainerName,
        capacity,
        activities,
        date,
        duration,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating course", details: error.message });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(deletedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting course", details: error.message });
  }
};

export { postNewCourse, getAllCourses, updateCourseById, deleteCourseById, getCourseById };
