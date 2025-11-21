import React from "react";
import { Suspense } from "react";
import Trending from "@/src/app/views/Trending";

export default function TrendingMovie() {
  return (
    <Suspense fallback={<div>Loading Trending Movies...</div>}>
      <Trending />
    </Suspense>
  )
};