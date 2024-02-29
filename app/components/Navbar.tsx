export default function Navbar() {
  return (
    <>
      <div className="h-16 w-full px-6 flex items-center sm:grid-cols-2 fixed bg-white border-b">
        <div className="flex flex-grow items-center space-x-4 pr-6">
          <label className="min-w-0 font-bold" htmlFor="search">
            Search
          </label>
          <input
            className="max-w-sm h-10 rounded-md border-zinc-200 border px-4"
            id="search"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center space-x-4 overflow-hidden text-white">
          <span className="font-bold text-black">Types</span>
          <div className="bg-normal w-fit px-1 rounded-md">normal</div>
          <div className="bg-fire w-fit px-1 rounded-md">fire</div>
          <div className="bg-water w-fit px-1 rounded-md">water</div>
          <div className="bg-electric w-fit px-1 rounded-md">electric</div>
          <div className="bg-grass w-fit px-1 rounded-md">grass</div>
          <div className="bg-ice w-fit px-1 rounded-md">ice</div>
          <div className="bg-fighting w-fit px-1 rounded-md">fighting</div>
          <div className="bg-poison w-fit px-1 rounded-md">poison</div>
          <div className="bg-ground w-fit px-1 rounded-md">ground</div>
          <div className="bg-flying w-fit px-1 rounded-md">flying</div>
          <div className="bg-psychic w-fit px-1 rounded-md">psychic</div>
          <div className="bg-bug w-fit px-1 rounded-md">bug</div>
          <div className="bg-rock w-fit px-1 rounded-md">rock</div>
          <div className="bg-ghost w-fit px-1 rounded-md">ghost</div>
          <div className="bg-dragon w-fit px-1 rounded-md">dragon</div>
          <div className="bg-dark w-fit px-1 rounded-md">dark</div>
          <div className="bg-steel w-fit px-1 rounded-md">steel</div>
          <div className="bg-fairy w-fit px-1 rounded-md">fairy</div>
          <div className="bg-stellar w-fit px-1 rounded-md">stellar</div>
        </div>
      </div>
      <div className="h-16"></div>
    </>
  );
}
