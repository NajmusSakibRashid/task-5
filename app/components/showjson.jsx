const ShowObj = ({ children }) => {
  //   console.log(children);
  if (typeof children !== "object")
    return (
      <div className="border-solid border-2 border-red-600 p-4 w-auto">
        {children}
      </div>
    );
  return (
    <div
      className={`grid grid-cols-[auto_auto] border-solid border-2 border-green-600`}
    >
      {Object.keys(children).map((key) => (
        <>
          <div className="border-solid border-2 border-red-600 p-4 w-auto">
            {key}
          </div>
          <ShowObj>{children[key]}</ShowObj>
        </>
      ))}
    </div>
  );
};

export default ShowObj;
