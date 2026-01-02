import styles from "./SidebarStyles.module.css";
import SidebarSection from "../SidebarSection/SidebarSection.jsx";
import hamburgerMenuDark from "../../assets/hamburger_menu_dark_mode.png";
import profilePicture from "../../assets/profile_picture.png";
import dashboardIcon from "../../assets/dashboard_dark_mode.png";
import teamIcon from "../../assets/team_dark_mode.png";
import contactsIcon from "../../assets/contacts_dark_mode.png";
import invoicesIcon from "../../assets/invoices_dark_mode.png";
import addProfileIcon from "../../assets/registration_dark_mode.png";
import calendarIcon from "../../assets/calendar_dark_mode.png";
import helpIcon from "../../assets/faq_dark_mode.png";

function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.horizontalWrapper}>
        <p>Admin</p>
        <img src={hamburgerMenuDark} className={styles.hamburgerMenu}></img>
      </div>
      <img src={profilePicture} className={styles.profilePicture} />
      <p className={styles.profileName}>Petri Korpikoski</p>
      <div className={styles.sectionWrapper}>
        <SidebarSection img={dashboardIcon} description="Dashboard" />
        <SidebarSection name="Data" img={teamIcon} description="Manage Team" />
        <SidebarSection img={contactsIcon} description="Contacts" />
        <SidebarSection img={invoicesIcon} description="Invoices" />
        <SidebarSection
          name="User Tools"
          img={addProfileIcon}
          description="Add New Profile"
        />
        <SidebarSection img={calendarIcon} description="Calendar" />
        <SidebarSection img={helpIcon} description="Help" />
      </div>
    </div>
  );
}

export default Sidebar;
