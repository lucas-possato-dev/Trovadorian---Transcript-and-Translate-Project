import { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

const Information = (props) => {
  const { output } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select language");
  const [translating, setTranslating] = useState(null);

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          break;
        case "progress":
          break;
        case "update":
          setTranslation(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription" ? output.map((val) => val.text) : translation || "";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Trovadorian_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

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
        <Transcription {...props} textElement={textElement} />
      ) : (
        <Translation
          {...props}
          toLanguage={toLanguage}
          translating={translating}
          textElement={textElement}
          setTranslating={setTranslating}
          setTranslation={setTranslation}
          setToLanguage={setToLanguage}
          generateTranslation={generateTranslation}
        />
      )}
      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          onClick={handleCopy}
          title="Copy"
          className="specialBtn text-blue-400 hover:text-blue-600 duration-200 p-2 rounded  px-4"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="specialBtn text-blue-400 p-2 rounded hover:text-blue-600 duration-200 px-4"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
};

export default Information;
