import Head from 'next/head'
import styles from '../styles/Home.module.scss'
// import Window from '../components/Window'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>TELPort Next</title>
                <meta name="description" content="Next TELPort is powered by Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.window} ${styles.listenerVisualizer}`} id="listner-visual">
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
                <div className={`${styles.window} ${styles.listener}`} id="listner">
                    
                </div>
                <div className={`${styles.window} ${styles.home}`} id="home">
                    
                </div>
                <div className={`${styles.window} ${styles.caller}`} id="caller">
                    
                </div>
                <div className={`${styles.window} ${styles.callerVisualizer}`} id="caller-visual">
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
