export default function MeMessage(props: { content: string }) {
  return (
    <div className="rounded-4xl text-xl bg-slate-700 py-4 px-6 ml-auto">
      {props.content}
    </div>
  );
}
