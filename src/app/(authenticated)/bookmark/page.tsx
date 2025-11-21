import React from "react";
import { Suspense } from "react";
import Bookmark from "@/src/app/views/Bookmarks"

export default function BookmarkedMovie() {
  return (
    <Suspense fallback={<div>Loading Bookmarks...</div>}>
      <Bookmark />
    </Suspense>
  )
};