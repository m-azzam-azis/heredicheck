"use client";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

import { CornerDownLeft, User, Bot } from "lucide-react"; // Add these imports
import { createRef, useState, KeyboardEvent, useRef, useEffect } from "react"; // Add useRef and useEffect

import chat from "@/lib/GeminiAI";
import ReactMarkdown from "react-markdown";

export default function ChatBotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { input: string; response: string }[]
  >([]);
  const chatInputRef = createRef<HTMLTextAreaElement>();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Add this ref for auto-scrolling

  const handleInput = async () => {
    if (input.trim() === "") return;

    const currentInput = input.trim(); // Store the current input
    setInput(""); // Clear input immediately
    if (chatInputRef.current) {
      chatInputRef.current.value = ""; // Clear the textarea
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { input: currentInput, response: "loading" },
    ]);

    try {
      const responses = await chat(currentInput);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { input: currentInput, response: responses.message.content as string },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          input: currentInput,
          response:
            "Chatbot not available at this time, please try again later.",
        },
      ]);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleInput();
    }
  };

  return (
    <div className="flex flex-col h-screen px-20 py-20 gap-4">
      <h1 className="bg-gradient-to-r hidden lg:block to-green-700 from-emerald-500 bg-clip-text text-transparent font-bold text-3xl">
        HerediCheck AI Assistant
      </h1>

      {/* Chat messages container */}
      <div className="flex-1 min-h-0">
        {" "}
        {/* min-h-0 is important for flex child scrolling */}
        <ChatMessageList
          className="h-full overflow-y-auto border rounded-lg"
          autoFocus
        >
          {messages.map((message, index) => (
            <ChatMessageList className="h-fit" key={index}>
              <ChatBubble variant="sent">
                <User className="h-6 w-6" />
                <ChatBubbleMessage variant="sent" className="h-fit mx-2">
                  {message.input}
                </ChatBubbleMessage>
              </ChatBubble>

              <ChatBubble variant="received">
                <Bot className="h-6 w-6" />
                {message.response === "loading" ? (
                  <ChatBubbleMessage isLoading />
                ) : (
                  <ChatBubbleMessage variant="received">
                    <ReactMarkdown>{message.response}</ReactMarkdown>
                  </ChatBubbleMessage>
                )}
              </ChatBubble>
            </ChatMessageList>
          ))}
          <div ref={messagesEndRef} />
        </ChatMessageList>
      </div>

      {/* Input section - now part of normal flow */}
      <div className="flex gap-2 bg-white">
        <ChatInput
          placeholder="What can i help you with today?"
          className="min-h-12"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={chatInputRef}
        />
        <div className="flex items-center">
          <Button
            size="sm"
            className="ml-auto gap-1.5 h-12 bg-green-400 rounded-md hover:ring-green-300 ring-2 ring-transparent transition-all hover:bg-green-700 hover:text-white text-black"
            onClick={handleInput}
          >
            Ask AI
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
