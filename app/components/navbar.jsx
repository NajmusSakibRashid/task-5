const { useRef, useEffect, useState } = require("react");

const Navbar = ({ state, setState, loading }) => {
  const focusRef = useRef();
  const [slider, setSlider] = useState(0);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    focusRef.current = e.target;
  };

  const ref = useRef();

  const seedGenerator = () => {
    const seed = Math.random().toString(36).substring(7);
    ref.current.value = seed;
    setState({
      ...state,
      seed,
    });
  };

  useEffect(() => {
    if (!loading) {
      focusRef.current?.focus();
    }
  }, [loading]);

  return (
    <div className="fixed flex left-0 right-0 top-0 h-auto bg-red-300 justify-around items-center flex-wrap p-8 gap-8">
      <div className="w-full text-center bg-yellow-300 p-4 rounded-lg">
        Press Enter After Changing
      </div>
      <select
        name="region"
        value={state.region}
        onChange={handleChange}
        className="p-4 rounded-lg w-48"
      >
        {/* <option value="es,fr,ir">All</option> */}
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="ir">Iranian</option>
      </select>
      <div className="flex flex-col gap-4">
        <input
          className="bg-red-300"
          disabled={loading}
          type="range"
          step={0.01}
          min={0}
          max={10}
          name="error"
          onMouseUp={handleChange}
          onChange={(e) => setSlider(e.target.value)}
          // value={state.error > 10 ? 10 : state.error}
        />
        <input
          disabled={loading}
          placeholder="Error"
          type="number"
          step={0.01}
          min={0}
          max={1000}
          name="error"
          value={slider}
          onChange={(e) => setSlider(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleChange(e);
          }}
          className="p-4 rounded-lg w-48"
        />
      </div>
      <div className="flex gap-4">
        <input
          disabled={loading}
          placeholder="Seed"
          type="text"
          className="p-4 rounded-lg w-48"
          name="seed"
          // value={state.error}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleChange(e);
          }}
          ref={ref}
        />
        <button className="p-4 rounded-lg bg-blue-400" onClick={seedGenerator}>
          Random
        </button>
      </div>
    </div>
  );
};

export default Navbar;
