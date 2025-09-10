"use client"

import { useState, useEffect } from "react"
import { Phone, Send } from "lucide-react"
import Image from "next/image"
import TopNavAndSearch from "@/components/TopNavAndSearch"
import Navigation from "@/components/Navigation"
import Link from "next/link"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Good Evening!", sender: "other", time: "8:29 pm" },
    { id: 2, text: "Welcome to Car2go Customer Service", sender: "other", time: "8:29 pm" },
  ])

  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Format waktu jam:menit am/pm
  const getTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toLowerCase()
  }

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: Date.now(), text: input, sender: "me", time: "Just now" }
      setMessages((prev) => [...prev, newMessage])
      setInput("")

      // Simulasi balasan bot
      setIsTyping(true)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: "Thanks for reaching us, how can we help you?", sender: "other", time: getTime() },
        ])
        setIsTyping(false)
      }, 1500)
    }
  }

  useEffect(() => {
    // Scroll otomatis ke bawah setiap kali ada pesan baru
    const chatBody = document.getElementById("chat-body")
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <TopNavAndSearch title="Chat" back />

      {/* Chat Body */}
      <div
        id="chat-body"
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-hide"
      >
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            {msg.sender === "other" ? (
              <div className="flex items-start space-x-2">
                <Image
                  src="/images/sabapray/avatar.png"
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg max-w-xs text-sm">
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1">{msg.time}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-end">
                <div className="bg-yellow-100 border border-yellow-400 text-gray-800 px-3 py-2 rounded-lg max-w-xs text-sm">
                  {msg.text}
                </div>
                <span className="text-[11px] text-gray-500 mt-1">{msg.time}</span>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-2">
            <Image
              src="/images/sabapray/avatar.png"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="bg-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t text-black bg-white px-3 py-2 mb-6 flex items-center space-x-2 fixed bottom-16 left-0 right-0 z-20">

        <Link href="/sabapray/voice-call">
        <button className="p-2 rounded-full bg-[#103051] text-white">
          <Phone className="w-5 h-5" />
        </button>
        </Link>

        <input
          type="text"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-[#103051] text-white"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <Navigation active="home" />
    </div>
  )
}
