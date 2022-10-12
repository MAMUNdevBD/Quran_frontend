import { Link } from "react-router-dom";

const SurahListSingle = ({ surah }) => {
  return (
    <Link
      to={"/chapter/" + surah.id}
      className="text-white flex gap-8 items-center border border-gray-600 hover:border-green-400 rounded px-5 py-3.5 group"
    >
      <div className="w-10 h-10 bg-[#343A40] group-hover:bg-green-500 flex items-center justify-center rotate-45 rounded transition-all">
        <span className="-rotate-45 group-hover:text-black font-bold transition-all">
          {surah.id}
        </span>
      </div>
      <div className="">
        <div className="font-semibold">{surah.name_simple}</div>
        <div className="text-xs text-gray-300 group-hover:text-green-400 transition-all">
          {surah.translated_name.name}
        </div>
      </div>
      <div className="ml-auto text-sm text-gray-200 group-hover:text-green-400 transition-all">
        {surah.verses_count} Ayahs
      </div>
    </Link>
  );
};

export default SurahListSingle;
