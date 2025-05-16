import dashboard from './dashboard';
import { getSideMenu } from './other';
import pages from './pages';
import utilities from './utilities';
import { getRoleName } from 'utils/common';


// ==============================|| MENU ITEMS ||============================== //

const roleId = JSON.parse(localStorage.getItem("userData"))?.role_id || ""
const roleName = getRoleName(roleId);
const menuItems = {
  items: [ getSideMenu(roleName)]
};

export default menuItems;
