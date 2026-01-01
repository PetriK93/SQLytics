import styles from "./InterfaceStyles.module.css";
import colorModeDark from "../../assets/color_mode_dark.png";
import colorModeLight from "../../assets/color_mode_light.png";
import languageDark from "../../assets/language_dark_mode.png";
import languagelight from "../../assets/language_light_mode.png";

function Interface() {
    return (
        <div className={styles.container}>
            <img src={colorModeDark} className={styles.icon} />
            <img src={languageDark} className={styles.icon} />
        </div>
    )
}

export default Interface;