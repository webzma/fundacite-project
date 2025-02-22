"use client";

import { Facebook, Twitter, LinkedinIcon as LinkedIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex space-x-2">
      <Button
        className="bg-blue-600 hover:bg-blue-800"
        size="icon"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            "_blank"
          )
        }
      >
        <Facebook className="h-4 w-4" strokeWidth={1} fill="white" />
        <span className="sr-only">Compartir en Facebook</span>
      </Button>
      <Button
        className="bg-blue-600 hover:bg-blue-800"
        size="icon"
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            "_blank"
          )
        }
      >
        <Twitter className="h-4 w-4" strokeWidth={1} fill="white" />
        <span className="sr-only">Compartir en Twitter</span>
      </Button>
      <Button
        className="bg-blue-600 hover:bg-blue-800"
        size="icon"
        onClick={() =>
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            "_blank"
          )
        }
      >
        <LinkedIn className="w-4 h-4" strokeWidth={1} fill="white" />
        <span className="sr-only">Compartir en LinkedIn</span>
      </Button>
    </div>
  );
}
