import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMsg = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMsg = await Message({
      senderId,
      receiverId,
      message,
    });

    if (newMsg) {
      conversation.messages.push(newMsg._id);
    }

    await Promise.all([conversation.save(), newMsg.save()]);

    res.status(201).json({ success: true, newMsg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error in send message controller", error);
  }
};

export const getMsg = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log("Error in get message controller", error);
  }
};
