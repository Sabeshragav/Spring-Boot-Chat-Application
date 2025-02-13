"use client";
/* eslint-disable */

import type React from "react";
import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, MessageSquare } from "lucide-react";

export default function ChatPage() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<any>(null);

  const colors = [
    "#8B0000", // Dark Red
    "#FF8C00", // Dark Orange
    "#006400", // Dark Green
    "#B8860B", // Dark Yellow (Goldenrod)
    "#4B0082", // Indigo
    "#2F4F4F", // Dark Slate Gray
    "#800000", // Maroon
    "#5D4037", // Dark Brown
  ];

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messageAreaRef]);

  const connect = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      setShowChat(true);
      const socket = new SockJS(process.env.NEXT_PUBLIC_WS_URL!);
      stompClientRef.current = Stomp.over(socket);
      stompClientRef.current.connect({}, onConnected, onError);
    }
  };

  const onConnected = () => {
    stompClientRef.current.subscribe("/topic/public", onMessageReceived);
    stompClientRef.current.send(
      "/app/chat.addUser",
      {},
      JSON.stringify({ sender: username, type: "JOIN" })
    );
  };

  const onError = (error: any) => {
    console.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!",
      error
    );
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() && stompClientRef.current) {
      const chatMessage = {
        sender: username,
        content: message,
        type: "CHAT",
      };
      stompClientRef.current.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  const onMessageReceived = (payload: any) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const getAvatarColor = (messageSender: string) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  if (!showChat) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <Card className="w-[450px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Welcome to my Chat Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={connect} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Start Chatting
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Spring Boot WebSocket Chat Application
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-4 sm:mx-auto py-6 sm:px-6 lg:px-8">
          <Card className="h-[calc(100vh-12rem)] flex flex-col shadow-lg">
            <CardHeader className="py-3 px-4 bg-gray-50 border-b">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-lg font-medium text-gray-900">
                  Chat Room
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4" ref={messageAreaRef}>
                {messages.map((msg, index) => (
                  <div key={index} className="mb-4">
                    {msg.type === "CHAT" && (
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            style={{
                              backgroundColor: getAvatarColor(msg.sender),
                              color: "white",
                            }}
                          >
                            {msg.sender[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {msg.sender}
                            {msg.sender === username && (
                              <span className="text-blue-500 text-xs">
                                (You)
                              </span>
                            )}
                          </p>
                          <p className="mt-1 text-sm text-gray-700 bg-gray-100 rounded-lg p-2 inline-block shadow-sm">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    )}
                    {(msg.type === "JOIN" || msg.type === "LEAVE") && (
                      <p className="text-sm text-gray-500 text-center my-2">
                        {msg.sender} {msg.type === "JOIN" ? "joined" : "left"}{" "}
                        the chat
                      </p>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
              <form onSubmit={sendMessage} className="w-full">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
