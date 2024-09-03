import { IMessage } from "@/intrefaces/message.interface";
import { useQuery } from "react-query";

export const messageQueryFactory = () => useQuery("messageQuery", () =>
  fetch("http://localhost:3001/api/v1/message").then((response) => {
    const data: Promise<IMessage[]> = response.json();
    return data;
  })
);