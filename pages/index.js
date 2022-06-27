/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WindowArrow from '../components/windowArrow.js'

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
                    <WindowArrow htmlFor="caller" />
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
                <div className={`${styles.window} ${styles.listener}`} id="caller">
                    <WindowArrow htmlFor="caller-visual" isLeftward={true} />
                    <WindowArrow htmlFor="home" />
                    
                </div>
                <div className={`${styles.window} ${styles.home}`} id="home">
                    
                </div>
                <div className={`${styles.window} ${styles.caller}`} id="listener">
                    <WindowArrow htmlFor="home" isLeftward={true} />
                    <WindowArrow htmlFor="listener-visual" />

                </div>
                <div className={`${styles.window} ${styles.callerVisualizer}`} id="listener-visual">
                    <WindowArrow htmlFor="listener" isLeftward={true}/>
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
