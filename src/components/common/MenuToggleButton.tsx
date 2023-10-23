import { useEffect, type SVGAttributes } from 'react';
import { useAnimate } from 'framer-motion';

interface MenuToggleButtonProps {
  isOpen: boolean;
  onClickMenu: () => void;
}

const Path = (props: any) => (
  <path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggleButton = ({ isOpen, onClickMenu }: MenuToggleButtonProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        'path.top',
        { d: isOpen ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5' },
        { at: '<' },
      ],
      ['path.middle', { opacity: isOpen ? 0 : 1 }, { at: '<' }],
      [
        'path.bottom',
        { d: isOpen ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346' },
        { at: '<' },
      ],
    ]);
  }, [isOpen]);

  return (
    <button
      ref={scope}
      aria-label={`${isOpen ? 'open menu' : 'close menu'}`}
      className="w-9 h-9 rounded-lg bg-transparent flex items-center justify-center"
      onClick={onClickMenu}
    >
      <svg width="23" height="18" viewBox="0 0 23 18">
        <Path
          d="M 2 2.5 L 20 2.5"
          className="top bg-black"
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          opacity="1"
          className="middle bg-black"
        />
        <Path
          d="M 2 16.346 L 20 16.346"
          className="bottom bg-black"
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
};

export default MenuToggleButton;
