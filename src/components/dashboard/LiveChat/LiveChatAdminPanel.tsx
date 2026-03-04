"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLiveChatTickets, closeLiveChatTicket } from "@/app/actions/administrator/system/liveChatActions";
import io from "socket.io-client";
import { User } from "@/lib/types/userType";

type ChatSocket = ReturnType<typeof io>;
import {
    FaComments,
    FaChevronLeft,
    FaPaperPlane,
    FaTimes,
    FaCircle,
    FaInbox,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface UserQueryData {
    user: User;
}

interface Ticket {
    _id: string;
    guestId: string;
    guestName: string;
    status: "open" | "closed";
    lastMessageAt: string;
    lastMessage?: string;
    lastSender?: string;
    createdAt: string;
    expiresAt: string;
}

interface ChatMsg {
    _id?: string;
    ticketId: string;
    senderType: "guest" | "admin";
    senderName: string;
    text: string;
    createdAt: string;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4000";

const LiveChatAdminPage = () => {
    const queryClient = useQueryClient();
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [input, setInput] = useState("");
    const [statusFilter, setStatusFilter] = useState<"open" | "closed" | "all">("open");
    const socketRef = useRef<ChatSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const user = useMemo(() => {
        return queryClient.getQueryData<UserQueryData>(["user"]);
    }, [queryClient]);

    const adminName = user?.user?.fullName || "Admin";

    // ─── Fetch tickets ────────────────────────────────────────
    const { data: ticketsData, refetch: refetchTickets } = useQuery({
        queryKey: ["live-chat-tickets", statusFilter],
        queryFn: () => getLiveChatTickets({ status: statusFilter }),
        refetchInterval: 15000, // refresh every 15s
    });

    const tickets: Ticket[] = ticketsData?.data || [];

    // ─── Socket connection ────────────────────────────────────
    useEffect(() => {
        const socket = io(`${SOCKET_URL}/live-chat`, {
            transports: ["websocket", "polling"],
            reconnection: true,
        });

        socket.on("connect", () => {
            socket.emit("admin:joinAll");
        });

        // New ticket notification
        socket.on("chat:ticket", () => {
            refetchTickets();
        });

        // New message notification
        socket.on("chat:newMessage", (data: { ticketId: string; guestName: string; text: string }) => {
            refetchTickets();
            // If we're viewing this ticket, the message will come via chat:message
        });

        // Messages in active ticket room
        socket.on("chat:message", (data: { message: ChatMsg }) => {
            setMessages((prev) => {
                // Avoid duplicates
                if (prev.some((m) => m._id === data.message._id)) return prev;
                return [...prev, data.message];
            });
        });

        socket.on("chat:closed", (data: { ticketId: string }) => {
            refetchTickets();
            setSelectedTicket((prev) => {
                if (prev && prev._id === data.ticketId) {
                    return { ...prev, status: "closed" };
                }
                return prev;
            });
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, [refetchTickets]);

    // ─── When selecting a ticket ──────────────────────────────
    const openTicket = useCallback(
        async (ticket: Ticket) => {
            setSelectedTicket(ticket);
            setMessages([]);

            // Join this ticket's socket room
            socketRef.current?.emit("admin:join", { ticketId: ticket._id });

            // Fetch history via action
            try {
                const res = await fetch(
                    `${SOCKET_URL}/api/system/dashboard/live-chat/messages/${ticket._id}`,
                    { credentials: "include" }
                );
                // Fallback: use server action if direct fetch fails  
            } catch {
                // noop — socket history will fill in
            }

            // Also request history via socket
            // (history comes from chat:join on guest side, so for admin we load from API)
            const { getLiveChatMessages } = await import(
                "@/app/actions/administrator/system/liveChatActions"
            );
            const msgData = await getLiveChatMessages(ticket._id);
            if (msgData?.data) {
                setMessages(msgData.data);
            }
        },
        []
    );

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ─── Send admin reply ─────────────────────────────────────
    const sendReply = () => {
        const text = input.trim();
        if (!text || !selectedTicket || !socketRef.current) return;

        socketRef.current.emit("admin:message", {
            ticketId: selectedTicket._id,
            text,
            senderName: adminName,
        });
        setInput("");
    };

    // ─── Close ticket ─────────────────────────────────────────
    const handleClose = async () => {
        if (!selectedTicket) return;
        socketRef.current?.emit("admin:close", { ticketId: selectedTicket._id });
        await closeLiveChatTicket(selectedTicket._id);
        toast.success("টিকেট বন্ধ করা হয়েছে");
        setSelectedTicket((prev) => (prev ? { ...prev, status: "closed" } : null));
        refetchTickets();
    };

    const formatTime = (d: string) =>
        new Date(d).toLocaleString("bn-BD", {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
        });

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <FaComments className="text-red-600" size={22} />
                <h1 className="text-xl font-bold text-gray-800">লাইভ চ্যাট</h1>
            </div>

            <div className="flex h-[calc(100vh-250px)] min-h-[500px] border border-gray-200 rounded-xl overflow-hidden bg-white">
                {/* ─── Ticket List (Left Panel) ─── */}
                <div
                    className={`w-full md:w-80 border-r border-gray-200 flex flex-col shrink-0 ${
                        selectedTicket ? "hidden md:flex" : "flex"
                    }`}
                >
                    {/* Filter tabs */}
                    <div className="flex border-b border-gray-200">
                        {(["open", "closed", "all"] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                                    statusFilter === s
                                        ? "text-red-600 border-b-2 border-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {s === "open" ? "চলমান" : s === "closed" ? "বন্ধ" : "সব"}
                            </button>
                        ))}
                    </div>

                    {/* Ticket list */}
                    <div className="flex-1 overflow-y-auto">
                        {tickets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                                <FaInbox size={32} />
                                <p className="text-sm">কোনো টিকেট নেই</p>
                            </div>
                        ) : (
                            tickets.map((ticket) => (
                                <button
                                    key={ticket._id}
                                    onClick={() => openTicket(ticket)}
                                    className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                        selectedTicket?._id === ticket._id ? "bg-red-50" : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-800 text-sm">
                                            {ticket.guestName}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <FaCircle
                                                size={8}
                                                className={
                                                    ticket.status === "open"
                                                        ? "text-green-500"
                                                        : "text-gray-400"
                                                }
                                            />
                                            <span className="text-[10px] text-gray-400">
                                                {formatTime(ticket.lastMessageAt)}
                                            </span>
                                        </div>
                                    </div>
                                    {ticket.lastMessage && (
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {ticket.lastSender === "admin" ? "আপনি: " : ""}
                                            {ticket.lastMessage}
                                        </p>
                                    )}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* ─── Chat Area (Right Panel) ─── */}
                <div
                    className={`flex-1 flex flex-col ${
                        !selectedTicket ? "hidden md:flex" : "flex"
                    }`}
                >
                    {!selectedTicket ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
                            <FaComments size={40} />
                            <p>একটি চ্যাট নির্বাচন করুন</p>
                        </div>
                    ) : (
                        <>
                            {/* Chat header */}
                            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50 shrink-0">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedTicket(null)}
                                        className="md:hidden p-1 text-gray-500"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-sm">
                                            {selectedTicket.guestName}
                                        </h3>
                                        <p className="text-[10px] text-gray-400">
                                            মেয়াদ: {formatTime(selectedTicket.expiresAt)} পর্যন্ত
                                        </p>
                                    </div>
                                </div>
                                {selectedTicket.status === "open" && (
                                    <button
                                        onClick={handleClose}
                                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-200 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
                                    >
                                        <FaTimes size={10} />
                                        বন্ধ করুন
                                    </button>
                                )}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                                {messages.map((msg, i) => {
                                    const isAdmin = msg.senderType === "admin";
                                    return (
                                        <div
                                            key={msg._id || i}
                                            className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                                                    isAdmin
                                                        ? "bg-red-600 text-white rounded-br-sm"
                                                        : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                                                }`}
                                            >
                                                {!isAdmin && (
                                                    <p className="text-[10px] font-semibold text-gray-500 mb-0.5">
                                                        {msg.senderName}
                                                    </p>
                                                )}
                                                <p className="whitespace-pre-wrap break-words">
                                                    {msg.text}
                                                </p>
                                                <p
                                                    className={`text-[10px] mt-1 ${
                                                        isAdmin ? "text-red-200" : "text-gray-400"
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

                            {/* Input */}
                            {selectedTicket.status === "open" ? (
                                <div className="px-3 py-2.5 border-t border-gray-200 bg-white shrink-0">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="উত্তর লিখুন..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && !e.shiftKey) {
                                                    e.preventDefault();
                                                    sendReply();
                                                }
                                            }}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            maxLength={2000}
                                        />
                                        <button
                                            onClick={sendReply}
                                            disabled={!input.trim()}
                                            className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-40"
                                        >
                                            <FaPaperPlane size={14} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="px-3 py-3 border-t border-gray-200 bg-gray-100 text-center text-sm text-gray-500">
                                    এই টিকেট বন্ধ হয়েছে
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveChatAdminPage;
