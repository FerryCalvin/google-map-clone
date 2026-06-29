/* eslint-disable react/prop-types */
import classNames from "classnames";
import { FaRegBookmark, FaDirections } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import GetCoordinates from "./GetCoordinates";

const Menu = ({ openMenu, setOpenMenu, onLocationSubmit, onDirectionsClick }) => {

	const menuItems = [
		{
			id: 1,
			icon: <FaRegBookmark className="text-[23px]" />,
			name: "Saved",
		},
		{
			id: 2,
			icon: <LuHistory className="text-[23px]" />,
			name: "Recents",
		},
		{
			id: 3,
			icon: <FaDirections className="text-[23px]" />,
			name: "Directions",
			onClick: () => {
				if (onDirectionsClick) onDirectionsClick();
				setOpenMenu(false);
			}
		},
		{
			id: 4,
			icon: <img src='/icon/share.png' className="w-6" alt="icon" />,
			name: "Share map",
		},
		{
			id: 5,
			icon: <img src='/icon/print.png' className="w-6" alt="icon" />,
			name: "Print",
		},
	];

	const handleCloseMenu = () => {
		setOpenMenu(false);
	};

	return (
		<div
			className={classNames(
				"px-5 flex flex-col absolute top-0 z-50 bg-[#fff] md:w-[23.5%] w-[80%] text-[#202124] text-xs h-[100%] overflow-y-scroll overflow-x-hidden transition-transform duration-300 transform",
				{ "translate-x-0": openMenu, "-translate-x-full": !openMenu },
			)}
		>
			<div className="w-[100%] flex flex-col h-full">
				<div className="flex pt-4 pb-2 w-[100%] justify-between items-center">
					<div className="cursor-pointer">
						<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA85C] to-[#009070] text-xl">Jeroo Maps</span>
					</div>
					<IoMdClose
						onClick={handleCloseMenu}
						className="text-[#616161] text-2xl cursor-pointer"
					/>
				</div>
				<div className="my-2">
					<GetCoordinates onLocationSubmit={onLocationSubmit} />
				</div>
				<hr className="w-[110%] -ml-5" />
				<div className="my-3 px-1">
					{menuItems.map((item) => {
						return (
							<div
								key={item.id}
								onClick={item.onClick}
								className="flex gap-6 items-center text-[#616161] hover:text-[#1FA85C] my-3 cursor-pointer grayscale hover:grayscale-0"
							>
								{item.icon}
								<p className="text-sm font-medium">{item.name}</p>
							</div>
						);
					})}
				</div>
				
				<div className="mt-auto mb-4 pt-4 border-t w-full">
					<div className="flex gap-2 items-center text-gray-500 font-medium">
						<div>Powered by Jeroo</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
