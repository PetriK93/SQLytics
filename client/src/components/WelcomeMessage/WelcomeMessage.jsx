import styles from "./WelcomeMessageStyles.module.css";

function WelcomeMessage() {
    return (
        <div className={styles.container}>
            <p className={styles.mainText}>DASHBOARD</p>
            <p className={styles.subText}>Quick view of all the most relevant data</p>
        </div>
    )
}

export default WelcomeMessage;