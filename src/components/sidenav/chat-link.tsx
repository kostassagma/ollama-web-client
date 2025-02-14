import { Link } from "react-router-dom";
import ThreeDotsIcon from "../../icons/three-dots";
import { useState } from "react";

export default function ChatLink() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {openMenu && (
        <div
          className="top-0 left-0 w-screen h-screen fixed z-20"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(false);
          }}
        />
      )}
      <Link
        to={"/c/sjjs"}
        className="text-gray-200 w-full p-1 rounded-lg hover:bg-slate-800 transition-colors group relative flex flex-row gap-2"
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap mr-auto my-auto p-2">
          How dsdwasd 10+20?{" "}
        </p>
        <button
          className="h-full aspect-square rounded-full hover:bg-slate-900 flex group-hover:visible invisible cursor-pointer scale-75 hover:rotate-180 transition"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(!openMenu);
          }}
        >
          <ThreeDotsIcon width={25} className="m-auto" />
        </button>
        {openMenu && (
          <div className="absolute right-0 bottom-0 translate-y-full z-50 flex flex-col gap-2 bg-slate-800 rounded-lg p-2 w-40">
            <button className="p-2 w-full hover:bg-slate-900 rounded-lg cursor-pointer">Rename</button>
            <button className="p-2 w-full hover:bg-slate-900 rounded-lg cursor-pointer">Delete</button>
          </div>
        )}
      </Link>
    </>
  );
}
