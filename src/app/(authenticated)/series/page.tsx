import React from "react";
import { Suspense } from "react";
import TvSeries from "@/src/app/views/Tv-Series";

export default function TVSeries() {
  return(
    <Suspense fallback={<div>Loading TV Series...</div>}>
      <TvSeries />
    </Suspense>
  )
};