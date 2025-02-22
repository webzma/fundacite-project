"use client";

import type React from "react";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ForumPost {
  id: number;
  user: string;
  content: string;
  date: string;
  replies: ForumPost[];
}

interface DiscussionForumProps {
  courseId: number;
  initialPosts: ForumPost[];
}

export default function DiscussionForum({
  courseId,
  initialPosts,
}: DiscussionForumProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(event.target.value);
  };

  const handleSubmitPost = () => {
    if (newPost.trim() === "") return;

    const post: ForumPost = {
      id: posts.length + 1,
      user: "Usuario Actual", // Esto debería ser reemplazado por el nombre del usuario autenticado
      content: newPost,
      date: new Date().toLocaleDateString(),
      replies: [],
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost("");
  };

  const renderPost = (post: ForumPost, isReply = false) => (
    <div
      key={post.id}
      className={`bg-white p-4 rounded-lg shadow ${
        isReply ? "ml-8 mt-4" : "mb-4"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{post.user}</span>
        <span className="text-sm text-gray-500">{post.date}</span>
      </div>
      <p className="text-gray-700 mb-2">{post.content}</p>
      {!isReply && (
        <Button variant="outline" size="sm" className="text-sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Responder
        </Button>
      )}
      {post.replies.map((reply) => renderPost(reply, true))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Foro de Discusión</h3>

      <div className="bg-white p-4 rounded-lg shadow">
        <Textarea
          placeholder="Escribe tu pregunta o comentario aquí..."
          value={newPost}
          onChange={handlePostChange}
          className="mb-2"
        />
        <Button onClick={handleSubmitPost} className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Publicar
        </Button>
      </div>

      <div className="space-y-4">{posts.map((post) => renderPost(post))}</div>
    </div>
  );
}
