import React from "react";
import { Suspense } from "react";
import Movie from "@/src/app/views/Movie"

export default function Movies ()  {
  return (
    <Suspense fallback={<div>Loading Movies...</div>}>
      <Movie />
    </Suspense>
  )
}