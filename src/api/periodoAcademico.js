import { BASE_PATH } from "../utils/utils";


  export async function getPeriodosAPI() {
    try {
      const compositeUrl = `${BASE_PATH}/api/periodo`;
      const response = await fetch(compositeUrl);
      const result = await response.json();
      return result;
    } catch (error) {
      return []}
      ;
    }
  