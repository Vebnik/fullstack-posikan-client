import { Button, Input } from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import { useEffect, useState } from "react";
import Message from "@/components/message";
import { IEvent } from "@/intrefaces/event.interface";
import { messageQueryFactory } from "@/query/message.query";
import { messageMutationFactory } from "@/mutation/message.mutation";
import { useQueryClient } from "react-query";

export default function IndexPage() {
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient()

  const messageQuery = messageQueryFactory()
  const messageMutation = messageMutationFactory()

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:3001/");

    websocket.addEventListener("open", () => {
      console.log("[WS] Opened");
    });

    websocket.addEventListener("close", () => {
      console.log("[WS] Closed");
    });

    websocket.addEventListener("error", (ev) => {
      console.log(`[WS - ERROR] ${ev}`);
    });

    websocket.addEventListener("message", (ev) => {
      console.log("[WS] New message");

      try {
        const body: IEvent = JSON.parse(ev.data);

        if (body.event === 'updateMessageState') {
          messageQuery.refetch();
        }

        if (body.event === 'messageData') {
          queryClient.setQueryData('messageQuery', () => body.data)
        }
      } catch {
        console.log("[WS - ERROR] Not valid body");
      }
    });
  }, []);

  const sendMessage = () => {
    messageMutation.mutateAsync({ text }).then(() => setText(""));
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-10 max-w-[500px] m-auto">
        <div className="max-h-[800px] p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <div className="max-h-[700px] overflow-y-auto p-4">
            {messageQuery.data && messageQuery.data?.length < 1 ? (
              <span>Not found message</span>
            ) : (
              <span></span>
            )}
            {messageQuery.data &&
              messageQuery.data.map((el) => (
                <Message
                  key={new Date(el.createdAt).getMilliseconds()}
                  date={el.createdAt}
                  text={el.text}
                />
              ))}
          </div>
        </div>
        <div className="flex gap-2 flex-row justify-between w-[100%]">
          <Input
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            className="w-[100%]"
            label="Text"
            variant="faded"
          />
          <Button onPress={sendMessage} className="h-[100]" color="primary">
            Send
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
