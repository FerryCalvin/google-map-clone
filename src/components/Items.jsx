import {
	MdAtm,
	MdHotel,
	MdOutlineDirectionsSubway,
	MdOutlineLocalPharmacy,
	MdOutlineMuseum,
	MdPhotoCamera,
} from "react-icons/md";
import { PiForkKnifeFill } from "react-icons/pi";

const Items = ({ onCategorySearch }) => {
	return (
		<div className=" flex overflow-x-auto scrollbar-hide text-[#424242] gap-2 absolute z-40 m-auto top-3 right-28 text-sm font-medium w-[calc(100%-240px)] md:w-auto p-1">
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Restaurants")}
			>
				<PiForkKnifeFill className=" text-lg" />
				Restaurants
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Hotels")}
			>
				<MdHotel className=" text-lg" />
				Hotels
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Things to do")}
			>
				<MdPhotoCamera className=" text-base" />
				Things to do
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Museums")}
			>
				<MdOutlineMuseum className=" text-lg" />
				Museums
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Transit")}
			>
				<MdOutlineDirectionsSubway className=" text-lg" />
				Transit
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("Pharmacies")}
			>
				<MdOutlineLocalPharmacy className=" text-lg" />
				Pharmacies
			</div>
			<div
				className=" flex items-center justify-center gap-1 bg-[#fff] py-[6px] px-2 rounded-full shadow-md cursor-pointer hover:bg-[#f7f7f7] hover:shadow-lg hover:text-[#1FA85C]"
				onClick={() => onCategorySearch && onCategorySearch("ATMs")}
			>
				<MdAtm className=" text-lg" />
				ATMs
			</div>
		</div>
	);
};

export default Items;
