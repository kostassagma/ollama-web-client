import { useMemo } from "react";
import CpuIcon from "../../icons/cpu";
import seperateThink from "../../lib/seperateThink";
import MarkDownRender from "../markdown";

export default function AiMessage(props: { text: string }) {
  const { answer, think } = useMemo(
    () => seperateThink(props.text),
    [props.text]
  );

  return (
    <div className="rounded-4xl text-xl py-4 px-6 mr-auto flex flex-row gap-3">
      <div className="rounded-full bg-slate-900 p-3 mb-auto">
        <CpuIcon width={22} />
      </div>
      <div className="pt-3 flex gap-2 flex-col">
        <p className="border-[1.5px] border-slate-300 border-dashed rounded-xl p-3 italic font-thin text-smd text-slate-300 relative">
          <div className="absolute -top-[20px] left-3 bg-slate-800 px-1">
            Thinking:
          </div>
          <MarkDownRender>{think}</MarkDownRender>
        </p>
        <MarkDownRender>{answer}</MarkDownRender>
      </div>
    </div>
  );
}
