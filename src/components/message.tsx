import { Snippet } from "@nextui-org/snippet";
import { Divider } from "@nextui-org/react";
import { Code } from "@nextui-org/code";

export default function Message({ text, date }: { text: string; date: Date }) {
  return (
    <div className="my-2">
      <Snippet hideCopyButton hideSymbol variant="bordered">
        <div className="flex flex-col">
          <Code color="primary">{new Date(date).toISOString().replace("T", " ")}</Code>
          <Divider className="my-2" />
          <div className="text-[18px] w-[400px] text-wrap text-center h-[70px] overflow-y-auto dark:text-[#fff]">
            {text}
          </div>
        </div>
      </Snippet>
    </div>
  );
}
