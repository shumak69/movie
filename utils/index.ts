export function parseFromLS(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      throw new Error(error);
    }
  }
  return [];
  // throw Error("Error occured in localStorage");
}
