import { Request, Response } from "express";
import { db } from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    // Extract message content from request body
    const { message } = req.body;

    // Extract receiver ID from request parameters
    const { id: receiverId } = req.params;

    // Extract sender ID from request object
    const senderId = req.user.id;

    // Check for existing conversation
    let conversation = await db.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId], // Conversation includes both sender and receiver
        },
      },
    });

    // Create a new conversation if it doesn't exist (first message)
    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    // Create a new message in the conversation
    const newMessage = await db.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    // Update the conversation to include the new message
    if (newMessage) {
      conversation = await db.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id, // Connect the message to the conversation
            },
          },
        },
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Return the newly created message in a 201 Created response
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    // Extract user ID to chat with from request parameters
    const { id: userToChatId } = req.params;

    // Extract sender ID from request object
    const senderId = req.user.id;

    // Find the conversation with the specified user
    const conversation = await db.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId], // Conversation includes both sender and receiver
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc", // Order messages by creation time
          },
        },
      },
    });

    // If no conversation is found, return an empty array with 200 OK status
    if (!conversation) {
      return res.status(200).json([]);
    }

    // Return the conversation's messages in a 200 OK response
    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    // Extract the authenticated user's ID from the request object
    const authUserId = req.user.id;

    // Find users excluding the authenticated user
    const users = await db.user.findMany({
      where: {
        id: {
          not: authUserId, // Exclude the user themself from the results
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        profilePic: true,
      },
    });

    // Return the list of users in a 200 OK response
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};