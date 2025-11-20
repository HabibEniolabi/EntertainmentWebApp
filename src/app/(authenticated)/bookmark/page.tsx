import React from "react";
import { Suspense } from "react";
import Bookmark from "@/src/app/views/Bookmarks"

export default function BookmarkPage() {
  return (
    // Wrap the Client Component directly here
    <Suspense fallback={<div>Loading...</div>}>
      <Bookmark />
    </Suspense>
  );
};