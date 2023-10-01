interface MenuButtonProps {
  isOpen: boolean;
  onClickMenu: () => void;
}

const MenuButton = ({ isOpen, onClickMenu }: MenuButtonProps) => {
  return (
    <button
      aria-label={`${isOpen ? 'open menu' : 'close menu'}`}
      className="w-9 h-9 rounded-lg bg-transparent flex items-center justify-center"
      onClick={onClickMenu}
    >
      <div className="flex flex-col">
        <div
          className={`w-6 h-[1.5px] bg-black dark:bg-white transition-transform ease-in ${
            isOpen ? 'rotate-45 translate-y-[1px]' : 'translate-y-[_-4px]'
          }`}
        ></div>
        <div
          className={`w-6 h-[1.5px] bg-black dark:bg-white transition-transform ease-in ${
            isOpen ? '-rotate-45 translate-y-0' : 'translate-y-[4px]'
          }`}
        ></div>
      </div>
    </button>
  );
};

export default MenuButton;
