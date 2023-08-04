const Transcription = (props) => {
  const { output } = props;
  const finalText = output.map((val) => val.text);
  return <div>{finalText}</div>;
};

export default Transcription;
