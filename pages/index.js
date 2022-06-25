import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>TELPort Next</title>
                <meta name="description" content="Next TELPort is powered by Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div class={styles.callVisualizer} id="call-visual">
                    <div className={styles.callVisualizerGrid}>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
