import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>TELPort Next</title>
                <meta name="description" content="Next TELPort is powered by Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.window} ${styles.listenerVisualizer}`} id="caller-visual">
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
                <div className={`${styles.window} ${styles.listener}`} id="caller">
                    
                </div>
                <div className={`${styles.window} ${styles.home}`} id="home">
                    
                </div>
                <div className={`${styles.window} ${styles.caller}`} id="listener">
                    
                </div>
                <div className={`${styles.window} ${styles.callerVisualizer}`} id="listener-visual">
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
