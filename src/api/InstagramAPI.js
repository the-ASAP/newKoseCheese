import axios from "axios";

export async function InstagramAPI() {
  const instance = axios.create({
    baseURL: "https://graph.instagram.com/",
  });

  // eslint-disable-next-line no-underscore-dangle
  const _token =
    localStorage.getItem("instagramToken") ||
    "IGQVJVX1o0dG5oUWZAuNDVuT2FhbkdnbVk0c2Vyc0VCZATJoQkFoRm83cmFwb3ZA0a20wNm5yd0ZA4ekxBdlhJYXdRcWF5LTdDbDVjX1hMOUdnMVlXQWtNQks3aXZA6em1BRnBOc1pjbVpNUEVEaldONE5JegZDZD";
  const {
    // eslint-disable-next-line camelcase
    data: { access_token },
  } = await instance.get(
    `/refresh_access_token?grant_type=ig_refresh_token&access_token=${_token}`
  );
  localStorage.setItem("instagramToken", access_token);
  const {data: {data}} =  await instance.get(
    `/me/media?fields=media_url,timestamp,permalink,media_type,thumbnail_url,caption&edges=media&access_token=${access_token}`
  );
  return data;
}
