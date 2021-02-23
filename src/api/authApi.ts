import axios from 'axios'


interface LoginResponse {
  answer: string;
}

export const authenticate = async (): Promise<boolean> => {
  const response = await axios.get<LoginResponse>("https://yesno.wtf/api");
  return response.data.answer === "yes";
};
