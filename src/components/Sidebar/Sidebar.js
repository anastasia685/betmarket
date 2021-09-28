import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import DataContext from '../../context/data-context';
import { alterSidebarTags, setSidebarTags } from '../../store/actions/filters';

import Checkbox from '../UI/Checkbox/Checkbox';

import classes from './Sidebar.module.css';

const Sidebar = () => {
  const { tags, menuTags } = useContext(DataContext);
  const { sidebarTags: activeTags } = useSelector((state) => state.filters);
  const { sidebar: show } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState(0);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const activeChangeHandler = ({ id, children }) => {
    let isSame;
    setActiveItem((prevState) => {
      isSame = prevState === id;
      return id;
    });
    if (!isSame) dispatch(setSidebarTags(children));

    setShowSubMenu((prevState) => (isSame ? !prevState : true));
  };
  const checkboxHandler = (e, id) => {
    e.stopPropagation();
    dispatch(alterSidebarTags(id));
  };

  return (
    <aside
      className={classNames(classes.sidebarContainer, show && classes.show)}
    >
      <ul>
        <li
          className={classNames(
            classes.menuItem,
            activeItem === 0 && classes.active
          )}
          onClick={() => activeChangeHandler({ id: 0, children: [] })}
        >
          <div>all</div>
        </li>
        {menuTags.map((menuTag) => (
          <React.Fragment key={menuTag.id}>
            <li
              className={classNames(
                classes.menuItem,
                activeItem === menuTag.id && classes.active
              )}
              onClick={() => activeChangeHandler(menuTag)}
            >
              <div>
                {tags[menuTag.id].name}{' '}
                {menuTag.children.length > 0 && (
                  <span
                    style={{
                      backgroundImage: `url('/icons/arrow-right.png')`,
                    }}
                  />
                )}
              </div>
              {menuTag.children.length > 0 && (
                <ul className={showSubMenu ? classes.active : undefined}>
                  {menuTag.children.map((subTag) => (
                    <li
                      key={subTag}
                      className={classes.menuSubItem}
                      onClick={(e) => checkboxHandler(e, subTag)}
                    >
                      <Checkbox isChecked={activeTags.includes(subTag)} small />
                      {tags[subTag].name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </aside>
  );
};

export default React.memo(Sidebar);
