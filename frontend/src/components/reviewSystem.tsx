"use client";

import type React from "react";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSystemProps {
  courseId: number;
  initialReviews: Review[];
}

export default function ReviewSystem({
  courseId,
  initialReviews,
}: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewReview((prev) => ({ ...prev, comment: event.target.value }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || newReview.comment.trim() === "") return;

    const review: Review = {
      id: reviews.length + 1,
      user: "Usuario Actual", // Esto debería ser reemplazado por el nombre del usuario autenticado
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 0, comment: "" });
  };

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <h3 className="text-2xl font-bold">Reseñas del Curso</h3>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= averageRating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({reviews.length} reseñas)
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Deja tu reseña</h4>
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= newReview.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Escribe tu reseña aquí..."
          value={newReview.comment}
          onChange={handleCommentChange}
          className="mb-2"
        />
        <Button
          onClick={handleSubmitReview}
          className="w-full bg-blue-gradient text-md"
        >
          <Send className="w-4 h-4 mr-2" />
          Enviar Reseña
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.user}</span>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
