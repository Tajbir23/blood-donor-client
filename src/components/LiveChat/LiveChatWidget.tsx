"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

type ChatSocket = ReturnType<typeof io>;

interface ChatMsg {
    _id?: string;
    ticketId: string;
    senderType: "guest" | "admin";
    senderName: string;
    text: string;
    createdAt: string;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

const getGuestId = (): string => {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("lifedrop_guest_id");
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("lifedrop_guest_id", id);
    }
    return id;
};

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [input, setInput] = useState("");
    const [guestName, setGuestName] = useState("");
    const [nameSet, setNameSet] = useState(false);
    const [connected, setConnected] = useState(false);
    const [ticketClosed, setTicketClosed] = useState(false);
    const [unread, setUnread] = useState(0);
    const socketRef = useRef<ChatSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Restore name from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("lifedrop_guest_name");
        if (saved) {
            setGuestName(saved);
            setNameSet(true);
        }
    }, []);

    const connectSocket = useCallback(() => {
        if (socketRef.current?.connected) return;

        const guestId = getGuestId();
        const socket = io(`${SOCKET_URL}/live-chat`, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
        });

        socket.on("connect", () => {
            setConnected(true);
            socket.emit("chat:join", { guestId, guestName: guestName || "অতিথি" });
        });

        socket.on("chat:history", (data: { ticketId: string; messages: ChatMsg[] }) => {
            setMessages(data.messages);
        });

        socket.on("chat:message", (data: { message: ChatMsg }) => {
            setMessages((prev) => [...prev, data.message]);
            if (!isOpen && data.message.senderType === "admin") {
                setUnread((u) => u + 1);
            }
        });

        socket.on("chat:closed", () => {
            setTicketClosed(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socketRef.current = socket;
    }, [guestName, isOpen]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        setUnread(0);
        if (nameSet) {
            connectSocket();
        }
    };

    const handleStartChat = () => {
        const name = guestName.trim() || "অতিথি";
        setGuestName(name);
        localStorage.setItem("lifedrop_guest_name", name);
        setNameSet(true);
        setTicketClosed(false);
        connectSocket();
    };

    const handleNewChat = () => {
        // Remove old guest ID to force new ticket
        localStorage.removeItem("lifedrop_guest_id");
        setMessages([]);
        setTicketClosed(false);
        socketRef.current?.disconnect();
        socketRef.current = null;
        connectSocket();
    };

    const sendMessage = () => {
        const text = input.trim();
        if (!text || !socketRef.current) return;

        const guestId = getGuestId();
        socketRef.current.emit("chat:message", { guestId, text });
        setInput("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* ─── Floating Button ─── */}
            {!isOpen && (
                <button
                    onClick={handleOpen}
                    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
                    aria-label="লাইভ চ্যাট"
                >
                    <FaComments size={24} />
                    {unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-green-500 text-white text-xs font-bold">
                            {unread}
                        </span>
                    )}
                </button>
            )}

            {/* ─── Chat Window ─── */}
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
                        <div>
                            <h3 className="font-semibold text-base">লাইভ চ্যাট</h3>
                            <p className="text-xs opacity-80">
                                {connected ? "সংযুক্ত" : "সংযোগ হচ্ছে..."}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* ── Name input (if not yet set) ── */}
                    {!nameSet ? (
                        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <FaComments className="text-red-600" size={28} />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800">
                                স্বাগতম!
                            </h4>
                            <p className="text-sm text-gray-500 text-center">
                                আপনার নাম দিন, তারপর চ্যাট শুরু করুন। রেজিস্ট্রেশন ছাড়াই কথা বলতে পারবেন।
                            </p>
                            <input
                                type="text"
                                placeholder="আপনার নাম (ঐচ্ছিক)"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <button
                                onClick={handleStartChat}
                                className="w-full py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                চ্যাট শুরু করুন
                            </button>
                        </div>
                    ) : ticketClosed ? (
                        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
                            <p className="text-gray-600 text-center">
                                এই চ্যাট টিকেটটি বন্ধ হয়েছে।
                            </p>
                            <button
                                onClick={handleNewChat}
                                className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                নতুন চ্যাট শুরু করুন
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* ── Messages ── */}
                            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-400 text-sm mt-10">
                                        আপনার প্রশ্ন বা সমস্যা লিখুন। আমাদের টিম যত দ্রুত সম্ভব উত্তর দেবে।
                                    </div>
                                )}
                                {messages.map((msg, i) => {
                                    const isGuest = msg.senderType === "guest";
                                    return (
                                        <div
                                            key={msg._id || i}
                                            className={`flex ${isGuest ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                                                    isGuest
                                                        ? "bg-red-600 text-white rounded-br-sm"
                                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                                                }`}
                                            >
                                                {!isGuest && (
                                                    <p className="text-[10px] font-semibold text-red-600 mb-0.5">
                                                        {msg.senderName}
                                                    </p>
                                                )}
                                                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                                                <p
                                                    className={`text-[10px] mt-1 ${
                                                        isGuest ? "text-red-200" : "text-gray-400"
                                                    }`}
                                                >
                                                    {new Date(msg.createdAt).toLocaleTimeString("bn-BD", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* ── Input ── */}
                            <div className="px-3 py-2.5 border-t border-gray-200 bg-white shrink-0">
                                <div className="flex items-center gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="বার্তা লিখুন..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        maxLength={2000}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!input.trim()}
                                        className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <FaPaperPlane size={14} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 text-center">
                                    চ্যাট ২৪ ঘণ্টা পর স্বয়ংক্রিয়ভাবে মুছে যাবে
                                </p>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default LiveChatWidget;
