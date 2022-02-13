let id = -1;

export default (title, url) => {
  id++;
  return {
    id,
    title,
    url,
    visible: true
  }
}