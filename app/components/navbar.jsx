const { useRef } = require("react");

const Navbar = ({ state, setState }) => {
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
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

  return (
    <div className="fixed flex left-0 right-0 top-0 h-auto bg-red-300 justify-around items-center flex-wrap p-8 gap-8">
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
          type="range"
          step={0.01}
          min={0}
          max={10}
          name="error"
          onChange={handleChange}
          value={state.error > 10 ? 10 : state.error}
        />
        <input
          placeholder="Error"
          type="number"
          step={0.01}
          min={0}
          max={1000}
          name="error"
          value={state.error}
          onChange={handleChange}
          className="p-4 rounded-lg w-48"
        />
      </div>
      <div className="flex gap-4">
        <input
          placeholder="Seed"
          type="text"
          className="p-4 rounded-lg w-48"
          name="seed"
          onChange={handleChange}
          value={state.seed}
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
