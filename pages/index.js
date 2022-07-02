/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WindowArrow from '../components/windowArrow.js'
import { useEffect } from 'react'

import { scrollIntoViewById, scrollIntoThis } from '../components/sources/scrollIntoView.js'

export default function Home() {

    const Frequencies = new Uint16Array(
        [...new Array(128).keys()].map(i => i * 80 + 800)
    );
    console.log(Frequencies);

    useEffect(() => {
        scrollIntoViewById("home", { behavior: "auto" });
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>TELPort Next</title>
                <meta name="description" content="Next TELPort is powered by Next" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.window} ${styles.callerVisualizer}`} id="caller-visualizer" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="caller" />
                    <div className={styles.visualizerGrid}>
                        {
                            Array.from(Frequencies).map((frequency, index) => (
                                <div key={index} className={styles.visualizerItem}>
                                    {frequency}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={`${styles.window} ${styles.caller}`} id="caller" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="caller-visualizer" isLeftward={true} />
                    <WindowArrow htmlFor="home" />
                </div>
                <div className={`${styles.window} ${styles.home}`} id="home">
                    <div className={styles.callerLink} onClick={() => scrollIntoViewById("caller")}>
                        <img className={styles.linkBackgroundIcon} src={`./svg/home-call-icon.svg`} alt="caller-link-background" />
                        <img className={styles.linkTitle} src={"./svg/home-call-title-ja.svg"} alt="call-title" />
                        <div className={styles.linkArrowContainer}>
                            {
                                [...Array(5).keys()].map(index => (
                                    <img key={index} className={styles.linkArrow} src={"./svg/home-call-arrow.svg"} alt="listen-arrow"/>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.listenerLink} onClick={() => scrollIntoViewById("listener")}>
                        <img className={styles.linkBackgroundIcon} src={`./svg/home-listen-icon.svg`} alt="caller-link-background" />
                        <img className={styles.linkTitle} src={"./svg/home-listen-title-ja.svg"} alt="listen-title" />
                        <div className={styles.linkArrowContainer}>
                            {
                                [...Array(5).keys()].map(index => (
                                    <img key={index} className={styles.linkArrow} src={"./svg/home-listen-arrow.svg"} alt="listen-arrow"/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`${styles.window} ${styles.listener}`} id="listener" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="home" isLeftward={true} />
                    <WindowArrow htmlFor="listener-visualizer" />
                </div>
                <div className={`${styles.window} ${styles.listenerVisualizer}`} id="listener-visualizer" onClick={scrollIntoThis}>
                    <WindowArrow htmlFor="listener" isLeftward={true}/>
                    <div className={styles.visualizerGrid}>
                        {
                            Array.from(Frequencies).map((frequency, index) => (
                                <div key={index} className={styles.visualizerItem}>
                                    {frequency}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}
