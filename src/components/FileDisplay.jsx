const FileDisplay = (props) => {
  const { handleAudioReset, file, audioStream } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center md:gap-5 sm:gap-4 pb-20 justify-center">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        {" "}
        Your<span className="text-blue-400 bold"> File</span>
      </h1>
      <div className="flex items-center gap-2"></div>
    </main>
  );
};

export default FileDisplay;
