const ItemSelectBox = ({ handleItems, itemsPerPage }) => {
    return (
        <select
            onChange={handleItems}
            defaultValue={itemsPerPage}
            className="w-28 h-9 rounded-md px-2 bg-white shadow dark:bg-gray-300 text-black text-lg outline-none cursor-pointer"
        >
            <option value="3"> 3 Blogs </option>
            <option value="5"> 5 Blogs </option>
            <option value="7"> 7 Blogs </option>
        </select>
    );
};

export default ItemSelectBox;
