import { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = (props) => {
  const { output } = props;
  const [tab, setTab] = useState("transcription");

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 pb-20 justify-center  max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl whitespace-nowrap ">
        {" "}
        Your<span className="text-blue-400 bold"> Transcription</span>
      </h1>
      <div className="grid grid-cols-2 items-center mx-auto bg-white border-2 border-solid border-blue-300 shadow rounded-full overflow-hidden">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 rounded duration-200 py-1 " +
            (tab === "transcription"
              ? " bg-blue-300 text-white"
              : " text-blue-400 hover:text-blue-500")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 rounded duration-200 py-1  " +
            (tab === "translation"
              ? " bg-blue-300 text-white"
              : " text-blue-400 hover:text-blue-500")
          }
        >
          Translation
        </button>
      </div>
      {tab === "transcription" ? (
        <Transcription {...props} />
      ) : (
        <Translation {...props} />
      )}
    </main>
  );
};

export default Information;
