const router = require("express").Router();
const { User, Thought } = require("../../models");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error getting all the users.");
  }
});

// Get a user by userId and populates thought and friend
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id)
      .populate("thoughts")
      .populate("friends");
    res.json(user);
  } catch (error) {
    res.status(500).send("Error getting the user.");
  }
});

// Finds user and add friend to user's list
router.post("/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Creates a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).send("Error creating new user.");
  }
});

// Updates a user by userId
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("No user found and updated.");
  }
});

// Deletes user by user's id
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).send("No user found and deleted.");
  }
});

// Post to add a new friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with that ID" });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
