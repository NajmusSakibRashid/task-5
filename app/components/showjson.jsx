const ShowObj = ({ children, index, nested }) => {
  //   console.log(children);
  if (typeof children !== "object")
    return <div className="p-4 w-auto">{children}</div>;
  return (
    <div
      className={`grid grid-cols-[auto_auto] ${
        nested == false ? (index % 2 == 0 ? "bg-blue-200" : "bg-blue-400") : ""
      }  hover:bg-blue-600 hover:text-white ${
        nested == false ? "border-2 border-white" : ""
      } `}
    >
      {Object.keys(children).map((key) => (
        <>
          <div className="p-4 w-auto">{key}</div>
          <ShowObj key={index} index={index} nested={true}>
            {children[key]}
          </ShowObj>
        </>
      ))}
    </div>
  );
};

export default ShowObj;
