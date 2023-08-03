const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <h1 className="font-medium">
        Trova<span className="text-blue-400 bold">dorian</span>
      </h1>
      <button className="flex items-center gap-2 specialBtn px-4 py-2 text-sm rounded-lg text-blue-400">
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </header>
  );
};

export default Header;
