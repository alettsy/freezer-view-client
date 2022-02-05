import Categories from './Categories';

function Sidebar() {
	return (
		<div className="hidden h-screen overflow-y-scroll bg-gray-800 p-2 pr-5 text-white scrollbar-hide sm:inline-flex sm:text-sm md:min-w-[10rem] md:text-lg">
			<Categories />
		</div>
	);
}

export default Sidebar;
