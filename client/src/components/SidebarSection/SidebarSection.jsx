import styles from "./SidebarSectionStyles.module.css";

function SidebarSection({ name, img, description }) {
    return (
        <div className={styles.container}>
            {name && <p className={styles.sectionName}>{name}</p>}
            <div className={styles.horizontalWrapper}>
                <img src={img} className={styles.icon} />
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}

export default SidebarSection;