import React from "react";
import { Suspense } from "react";
import Bookmark from "@/src/app/views/Bookmarks"

const BookmarkedMovie = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Bookmark />
    </Suspense>
  )
};

export default BookmarkedMovie;