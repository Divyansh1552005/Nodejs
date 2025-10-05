import express from "express";
import User from "../model/Users.model.js";

const router = express.Router();

// 1. Get all users who are active and female
router.get("/active-female", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          isActive: true,
        },
      },
      {
        $match: {
          gender: "female",
        },

      },
      {
        $count: "totalActiveFemales",
      }
    ]);

    // result will be an array like: [ { totalActiveFemales: 5 } ]
    res.status(200).json(result);
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
