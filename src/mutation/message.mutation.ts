import { IMessage, MessageCreateDTO } from "@/intrefaces/message.interface";
import { useMutation } from "react-query";


export const messageMutationFactory = () => useMutation(
  "messageMutation",
  (newMessage: MessageCreateDTO) =>
    fetch("http://localhost:3001/api/v1/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    }).then((response) => {
      const data: Promise<IMessage> = response.json();
      return data;
    })
);