import axios from "axios";
import React, { useEffect, useState } from "react";
import SurahListSingle from "./SurahListSingle";

const SurahList = () => {
  const [loading, setLoading] = useState(true);
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    axios.get("/v1/chapters").then(({ data }) => {
      setLoading(false);
      setSurahs(data.chapters);
    });
  }, []);

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-3 gap-10">
          <div className="animate-pulse h-5 bg-gray-600 rounded"></div>
          <div className="animate-pulse h-5 bg-gray-600 rounded"></div>
          <div className="animate-pulse h-5 bg-gray-600 rounded"></div>
        </div>
      </>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {surahs?.map((surah, i) => (
        <SurahListSingle key={i} surah={surah} />
      ))}
    </div>
  );
};

export default SurahList;
