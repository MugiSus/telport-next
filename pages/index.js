/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WindowArrow from '../components/windowArrow.js'

export default function Home() {
    const scrollIntoViewById = (htmlFor) => {
        if (typeof window === "undefined") return;
        const element = document.getElementById(htmlFor);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }
    const scrollIntoThis = event => scrollIntoViewById(event.currentTarget.id);

    return (
        <div className={styles.container}>
            <Head>
                <title>TELPort Next</title>
                <meta name="description" content="Next TELPort is powered by Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.window} ${styles.callerVisualizer}`} id="caller-visualizer" onClick={event => scrollIntoViewById(event.currentTarget.id)}>
                    <WindowArrow htmlFor="caller" />
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
                <div className={`${styles.window} ${styles.caller}`} id="caller" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="caller-visualizer" isLeftward={true} />
                    <WindowArrow htmlFor="home" />
                </div>
                <div className={`${styles.window} ${styles.home}`} id="home">
                    <div className={styles.callerLink} onClick={() => scrollIntoViewById("caller")}>
                        <img className={styles.linkTitle} src={"./svg/home-call-title-ja.svg"} alt="call-title" />
                    </div>
                    <div className={styles.listenerLink} onClick={() => scrollIntoViewById("listener")}>
                        <img className={styles.linkTitle} src={"./svg/home-listen-title-ja.svg"} alt="listen-title" />
                    </div>
                </div>
                <div className={`${styles.window} ${styles.listener}`} id="listener" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="home" isLeftward={true} />
                    <WindowArrow htmlFor="listener-visualizer" />

                </div>
                <div className={`${styles.window} ${styles.listenerVisualizer}`} id="listener-visualizer" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="listener" isLeftward={true}/>
                    <div className={styles.visualizerGrid}>
                        
                    </div>
                </div>
            </main>
        </div>
    )
}
