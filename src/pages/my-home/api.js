import ApiUrl from "src/api/apiUrl";
import api from "src/api";
// const { get } = api({ baseURL: ApiUrl.root });
export const getList = () => {
  return get("");
};
