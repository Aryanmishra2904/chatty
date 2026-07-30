import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import imagekit from "../lib/imageKit.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// Get users for sidebar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Send message (with optional image)
export const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("📩 text:", text);
    console.log("📁 file:", req.file?.originalname, req.file?.mimetype);

    let imageUrl;
    let videoUrl;

    // ✅ Handle file from multer
    if (req.file) {
      const file = req.file;

      const uploadResponse = await imagekit.upload({
  file: file.buffer, // ✅ binary instead of base64
  fileName: `chat-${Date.now()}`,
});

      console.log("✅ Uploaded:", uploadResponse.url);

      if (file.mimetype.startsWith("image")) {
        imageUrl = uploadResponse.url;
      } else if (file.mimetype.startsWith("video")) {
        videoUrl = uploadResponse.url;
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.error("❌ Error in sendMessages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Only sender can delete
    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Not allowed to delete this message" });
    }

    await message.deleteOne();

    // Notify users via socket
    const receiverSocketId = getReceiverSocketId(
      message.receiverId.toString()
    );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    io.to(userId.toString()).emit("messageDeleted", messageId);

    res.json({ success: true, messageId });
  } catch (error) {
    console.log("Error in deleteMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};