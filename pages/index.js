/* eslint-disable @next/next/no-img-element */

import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WindowArrow from '../components/windowArrow.js'
import { useEffect } from 'react'

import { scrollIntoViewById, scrollIntoThis } from '../components/sources/scrollIntoView'
import TelportEnvironment from '../components/sources/telport'

export default function Home() {
	const telport = new TelportEnvironment({
		fftSize: 1024, 
		start: 24,
		amount: 48,
		step: 2,
		interval: 100
	});
	
	useEffect(() => {
		if (typeof window !== "undefined") {
			scrollIntoViewById("home", { behavior: "auto" });
		}
	}, []);
	
	const visualizerItemsHtml = Array.from(telport.frequencies).map((frequency, index) => (
		<div key={index} className={`${styles.visualizerItem} ${frequency >= 10000 ? styles.condensed : ""}`}>
			{frequency}
		</div>
	))

	const callText = () => {
		const text = document.querySelector(`.${styles.caller} .${styles.textarea}`).value;

		telport.callText(text).then(() => {
			console.log("request sent.");
		});
	}

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
						{visualizerItemsHtml}
					</div>
				</div>

				<div className={`${styles.window} ${styles.caller}`} id="caller" onClick={scrollIntoThis}>
					<WindowArrow htmlFor="caller-visualizer" isLeftward={true} />
					<WindowArrow htmlFor="home" />

					<img className={styles.modeSelector} src={"./svg/caller-button-modeselector-text.svg"} alt="caller-button-modeselector" />
					<textarea className={styles.textarea} placeholder="Type something you want to call..." />
					<div className={styles.buttonsGroup}>
						<div className={styles.buttonContainer} onClick={() => telport.callTuner()}>
							<img className={styles.buttonLabel} src={"./svg/caller-label-tuning.svg"} alt="caller-label-tuning" />
							<img className={styles.button} src={"./svg/caller-button-tuning.svg"} alt="caller-button-tuning" />
						</div>
						<div className={styles.buttonContainer} onClick={callText}>
							<img className={styles.buttonLabel} src={"./svg/caller-label-call.svg"} alt="caller-label-call" />
							<img className={styles.button} src={"./svg/caller-button-call.svg"} alt="caller-button-call" />
						</div>
					</div>
				</div>

				<div className={`${styles.window} ${styles.home}`} id="home">
					<div className={styles.callerLink} onClick={() => scrollIntoViewById("caller")}>
						<img className={styles.linkBackgroundIcon} src={`./svg/home-call-icon.svg`} alt="caller-link-background" />
						<img className={styles.linkTitle} src={"./svg/home-call-title-ja.svg"} alt="call-title" />
						<div className={styles.linkArrowContainer}>
							{
								[...Array(5).keys()].map(index => (
									<img key={index} className={styles.linkArrow} src={"./svg/home-call-arrow.svg"} alt="call-arrow" />
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
									<img key={index} className={styles.linkArrow} src={"./svg/home-listen-arrow.svg"} alt="listen-arrow" />
								))
							}
						</div>
					</div>
				</div>

				<div className={`${styles.window} ${styles.listener}`} id="listener" onClick={scrollIntoThis}>
					<WindowArrow htmlFor="home" isLeftward={true} />
					<WindowArrow htmlFor="listener-visualizer" />

					<img className={styles.modeSelector} src={"./svg/listener-button-modeselector-text.svg"} alt="listener-button-modeselector" />
					<textarea className={styles.textarea} placeholder="Something heard will appear over here..." readOnly/>
					<div className={styles.buttonsGroup}>
						<div className={styles.buttonContainer}>
							<img className={styles.buttonLabel} src={"./svg/listener-label-tuning.svg"} alt="listener-label-tuning" />
							<img className={styles.button} src={"./svg/listener-button-tuning.svg"} alt="listener-button-tuning" />
						</div>
						<div className={styles.buttonContainer}>
							<img className={styles.buttonLabel} src={"./svg/listener-label-listen.svg"} alt="listener-label-listen" />
							<img className={styles.button} src={"./svg/listener-button-listen.svg"} alt="listener-button-listen" />
						</div>
					</div>
				</div>
				
				<div className={`${styles.window} ${styles.listenerVisualizer}`} id="listener-visualizer" onClick={scrollIntoThis}>
					<WindowArrow htmlFor="listener" isLeftward={true}/>
					<div className={styles.visualizerGrid}>
						{visualizerItemsHtml}
					</div>
				</div>
			</main>
		</div>
	)
}
