import { Drawer, UnstyledButton } from '@mantine/core'
import { useState } from 'react';
import styles from '../styles/sidebar.module.css'
import Link from 'next/link';
import { useUser } from '../context/UserContext';

function Sidebar() {
    const [opened, setOpened] = useState<boolean>(false);
    const { logout } = useUser();
     
    return (
        <>
            <Drawer position='left' opened={opened}
        onClose={() => setOpened(false)}>
                <div className={styles.link_container}>
                <Link href={'/'} className={styles.link}>Home </Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/fetchrides'} className={styles.link}>Your Rides </Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/createride'} className={styles.link}>Create Ride </Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/fetchrides'} className={styles.link}>Rides Requested </Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/fetchrides'} className={styles.link}>Pending Ride Requests </Link>
                </div>
                <div className={styles.link_container}>
                <a onClick={logout} className={styles.link}>Logout </a>
                </div>


            </Drawer>

            <UnstyledButton onClick={() => setOpened(true)}>
        <div className={styles.toggle_menu}></div>
      </UnstyledButton>
        </>
    )
}

export { Sidebar }

