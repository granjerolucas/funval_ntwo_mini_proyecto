import { getRequest } from ".";

export const getStays = () => {
  return getRequest("./stays.json", "GET");
};
