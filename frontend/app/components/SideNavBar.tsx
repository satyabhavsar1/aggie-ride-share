import { Drawer, UnstyledButton } from '@mantine/core'
import { useState } from 'react';
import styles from '../styles/sidebar.module.css'
import Link from 'next/link';
import { useUser } from '../context/UserContext';

function Sidebar() {
    const [opened, setOpened] = useState<boolean>(false);
    const {setUser} = useUser();
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }
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
                <Link href={'/upcomingrides'} className={styles.link}>Upcoming Ride </Link>
                </div>

                <div className={styles.link_container}>
                <Link href={'/requestedrides'} className={styles.link}>Rides Requested </Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/riderequests'} className={styles.link}>Ride Requests for you</Link>
                </div>
                <div className={styles.link_container}>
                <Link href={'/'} className={styles.link} onClick={logout}>Logout </Link>
                </div>


            </Drawer>

            <UnstyledButton onClick={() => setOpened(true)}>
        <div className={styles.toggle_menu}></div>
      </UnstyledButton>
        </>
    )
}

export { Sidebar }

