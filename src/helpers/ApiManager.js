import Cookies from "universal-cookie";
import { quran_api_url } from "./urls";

const { default: axios } = require("axios");
const cookies = new Cookies();

export async function sendGetRequest(url) {
  try {
    let res = await axios({
      method: "get",
      url: url,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendPostRequest(url, data) {
  try {
    let res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchQuranChapters(lang = "sv") {
  const url = `https://api.quran.com/api/v3/chapters?language=${
    cookies.get("language") || "sv"
  }`;
  return await sendGetRequest(url);
}

export async function fetchQuranVerses(
  chapter_number,
  page = 1,
  lang = "sv",
  recitation = 7,
  translations = 21
) {
  const url = `${quran_api_url}/verses/by_chapter/${chapter_number}?language=${
    cookies.get("language") || "sv"
  }&per_page=20&page=${page}&recitation=${recitation}&translations=${translations}`;
  return await sendGetRequest(url);
}

export async function getChapterInfo(chapter_number, lang = "sv") {
  const url = `${quran_api_url}/chapters/${chapter_number}/info?language=${
    cookies.get("language") || "en"
  }`;
  return await sendGetRequest(url);
}
