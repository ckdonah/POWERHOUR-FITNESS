import User from "../models/user.js";
import Course from "../models/course.js";

const getStats = async (req, res) => {
  try {
    const trainersCount = await User.countDocuments({ role: "trainer" });
    const membersCount = await User.countDocuments({ role: "member" });
    const programsCount = await Course.countDocuments();

    res.json({
      trainers: trainersCount,
      members: membersCount,
      programs: programsCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

export { getStats };
