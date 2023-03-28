export function parseFromLS(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  return [];
}
