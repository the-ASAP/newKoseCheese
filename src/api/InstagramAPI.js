import axios from 'axios';

// TODO: А ЗДЕСЬ ПОШЛИ ФУНКЦИИ ВМЕСТО КЛАССОВ, ПЕРЕПИСАТЬ ПОЗЖЕ
export async function InstagramAPI() {
  const instance = axios.create({
    baseURL: 'https://graph.instagram.com/'
  });

  // eslint-disable-next-line no-underscore-dangle
  // IGQVJWVFNINmtqcGRQZAFZAMU1dObW9GcHRjUmRmeGprYWEtM2xKS3dXdGhBTTRFQ2k0MnNURW1LVERBbWhVWk15T1VnZAGFvTGZAwZA1lrX00tVTh5YWNDZAHRFLXY0Y2xqUzYwRlZAhX0wwalRocHNkX3dYVQZDZD
  const _token =
    localStorage.getItem('instagramToken') ||
    'IGQVJWVFNINmtqcGRQZAFZAMU1dObW9GcHRjUmRmeGprYWEtM2xKS3dXdGhBTTRFQ2k0MnNURW1LVERBbWhVWk15T1VnZAGFvTGZAwZA1lrX00tVTh5YWNDZAHRFLXY0Y2xqUzYwRlZAhX0wwalRocHNkX3dYVQZDZD';
  // 'IGQVJVX1o0dG5oUWZAuNDVuT2FhbkdnbVk0c2Vyc0VCZATJoQkFoRm83cmFwb3ZA0a20wNm5yd0ZA4ekxBdlhJYXdRcWF5LTdDbDVjX1hMOUdnMVlXQWtNQks3aXZA6em1BRnBOc1pjbVpNUEVEaldONE5JegZDZD';
  const {
    // eslint-disable-next-line camelcase
    data: { access_token }
  } = await instance.get(
    `/refresh_access_token?grant_type=ig_refresh_token&access_token=${_token}`
  );
  localStorage.setItem('instagramToken', access_token);
  const {
    data: { data }
  } = await instance.get(
    `/me/media?fields=media_url,timestamp,permalink,media_type,thumbnail_url,caption&edges=media&access_token=${access_token}`
  );
  return data;
}
