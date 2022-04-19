import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";

function Options({ className, bookmarkId }) {
  function handleEdit(e) {
    console.log("edit", bookmarkId);
  }
  async function handleDelete(e) {
    console.log("delete", bookmarkId);
    let res = await fetch(`http://localhost:3333/api/bookmarks/${bookmarkId}`, {
      credentials: "include",
      method: "DELETE",
    });
    if (res.ok) {
      console.log(await res.json());
    } else {
      console.error(await res.json());
    }
  }
  return (
    <div className={`flex h-full w-full ${className}`}>
      <button className="bg-red-500 px-3 text-white" onClick={handleEdit}>
        Edit
      </button>
      <button className="bg-cyan-500 px-3 text-white" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default function LinkTemplate({ bookmark }) {
  const [showOptions, setShowOptions] = useState(false);
  const optionBlock = useRef(null);

  return (
    <div
      className={`flex relative transition-transform py-3`}
      style={{
        transform: showOptions
          ? `translate3d(-${optionBlock.current.offsetWidth}px, 0,0)`
          : "",
      }}
    >
      <div className="flex-1 flex justify-between items-center text-gray-400">
        <a
          href={bookmark.url}
          className="flex gap-3 items-center hover:underline"
        >
          <div>
            <div
              className="w-8 h-8 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `${
                  bookmark.icon ? `url(${bookmark.icon})` : ""
                }`,
              }}
            ></div>
          </div>
          <div>
            <div className="text-lg text-cyan-700">{bookmark.title}</div>
            <div className="font-light text-gray-700">{bookmark.desc}</div>
          </div>
        </a>
        <button onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? (
            <ChevronLeftIcon className="w-8 h-8" />
          ) : (
            <ChevronRightIcon className="w-8 h-8" />
          )}
        </button>
      </div>
      <div
        ref={optionBlock}
        className="absolute translate-x-full-plus-one transform-gpu right-0 top-0 bottom-0 flex items-center text-gray-400"
      >
        <Options bookmarkId={bookmark.id} />
      </div>
    </div>
  );
}
