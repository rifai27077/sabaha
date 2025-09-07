"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Paperclip, Plus } from "lucide-react"
import Image from "next/image"
import Header from "@/components/Header"
import Navigation from "@/components/Navigation"

export default function ChatDriverPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "driver", text: "Good Evening!", time: "8:29 pm" },
    { id: 2, sender: "driver", text: "Welcome to Car2go Customer Service", time: "8:29 pm" },
    { id: 3, sender: "user", text: "Welcome to Car2go Customer Service", time: "8:29 pm" },
  ])

  const [newMessage, setNewMessage] = useState("")
  const router = useRouter()

  const handleSend = () => {
    if (newMessage.trim() === "") return
    const msg = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: "Just now",
    }
    setMessages([...messages, msg])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#153e68]">
      <Header variant="logo" />

      <main className="flex-1 bg-white rounded-t-3xl shadow-lg p-0 mt-4 flex flex-col">
        {/* drag handle */}
        <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mt-2 mb-2" />

        {/* Header Chat */}
        <div className="px-4 py-2 border-b bg-white">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-700 font-medium text-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back
            </button>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 text-center mt-2">
            Chat
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "driver" && (
                <Image
                  src="/images/sabadrive/driver.png"
                  alt="Driver"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full mr-2"
                />
              )}
              <div className="max-w-[75%] sm:max-w-[60%]">
                <div
                  className={`px-4 py-2 rounded-xl text-sm ${
                    msg.sender === "driver"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-yellow-50 border border-yellow-400 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.sender === "user" ? "text-right" : ""
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center gap-2 mb-20">
          <button className="text-gray-500">
            <Plus className="w-7 h-7 rounded-full border border-gray-300 p-1" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm outline-none"
          />
          <button className="text-gray-500">
            <Paperclip className="w-6 h-6" />
          </button>
          <button
            onClick={handleSend}
            className="bg-[#103051] text-white p-2 rounded-full hover:bg-[#001a3d] transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <Navigation active="home" />
      </main>
    </div>
  )
}
