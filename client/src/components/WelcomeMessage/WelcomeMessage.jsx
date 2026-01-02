import styles from "./WelcomeMessageStyles.module.css";
import downloadIconDark from "../../assets/download_dark_mode.png";
import downloadIconLight from "../../assets/download_light_mode.png";
import colorModeDark from "../../assets/color_mode_dark.png";
import colorModeLight from "../../assets/color_mode_light.png";
import languageDark from "../../assets/language_dark_mode.png";
import languagelight from "../../assets/language_light_mode.png";

function WelcomeMessage() {
  return (
    <div className={styles.container}>
      <div className={styles.verticalWrapperLeft}>
        <p className={styles.mainText}>DASHBOARD</p>
        <p className={styles.subText}>
          Quick view of all the most relevant data
        </p>
      </div>
      <div className={styles.verticalWrapperRight}>
        <div className={styles.horizontalWrapperRight}>
          <img src={colorModeDark} className={styles.icon} />
          <img src={languageDark} className={styles.icon} />
        </div>
        <button className={styles.reportButton}>
          <img src={downloadIconDark} className={styles.downloadIcon} />
          <p className={styles.downloadText}>DOWNLOAD REPORTS</p>
        </button>
      </div>
    </div>
  );
}

export default WelcomeMessage;
